/* =====================================================
   📸 أيوشتي — ذكريات الرحلة Offline
   الصور والفيديوهات تُحفظ داخل تخزين التطبيق (IndexedDB)
   ===================================================== */

const AYOSHTI_MEDIA_DB = "ayoushti_memories_db";
const AYOSHTI_MEDIA_STORE = "memories";
let ayoushtiMemoryUrls = [];

function openAyoushtiMediaDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(AYOSHTI_MEDIA_DB, 1);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(AYOSHTI_MEDIA_STORE)) {
                const store = db.createObjectStore(AYOSHTI_MEDIA_STORE, { keyPath: "id" });
                store.createIndex("createdAt", "createdAt", { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error("تعذر فتح التخزين المحلي"));
    });
}

async function saveAyoushtiMemory(file) {
    const db = await openAyoushtiMediaDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(AYOSHTI_MEDIA_STORE, "readwrite");
        const store = tx.objectStore(AYOSHTI_MEDIA_STORE);

        const item = {
            id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
            name: file.name || "ذكرى من الرحلة",
            type: file.type || "application/octet-stream",
            size: file.size || 0,
            createdAt: Date.now(),
            blob: file
        };

        store.put(item);
        tx.oncomplete = () => resolve(item);
        tx.onerror = () => reject(tx.error || new Error("تعذر حفظ الملف"));
        tx.onabort = () => reject(tx.error || new Error("تم إلغاء حفظ الملف"));
    });
}

async function getAyoushtiMemories() {
    const db = await openAyoushtiMediaDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(AYOSHTI_MEDIA_STORE, "readonly");
        const request = tx.objectStore(AYOSHTI_MEDIA_STORE).getAll();

        request.onsuccess = () => {
            const items = request.result || [];
            items.sort((a, b) => b.createdAt - a.createdAt);
            resolve(items);
        };
        request.onerror = () => reject(request.error || new Error("تعذر قراءة الذكريات"));
    });
}

async function deleteAyoushtiMemory(id) {
    const db = await openAyoushtiMediaDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(AYOSHTI_MEDIA_STORE, "readwrite");
        tx.objectStore(AYOSHTI_MEDIA_STORE).delete(id);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || new Error("تعذر حذف الذكرى"));
    });
}

function formatAyoushtiSize(bytes) {
    if (!bytes) return "0 MB";
    const mb = bytes / (1024 * 1024);
    if (mb < 1) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
}

function clearAyoushtiMemoryUrls() {
    ayoushtiMemoryUrls.forEach(url => URL.revokeObjectURL(url));
    ayoushtiMemoryUrls = [];
}

