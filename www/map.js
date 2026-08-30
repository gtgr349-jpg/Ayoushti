// ======================================================
// 🗺️ خريطة أيوشتي
// ======================================================

function initMap() {

    console.log("🗺️ تم فتح خريطة أيوشتي");

    showMap("hotel");

}


// ======================================================
// 🏨🕋 تبديل الأماكن
// ======================================================

function showMap(type) {

    const hotelMap =
        document.getElementById("hotelMap");

    const haramMap =
        document.getElementById("haramMap");

    const hotelButton =
        document.getElementById("hotelMapButton");

    const haramButton =
        document.getElementById("haramMapButton");


    if (!hotelMap || !haramMap) {

        console.warn(
            "⚠️ عناصر الخريطة غير موجودة"
        );

        return;
    }


    // -----------------------------
    // 🏨 الفندق
    // -----------------------------

    if (type === "hotel") {

        hotelMap.classList.remove("hidden");

        haramMap.classList.add("hidden");


        if (hotelButton) {

            hotelButton.classList.add("active");

        }


        if (haramButton) {

            haramButton.classList.remove("active");

        }


        updateMapInfo("hotel");

    }


    // -----------------------------
    // 🕋 الحرم
    // -----------------------------

    if (type === "haram") {

        hotelMap.classList.add("hidden");

        haramMap.classList.remove("hidden");


        if (hotelButton) {

            hotelButton.classList.remove("active");

        }


        if (haramButton) {

            haramButton.classList.add("active");

        }


        updateMapInfo("haram");

    }

}


// ======================================================
// 📍 تحديث بيانات المكان
// ======================================================

function updateMapInfo(type) {

    if (
        typeof AYOSHTI_MAP_DATA ===
        "undefined"
    ) {

        console.error(
            "❌ AYOSHTI_MAP_DATA غير موجود"
        );

        return;
    }


    const data =
        AYOSHTI_MAP_DATA[type];


    if (!data) return;


    console.log(
        "📍 المكان:",
        data.arabicName
    );

    console.log(
        "🌐 الإحداثيات:",
        data.latitude,
        data.longitude
    );

}


// ======================================================
// 🧭 فتح الطريق في Google Maps
// ======================================================

function openGoogleMaps() {

    if (
        typeof AYOSHTI_MAP_DATA ===
        "undefined"
    ) {

        console.error(
            "❌ بيانات الخريطة غير موجودة"
        );

        return;
    }


    const hotel =
        AYOSHTI_MAP_DATA.hotel;


    const haram =
        AYOSHTI_MAP_DATA.haram;


    const url =
        "https://www.google.com/maps/dir/?api=1" +
        "&origin=" +
        hotel.latitude +
        "," +
        hotel.longitude +
        "&destination=" +
        haram.latitude +
        "," +
        haram.longitude +
        "&travelmode=walking";


    window.open(
        url,
        "_blank"
    );

}


console.log(
    "🗺️ map.js تم تحميله بنجاح"
);
// ======================================================
// 🗺️ التحكم في الخريطة التفاعلية
// ======================================================

function setupOfflineMapControls() {

    const maps = document.querySelectorAll(
        "#hotelMap img, #haramMap img"
    );

    maps.forEach(img => {

        if (img.dataset.mapReady === "true") {
            return;
        }

        img.dataset.mapReady = "true";

        let scale = 1;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        let dragging = false;
        let lastX = 0;
        let lastY = 0;


        function updateMap() {

            img.style.transform =
                `translate(${currentX}px, ${currentY}px) scale(${scale})`;

        }


        // 🔍 التكبير بعجلة الماوس

        img.addEventListener("wheel", function (event) {

            event.preventDefault();

            if (event.deltaY < 0) {
                scale += 0.15;
            } else {
                scale -= 0.15;
            }

            scale = Math.max(1, Math.min(scale, 4));

            updateMap();

        });


        // 🖱️ بداية السحب

        img.addEventListener("mousedown", function (event) {

            dragging = true;

            lastX = event.clientX;
            lastY = event.clientY;

            img.style.cursor = "grabbing";

        });


        // 🖱️ تحريك الخريطة

        window.addEventListener("mousemove", function (event) {

            if (!dragging) return;

            currentX +=
                event.clientX - lastX;

            currentY +=
                event.clientY - lastY;

            lastX = event.clientX;
            lastY = event.clientY;

            updateMap();

        });


        // 🖱️ إنهاء السحب

        window.addEventListener("mouseup", function () {

            dragging = false;

            img.style.cursor = "grab";

        });


        // 📱 لمس الهاتف

        img.addEventListener(
            "touchstart",
            function (event) {

                if (event.touches.length !== 1) {
                    return;
                }

                lastX =
                    event.touches[0].clientX;

                lastY =
                    event.touches[0].clientY;

            },
            { passive: true }
        );


        img.addEventListener(
            "touchmove",
            function (event) {

                if (event.touches.length !== 1) {
                    return;
                }

                const touch =
                    event.touches[0];

                currentX +=
                    touch.clientX - lastX;

                currentY +=
                    touch.clientY - lastY;

                lastX =
                    touch.clientX;

                lastY =
                    touch.clientY;

                updateMap();

            },
            { passive: true }
        );


        img.style.cursor = "grab";

        img.style.transformOrigin =
            "center center";

        img.style.transition =
            "transform 0.1s ease";

    });

}


// ======================================================
// 🚀 تشغيل التحكم عند فتح الصفحة
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    setupOfflineMapControls
);
// ======================================================
// 🔍 أزرار تكبير وتصغير وإعادة ضبط الخريطة
// ======================================================

let offlineMapScale = 1;

function getActiveOfflineMap() {

    const hotelMap =
        document.getElementById("hotelMap");

    const haramMap =
        document.getElementById("haramMap");


    if (
        hotelMap &&
        !hotelMap.classList.contains("hidden")
    ) {

        return hotelMap.querySelector("img");

    }


    if (
        haramMap &&
        !haramMap.classList.contains("hidden")
    ) {

        return haramMap.querySelector("img");

    }


    return null;

}


// ======================================================
// 🔍 تكبير / تصغير
// ======================================================

function zoomOfflineMap(amount) {

    const img =
        getActiveOfflineMap();


    if (!img) return;


    offlineMapScale += amount;


    offlineMapScale =
        Math.max(
            1,
            Math.min(offlineMapScale, 4)
        );


    img.style.transform =
        `scale(${offlineMapScale})`;

}


// ======================================================
// 🎯 إعادة ضبط
// ======================================================

function resetOfflineMap() {

    const img =
        getActiveOfflineMap();


    if (!img) return;


    offlineMapScale = 1;


    img.style.transform =
        "translate(0px, 0px) scale(1)";

}