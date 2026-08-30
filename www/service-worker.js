// ======================================================
// 🌙 أيوشتي — Offline Service Worker
// ======================================================

const CACHE_NAME = "ayoushti-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./journey.js",
    "./map.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


// ======================================================
// 📥 تثبيت Service Worker
// ======================================================

self.addEventListener("install", event => {

    console.log("📥 أيوشتي: بدء حفظ ملفات Offline");

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(async cache => {

                for (const file of FILES_TO_CACHE) {

                    try {

                        await cache.add(file);

                        console.log(
                            "✅ تم حفظ:",
                            file
                        );

                    } catch (error) {

                        console.warn(
                            "⚠️ تعذر حفظ:",
                            file
                        );

                    }

                }

            })
            .then(() => {

                console.log(
                    "🌙 أيوشتي: انتهى حفظ ملفات Offline"
                );

                return self.skipWaiting();

            })

    );

});


// ======================================================
// 🔄 تفعيل النسخة الجديدة
// ======================================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))

                );

            })
            .then(() => {

                return self.clients.claim();

            })

    );

});


// ======================================================
// 📴 استخدام الملفات المحفوظة بدون إنترنت
// ======================================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(response => {

                        if (
                            !response ||
                            response.status !== 200
                        ) {
                            return response;
                        }

                        const copy =
                            response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    event.request,
                                    copy
                                );

                            });

                        return response;

                    })
                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});


console.log(
    "🌙 أيوشتي Service Worker جاهز للعمل Offline"
);