function ensureAyoushtiMemoryControls() {
    const section = document.getElementById("memoriesSection");
    const gallery = document.getElementById("memoriesGallery");
    if (!section || !gallery) return false;

    if (document.getElementById("memoryFilePicker")) return true;

    const controls = document.createElement("div");
    controls.className = "memories-controls";
    controls.innerHTML = `
        <input id="memoryFilePicker" type="file" accept="image/*,video/*" multiple hidden>
        <button class="memory-add-button" type="button" onclick="document.getElementById('memoryFilePicker').click()">
            <span>＋</span>
            <strong>إضافة صور وفيديوهات</strong>
            <small>اختاري أي عدد من الصور والفيديوهات مرة واحدة</small>
        </button>
        <div class="memory-storage-note">🔒 محفوظة داخل التطبيق وتعمل بدون إنترنت</div>
    `;

    gallery.parentNode.insertBefore(controls, gallery);

    document.getElementById("memoryFilePicker").addEventListener("change", async (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;

        const button = controls.querySelector(".memory-add-button");
        const oldText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span>⏳</span><strong>جاري حفظ الذكريات...</strong><small>ماتقفليش التطبيق لحد ما يخلص الحفظ</small>`;

        let saved = 0;
        let failed = 0;

        for (const file of files) {
            try {
                if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) continue;
                await saveAyoushtiMemory(file);
                saved++;
            } catch (error) {
                console.error("❌ تعذر حفظ الملف:", file.name, error);
                failed++;
            }
        }

        button.disabled = false;
        button.innerHTML = oldText;
        event.target.value = "";
        await loadAyoushtiMemories();

        if (failed) {
            alert(`تم حفظ ${saved} ذكرى، وتعذر حفظ ${failed} ملف. لو الفيديوهات كبيرة جدًا جرّبي إضافتها على دفعات.`);
        }
    });

    return true;
}

let ayoushtiMemoryFilter = "all";

function setAyoushtiMemoryFilter(filter) {
    ayoushtiMemoryFilter = filter;

    document.querySelectorAll("#memoryFilters button").forEach(button => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });

    loadAyoushtiMemories();
}

async function loadAyoushtiMemories() {
    const gallery = document.getElementById("memoriesGallery");
    if (!gallery) return;

    ensureAyoushtiMemoryControls();
    clearAyoushtiMemoryUrls();

    try {
        const items = await getAyoushtiMemories();

        const filters = document.getElementById("memoryFilters");
        if (filters) {
            const photoCount = items.filter(item => item.type && item.type.startsWith("image/")).length;
            const videoCount = items.filter(item => item.type && item.type.startsWith("video/")).length;

            const buttons = filters.querySelectorAll("button");
            if (buttons.length >= 3) {
                buttons[0].innerHTML = `الكل <b>${items.length}</b>`;
                buttons[1].innerHTML = `📸 الصور <b>${photoCount}</b>`;
                buttons[2].innerHTML = `🎥 الفيديوهات <b>${videoCount}</b>`;
            }
        }

        if (!items.length) {
            gallery.innerHTML = `
                <div class="memories-empty">
                    <div>🤍</div>
                    <p>لسه مفيش ذكريات مضافة</p>
                    <span>اضغطي «إضافة صور وفيديوهات» واختاري كل ذكريات الرحلة</span>
                </div>
            `;
            return;
        }

        const visibleItems = ayoushtiMemoryFilter === "photos"
            ? items.filter(item => item.type && item.type.startsWith("image/"))
            : ayoushtiMemoryFilter === "videos"
                ? items.filter(item => item.type && item.type.startsWith("video/"))
                : items;

        gallery.innerHTML = "";

        visibleItems.forEach((item, index) => {
            const url = URL.createObjectURL(item.blob);
            ayoushtiMemoryUrls.push(url);

            const card = document.createElement("article");
            card.className = "memory-card offline-memory-card";

            const isVideo = item.type.startsWith("video/");
            const safeName = (item.name || "ذكرى من الرحلة").replace(/[<>]/g, "");

            if (isVideo) {
                card.innerHTML = `
                    <div class="memory-media-wrap">
                        <video controls playsinline preload="metadata" src="${url}"></video>
                        <span class="memory-type-badge">🎥 فيديو</span>
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <div class="memory-media-wrap">
                        <img src="${url}" alt="${safeName}" loading="lazy">
                        <button class="memory-open-button" type="button" aria-label="فتح الصورة">⛶</button>
                        <span class="memory-type-badge">📸 صورة</span>
                    </div>
                `;
                card.querySelector("img").addEventListener("click", () => openMemoryImage(url, safeName));
                card.querySelector(".memory-open-button").addEventListener("click", () => openMemoryImage(url, safeName));
            }

            const info = document.createElement("div");
            info.className = "memory-card-info";
            info.innerHTML = `
                <div class="memory-file-name" title="${safeName}">${safeName}</div>
                <div class="memory-file-size">${formatAyoushtiSize(item.size)}</div>
            `;

            const deleteButton = document.createElement("button");
            deleteButton.className = "memory-delete-button";
            deleteButton.type = "button";
            deleteButton.textContent = "🗑️ حذف";
            deleteButton.addEventListener("click", async () => {
                if (!confirm("تحبي تحذفي الذكرى دي من التطبيق؟")) return;
                try {
                    await deleteAyoushtiMemory(item.id);
                    await loadAyoushtiMemories();
                } catch (error) {
                    console.error(error);
                    alert("حصل خطأ أثناء الحذف.");
                }
            });

            info.appendChild(deleteButton);
            card.appendChild(info);
            gallery.appendChild(card);
        });

    } catch (error) {
        console.error("❌ خطأ في تحميل ذكريات الرحلة:", error);
        gallery.innerHTML = `
            <div class="memories-empty">
                <div>⚠️</div>
                <p>تعذر فتح ذاكرة الرحلة</p>
                <span>تأكدي أن التطبيق يعمل على المتصفح/التطبيق بشكل طبيعي ثم جرّبي مرة أخرى</span>
            </div>
        `;
    }
}

function openMemoryImage(src, title) {
    const viewer = document.createElement("div");
    viewer.className = "memory-viewer";
    viewer.innerHTML = `
        <button class="memory-viewer-close" type="button">×</button>
        <img src="${src}" alt="${title || "ذكرى"}">
        <div>${title || ""}</div>
    `;

    viewer.querySelector(".memory-viewer-close").addEventListener("click", () => viewer.remove());
    viewer.addEventListener("click", event => {
        if (event.target === viewer) viewer.remove();
    });
    document.body.appendChild(viewer);
}

function refreshAyoushtiMemoriesWhenOpened() {
    ensureAyoushtiMemoryControls();
    loadAyoushtiMemories();
}

document.addEventListener("DOMContentLoaded", refreshAyoushtiMemoriesWhenOpened);
