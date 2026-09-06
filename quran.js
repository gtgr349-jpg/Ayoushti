(function () {

    "use strict";

    const QURAN_DATA_URL = "./quran-data/quran.json";
    const SURAH_DATA_URL = "./quran-data/quran-data.js";

    let quranBook = null;
    let surahs = [];
    let currentSurah = 1;
    let currentAyah = 1;

    const STORAGE_SURAH = "ayoushti_quran_surah";
    const STORAGE_AYAH = "ayoushti_quran_ayah";

    function getSavedPosition() {
        currentSurah = Number(localStorage.getItem(STORAGE_SURAH)) || 1;
        currentAyah = Number(localStorage.getItem(STORAGE_AYAH)) || 1;
    }

    function savePosition() {
        localStorage.setItem(STORAGE_SURAH, String(currentSurah));
        localStorage.setItem(STORAGE_AYAH, String(currentAyah));
    }

    async function loadQuran() {

        if (quranBook && surahs.length) {
            return true;
        }

        try {

            const quranResponse = await fetch(QURAN_DATA_URL, {
                cache: "no-store"
            });

            if (!quranResponse.ok) {
                throw new Error("فشل تحميل القرآن");
            }

            quranBook = await quranResponse.json();

            /*
             * quran-data.js من Tanzil يحتوي بيانات السور.
             * نحاول قراءة المتغيرات المعروفة بدون التأثير
             * على نص القرآن الموجود في quran.json.
             */

            if (window.suras && Array.isArray(window.suras)) {
                surahs = window.suras;
            }

            if (!surahs.length && window.surahData) {
                if (Array.isArray(window.surahData)) {
                    surahs = window.surahData;
                }
            }

            /*
             * fallback آمن إذا كانت metadata غير مكشوفة
             * كمتغير عالمي.
             */
            if (!surahs.length) {
                surahs = quranBook.map(function (item, index) {
                    return {
                        number: item.number || index + 1,
                        name: "السورة " + (item.number || index + 1)
                    };
                });
            }

            getSavedPosition();

            return true;

        } catch (error) {

            console.error("Ayoushti Quran Error:", error);

            const container = document.getElementById("quranContent");

            if (container) {
                container.innerHTML = `
                    <div class="quran-error">
                        <h3>تعذر تحميل القرآن</h3>
                        <p>تأكد أن ملفات القرآن موجودة داخل التطبيق.</p>
                    </div>
                `;
            }

            return false;
        }
    }

    function getSurah(surahNumber) {

        if (!Array.isArray(quranBook)) {
            return null;
        }

        return quranBook.find(function (item) {
            return Number(item.number) === Number(surahNumber);
        }) || null;
    }

    function getSurahName(number) {

        if (
            typeof QuranData !== "undefined" &&
            QuranData.Sura &&
            QuranData.Sura[number]
        ) {

            return QuranData.Sura[number][4];
        }

        const item = surahs.find(function (surah) {
            return Number(surah.number) === Number(number);
        });

        if (!item) {
            return "السورة " + number;
        }

        return (
            item.name ||
            item.arabicName ||
            item.transliteration ||
            item.title ||
            "السورة " + number
        );
    }

    function renderQuranHome() {

        const container = document.getElementById("quranContent");

        if (!container) return;

        const savedName = getSurahName(currentSurah);

        container.innerHTML = `

            <div class="quran-home">

                <div class="quran-reading-resume">

                    <div class="quran-resume-symbol">۞</div>

                    <div class="quran-resume-info">
                        <span>آخر موضع قراءة</span>
                        <strong>${savedName}</strong>
                        <small>الآية ${currentAyah}</small>
                    </div>

                    <button
                        type="button"
                        class="quran-resume-button"
                        onclick="window.openQuranSurah(${currentSurah})">
                        متابعة
                        <span>←</span>
                    </button>

                </div>

                <div class="quran-section-label">
                    <span>القرآن الكريم</span>
                    <small>اختر السورة</small>
                </div>

                <div class="quran-surah-grid">

                    ${Array.from({ length: 114 }, function (_, index) {

                        const number = index + 1;
                        const name = getSurahName(number);
                        const surah = getSurah(number);
                        const ayahCount =
                            surah && Array.isArray(surah.ayahs)
                                ? surah.ayahs.length
                                : "";

                        return `
                            <button
                                type="button"
                                class="quran-surah-card"
                                onclick="window.openQuranSurah(${number})">

                                <span class="quran-card-number">
                                    ${number}
                                </span>

                                <span class="quran-card-content">

                                    <strong>
                                        ${name}
                                    </strong>

                                    <small>
                                        ${ayahCount} آية
                                    </small>

                                </span>

                                <span class="quran-card-arrow">
                                    ←
                                </span>

                            </button>
                        `;

                    }).join("")}

                </div>

            </div>
        `;
    }

    function renderQuranReader() {

        const container = document.getElementById("quranContent");

        if (!container) return;

        const surah = getSurah(currentSurah);

        if (!surah || !Array.isArray(surah.ayahs)) {

            container.innerHTML = `
                <div class="quran-error">
                    <h3>تعذر فتح السورة</h3>
                </div>
            `;

            return;
        }

        if (currentAyah < 1) {
            currentAyah = 1;
        }

        if (currentAyah > surah.ayahs.length) {
            currentAyah = surah.ayahs.length;
        }

        savePosition();

        const ayah = surah.ayahs[currentAyah - 1];

        const previousDisabled =
            currentAyah <= 1 ? "disabled" : "";

        const nextDisabled =
            currentAyah >= surah.ayahs.length ? "disabled" : "";

        container.innerHTML = `

            <div class="quran-reader">

                <div class="quran-reader-header">

                    <button
                        type="button"
                        class="quran-back-to-surahs"
                        onclick="window.showQuranSurahs()">
                        ← السور
                    </button>

                    <div class="quran-surah-title">

                        <span>
                            سورة ${getSurahName(currentSurah)}
                        </span>

                        <small>
                            الآية ${currentAyah} من ${surah.ayahs.length}
                        </small>

                    </div>

                </div>

                <div
                    class="quran-ayah-card quran-tap-area"
                    onclick="window.quranTapNext()">

                    <div class="quran-ayah-top">
                        <span class="quran-ayah-label">آيَة</span>

                        <span class="quran-ayah-number">
                            ${currentAyah}
                        </span>
                    </div>

                    <div class="quran-ayah-decoration">
                        ۞
                    </div>

                    <div class="quran-ayah-text">
                        ${ayah.text || ""}
                    </div>

                    <div class="quran-tap-hint">
                        اضغط للآية التالية
                    </div>

                </div>

                <div class="quran-reader-controls">

                    <button
                        type="button"
                        ${previousDisabled}
                        onclick="window.previousQuranAyah()">
                        ← الآية السابقة
                    </button>


                    <button
                        type="button"
                        ${nextDisabled}
                        onclick="window.nextQuranAyah()">
                        الآية التالية →
                    </button>

                </div>

            </div>
        `;
    }

    window.quranTapNext = function () {

        const state = history.state || {};

        if (state.ayoushtiRoute !== "quran-reader") {
            return;
        }

        const surah = getSurah(currentSurah);

        if (!surah || !Array.isArray(surah.ayahs)) {
            return;
        }

        if (currentAyah >= surah.ayahs.length) {
            return;
        }

        if (typeof window.nextQuranAyah === "function") {
            window.nextQuranAyah();
        }
    };
    window.renderQuranHome = async function () {

        const loaded = await loadQuran();

        if (!loaded) return;

        renderQuranHome();
    };

    window.quranBackToHome = function () {

        /*
         * الرئيسية من داخل القرآن يجب أن تذهب
         * مباشرة إلى واجهة أيوشتي الرئيسية.
         * لا نعتمد على history.go لأن سجل التصفح
         * قد يحتوي على زيارات سابقة لقائمة السور.
         */

        if (typeof window.closeSections === "function") {
            window.closeSections();
        }

        history.replaceState(
            {
                ayoushtiRoute: "home"
            },
            "",
            location.pathname +
            location.search
        );

        window.scrollTo(0, 0);
    };

    window.renderQuranReaderFromHistory = async function (surahNumber, ayahNumber) {

        const loaded = await loadQuran();

        if (!loaded) return;

        const number = Number(surahNumber);
        const ayah = Number(ayahNumber);

        if (
            Number.isInteger(number) &&
            number >= 1 &&
            number <= 114
        ) {
            currentSurah = number;
        }

        const surah = getSurah(currentSurah);

        if (
            surah &&
            Number.isInteger(ayah) &&
            ayah >= 1 &&
            ayah <= surah.ayahs.length
        ) {
            currentAyah = ayah;
        }

        renderQuranReader();
    };
    window.showQuranSurahs = function () {

        const state = history.state || {};

        if (
            state.ayoushtiRoute === "quran-reader" ||
            state.ayoushtiRoute === "quran"
        ) {

            history.replaceState(
                {
                    ayoushtiRoute: "quran"
                },
                "",
                location.pathname +
                location.search +
                "#quran"
            );

            renderQuranHome();

            return;
        }

        history.pushState(
            {
                ayoushtiRoute: "quran"
            },
            "",
            location.pathname +
            location.search +
            "#quran"
        );

        renderQuranHome();
    };

    window.openQuranSurah = function (surahNumber) {

        const number = Number(surahNumber);

        if (!Number.isInteger(number) || number < 1 || number > 114) {
            return;
        }

        currentSurah = number;

        const surah = getSurah(currentSurah);

        if (!surah || !Array.isArray(surah.ayahs)) {
            return;
        }

        if (currentAyah < 1 || currentAyah > surah.ayahs.length) {
            currentAyah = 1;
        }

        savePosition();

        history.pushState(
            {
                ayoushtiRoute: "quran-reader",
                surah: currentSurah,
                ayah: currentAyah
            },
            "",
            location.pathname +
            location.search +
            "#quran-reader"
        );

        renderQuranReader();
    };

    window.nextQuranAyah = function () {

        const surah = getSurah(currentSurah);

        if (!surah || !Array.isArray(surah.ayahs)) {
            return;
        }

        if (currentAyah < surah.ayahs.length) {

            currentAyah++;

            savePosition();

            history.replaceState(
                {
                    ayoushtiRoute: "quran-reader",
                    surah: currentSurah,
                    ayah: currentAyah
                },
                "",
                location.pathname +
                location.search +
                "#quran-reader"
            );

            renderQuranReader();

            return;
        }

        if (currentSurah < 114) {

            currentSurah++;
            currentAyah = 1;

            savePosition();

            history.replaceState(
                {
                    ayoushtiRoute: "quran-reader",
                    surah: currentSurah,
                    ayah: currentAyah
                },
                "",
                location.pathname +
                location.search +
                "#quran-reader"
            );

            renderQuranReader();
        }
    };

    window.previousQuranAyah = function () {

        if (currentAyah > 1) {

            currentAyah--;

            savePosition();

            history.replaceState(
                {
                    ayoushtiRoute: "quran-reader",
                    surah: currentSurah,
                    ayah: currentAyah
                },
                "",
                location.pathname +
                location.search +
                "#quran-reader"
            );

            renderQuranReader();

            return;
        }

        if (currentSurah > 1) {

            currentSurah--;

            const surah = getSurah(currentSurah);

            if (
                surah &&
                Array.isArray(surah.ayahs)
            ) {
                currentAyah = surah.ayahs.length;
            }

            savePosition();

            history.replaceState(
                {
                    ayoushtiRoute: "quran-reader",
                    surah: currentSurah,
                    ayah: currentAyah
                },
                "",
                location.pathname +
                location.search +
                "#quran-reader"
            );

            renderQuranReader();
        }
    };

    window.getQuranCurrentPosition = function () {
        return {
            surah: currentSurah,
            ayah: currentAyah
        };
    };

})();










