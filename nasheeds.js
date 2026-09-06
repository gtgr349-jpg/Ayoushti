(function () {
    "use strict";

    const DATA_URL = "./nasheeds-data/nasheeds.json";
    const AUDIO_FOLDER = "./nasheeds-data/audio/NASHEEDS/";

    let tracks = [];
    let currentIndex = 0;
    let repeatMode = "all";
    let audio = null;
    let extraRepeatUsed = false;

    function titleForTrack(track, index) {
        return track.title || `نشيد رقم ${index + 1}`;
    }

    function updateUI() {
        const title = document.getElementById("nasheedTitle");
        const counter = document.getElementById("nasheedCounter");

        if (title && tracks[currentIndex]) {
            title.textContent = titleForTrack(tracks[currentIndex], currentIndex);
        }

        if (counter) {
            counter.textContent =
                `${currentIndex + 1} / ${tracks.length}`;
        }

        document.querySelectorAll(".nasheed-item").forEach((item, index) => {
            item.classList.toggle("active", index === currentIndex);
        });
    }

    function loadCurrent(autoplay) {
        if (!audio || !tracks.length) return;

        audio.src =
            AUDIO_FOLDER +
            encodeURIComponent(tracks[currentIndex].file);

        audio.load();
        updateUI();

        if (autoplay) {
            audio.play().catch(() => {});
        }
    }

    function handleEnded() {
        if (!tracks.length || !audio) return;

        if (repeatMode === "one") {
            audio.currentTime = 0;
            audio.play().catch(() => {});
            return;
        }

        if (repeatMode === "once" && !extraRepeatUsed) {
            extraRepeatUsed = true;
            audio.currentTime = 0;
            audio.play().catch(() => {});
            return;
        }

        extraRepeatUsed = false;

        if (currentIndex < tracks.length - 1) {
            currentIndex++;
            loadCurrent(true);
            return;
        }

        if (repeatMode === "all") {
            currentIndex = 0;
            loadCurrent(true);
        }
    }

    function renderPlayer() {
        const container = document.getElementById("nasheedsContent");
        if (!container) return;

        if (!tracks.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <div style="font-size:42px;">🎵</div>
                    <h3>لا توجد أناشيد</h3>
                    <p>لم يتم العثور على أناشيد.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="nasheeds-player">

                <div class="nasheed-cover">🎵</div>

                <h3 id="nasheedTitle"></h3>

                <p id="nasheedCounter"></p>

                <audio
                    id="nasheedAudio"
                    controls
                    preload="metadata"
                    style="width:100%;"
                ></audio>

                <div class="nasheed-buttons">

                    <button type="button"
                        onclick="window.nasheedPrevious()">
                        ⏮️ السابق
                    </button>

                    <button type="button"
                        onclick="window.nasheedPlay()">
                        ▶️ تشغيل
                    </button>

                    <button type="button"
                        onclick="window.nasheedNext()">
                        ⏭️ التالي
                    </button>

                </div>

                <div class="nasheed-modes">

                    <button type="button"
                        onclick="window.nasheedSetMode('once')">
                        🔁 مرة إضافية
                    </button>

                    <button type="button"
                        onclick="window.nasheedSetMode('one')">
                        🔂 تكرار النشيد
                    </button>

                    <button type="button"
                        onclick="window.nasheedSetMode('all')">
                        🔁 تشغيل الكل
                    </button>

                </div>

                <div
                    id="nasheedModeText"
                    class="nasheed-mode-text">
                    🔁 تشغيل جميع الأناشيد وراء بعضها باستمرار
                </div>

                <div class="nasheed-list">

                    ${tracks.map((track, index) => `
                        <button
                            type="button"
                            class="nasheed-item ${index === 0 ? "active" : ""}"
                            onclick="window.nasheedSelect(${index})"
                        >
                            <span>🎵</span>
                            <span>${titleForTrack(track, index)}</span>
                        </button>
                    `).join("")}

                </div>

            </div>
        `;

        audio = document.getElementById("nasheedAudio");

        if (audio) {
            audio.addEventListener("ended", handleEnded);
        }

        loadCurrent(false);
    }

    window.renderNasheedsHome = async function () {

        const container =
            document.getElementById("nasheedsContent");

        if (!container) return;

        container.innerHTML = `
            <div style="text-align:center;padding:30px;">
                🎵 جاري تجهيز الأناشيد...
            </div>
        `;

        try {

            const response = await fetch(DATA_URL, {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("nasheeds.json not found");
            }

            const data = await response.json();

            tracks = Array.isArray(data.nasheeds)
                ? data.nasheeds
                : [];

            currentIndex = 0;
            repeatMode = "all";
            extraRepeatUsed = false;

            renderPlayer();

        } catch (error) {

            console.error(
                "Ayoushti Nasheeds Error:",
                error
            );

            container.innerHTML = `
                <div class="empty-state">
                    <div style="font-size:42px;">⚠️</div>
                    <h3>تعذر تحميل الأناشيد</h3>
                    <p>تأكد من وجود ملف nasheeds.json.</p>
                </div>
            `;
        }
    };

    window.nasheedPlay = function () {
        if (audio) {
            audio.play().catch(() => {});
        }
    };

    window.nasheedPrevious = function () {

        if (!tracks.length) return;

        currentIndex =
            currentIndex <= 0
                ? tracks.length - 1
                : currentIndex - 1;

        extraRepeatUsed = false;

        loadCurrent(false);
    };

    window.nasheedNext = function () {

        if (!tracks.length) return;

        currentIndex =
            currentIndex >= tracks.length - 1
                ? 0
                : currentIndex + 1;

        extraRepeatUsed = false;

        loadCurrent(false);
    };

    window.nasheedSelect = function (index) {

        if (
            !tracks.length ||
            index < 0 ||
            index >= tracks.length
        ) {
            return;
        }

        currentIndex = index;
        extraRepeatUsed = false;

        loadCurrent(false);
    };

    window.nasheedSetMode = function (mode) {

        repeatMode = mode;
        extraRepeatUsed = false;

        const text =
            document.getElementById("nasheedModeText");

        if (!text) return;

        if (mode === "once") {

            text.textContent =
                "🔁 سيتم تكرار النشيد مرة إضافية ثم الانتقال للتالي";

        } else if (mode === "one") {

            text.textContent =
                "🔂 سيتم تكرار النشيد باستمرار";

        } else {

            text.textContent =
                "🔁 سيتم تشغيل جميع الأناشيد وراء بعضها باستمرار";
        }
    };


/* ==========================================
   AYOSHTI — BACKGROUND AUDIO / MEDIA SESSION
   ========================================== */

function setupNasheedMediaSession() {

    if (!("mediaSession" in navigator)) {
        return;
    }

    try {

        navigator.mediaSession.setActionHandler("play", function () {
            if (window.nasheedPlay) {
                window.nasheedPlay();
            }
        });

        navigator.mediaSession.setActionHandler("pause", function () {
            const audio = document.getElementById("nasheedAudio");

            if (audio) {
                audio.pause();
            }
        });

        navigator.mediaSession.setActionHandler("previoustrack", function () {
            if (window.nasheedPrevious) {
                window.nasheedPrevious();
            }
        });

        navigator.mediaSession.setActionHandler("nexttrack", function () {
            if (window.nasheedNext) {
                window.nasheedNext();
            }
        });

    } catch (error) {
        console.warn("Ayoshti Media Session:", error);
    }
}

function updateNasheedMediaSession(title, index, total) {

    if (!("mediaSession" in navigator)) {
        return;
    }

    try {

        navigator.mediaSession.metadata =
            new MediaMetadata({
                title: title || "أيوشتي",
                artist: "الأناشيد والتواشيح",
                album: "أيوشتي",
                artwork: [
                    {
                        src: "./icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "./icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            });

        navigator.mediaSession.playbackState = "playing";

    } catch (error) {
        console.warn("Ayoshti Media Metadata:", error);
    }
}

document.addEventListener("play", function (event) {

    if (
        event.target &&
        event.target.id === "nasheedAudio"
    ) {

        if ("mediaSession" in navigator) {

            navigator.mediaSession.playbackState = "playing";

            const title =
                document.getElementById("nasheedTitle");

            const counter =
                document.getElementById("nasheedCounter");

            updateNasheedMediaSession(
                title ? title.textContent : "أيوشتي",
                counter ? counter.textContent : "",
                ""
            );
        }
    }

}, true);

document.addEventListener("pause", function (event) {

    if (
        event.target &&
        event.target.id === "nasheedAudio"
    ) {

        if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "paused";
        }
    }

}, true);

document.addEventListener("ended", function (event) {

    if (
        event.target &&
        event.target.id === "nasheedAudio"
    ) {

        if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "none";
        }
    }

}, true);

setupNasheedMediaSession();

})();

/* =========================
   🏠 الرجوع للرئيسية
   ========================= */
window.nasheedsBackToHome = function () {
    if (typeof window.closeSections === "function") {
        window.closeSections();
    }

    history.replaceState(
        { ayoushtiRoute: "home" },
        "",
        location.pathname + location.search
    );

    window.scrollTo(0, 0);
};

