(function () {
    "use strict";

    const HADITH_DATA_URL = "./hadith-data/umrah-hadith.json";

    let hadithBook = null;
    let currentCategory = null;
    let currentHadithIndex = 0;

    async function loadHadithData() {
        if (hadithBook) return hadithBook;

        const response = await fetch(HADITH_DATA_URL);
        if (!response.ok) {
            throw new Error("تعذر تحميل قاعدة الأحاديث");
        }

        hadithBook = await response.json();
        return hadithBook;
    }

    function getCategory(categoryId) {
        if (!hadithBook || !Array.isArray(hadithBook.categories)) {
            return null;
        }

        return hadithBook.categories.find(function (category) {
            return category.id === categoryId;
        }) || null;
    }

    function getCategoryHadiths(categoryId) {
        if (!hadithBook || !Array.isArray(hadithBook.hadiths)) {
            return [];
        }

        return hadithBook.hadiths.filter(function (hadith) {
            return hadith.category === categoryId;
        });
    }

    async function renderHadithHome() {
        const container = document.getElementById("hadithContent");
        if (!container) return;

        try {
            await loadHadithData();

            const categories = Array.isArray(hadithBook.categories)
                ? hadithBook.categories
                : [];

            container.innerHTML = `
                <div class="hadith-home">

                    <div class="quran-section-label">
                        <span>الأحاديث النبوية ﷺ</span>
                        <small>أحاديث مختارة تتعلق بالعمرة</small>
                    </div>

                    <div class="quran-surah-grid hadith-category-grid">
                        ${
                            categories.map(function (category) {
                                const count = getCategoryHadiths(category.id).length;

                                return `
                                    <button
                                        type="button"
                                        class="quran-surah-card hadith-category-card"
                                        onclick="window.openHadithCategory('${category.id}')">

                                        <span class="quran-card-number">
                                            ${category.icon || "📖"}
                                        </span>

                                        <span class="quran-card-content">
                                            <strong>${category.name}</strong>
                                            <small>${count} حديث</small>
                                        </span>

                                        <span class="quran-card-arrow">←</span>
                                    </button>
                                `;
                            }).join("")
                        }
                    </div>

                </div>
            `;
        } catch (error) {
            console.error(error);

            container.innerHTML = `
                <div class="quran-empty-state">
                    تعذر تحميل الأحاديث حاليًا.
                </div>
            `;
        }
    }

    window.renderHadithHome = renderHadithHome;

    window.openHadithCategory = async function (categoryId) {
        await loadHadithData();

        const category = getCategory(categoryId);
        const hadiths = getCategoryHadiths(categoryId);

        if (!category || !hadiths.length) {
            return;
        }

        currentCategory = categoryId;
        currentHadithIndex = 0;

        history.pushState(
            {
                ayoushtiRoute: "hadith-reader",
                category: categoryId,
                index: 0
            },
            "",
            location.pathname + location.search + "#hadith-reader"
        );

        renderHadithReader();
    };

    function renderHadithReader() {
        const container = document.getElementById("hadithContent");
        if (!container || !hadithBook || !currentCategory) return;

        const category = getCategory(currentCategory);
        const hadiths = getCategoryHadiths(currentCategory);

        if (!category || !hadiths.length) {
            renderHadithHome();
            return;
        }

        const hadith = hadiths[currentHadithIndex];

        const previousDisabled = currentHadithIndex <= 0
            ? "disabled"
            : "";

        const nextDisabled = currentHadithIndex >= hadiths.length - 1
            ? "disabled"
            : "";

        container.innerHTML = `
            <div class="quran-reader hadith-reader">

                <div class="quran-reader-header">

                    <button
                        type="button"
                        class="quran-back-to-surahs"
                        onclick="window.showHadithCategories()">
                        ← الأحاديث
                    </button>

                    <div class="quran-surah-title">
                        <span>${category.icon || "📖"} ${category.name}</span>
                        <small>
                            الحديث ${currentHadithIndex + 1}
                            من ${hadiths.length}
                        </small>
                    </div>

                </div>

                <div
                    class="quran-ayah-card quran-tap-area hadith-card"
                    onclick="window.hadithTapNext()">

                    <div class="quran-ayah-top">

                        <span class="quran-ayah-label">
                            حديث
                        </span>

                        <span class="quran-ayah-number">
                            ${currentHadithIndex + 1}
                        </span>

                    </div>

                    <div class="quran-ayah-decoration">
                        ﷺ
                    </div>

                    <div class="quran-ayah-text hadith-text">
                        ${hadith.text || ""}
                    </div>

                    ${
                        hadith.narrator
                            ? `
                                <div class="hadith-narrator">
                                    رواه ${hadith.narrator}
                                </div>
                            `
                            : ""
                    }

                    ${
                        hadith.source
                            ? `
                                <div class="hadith-source">
                                    ${hadith.source}
                                    ${
                                        hadith.reference
                                            ? ` — ${hadith.reference}`
                                            : ""
                                    }
                                </div>
                            `
                            : ""
                    }

                    ${
                        hadith.grade
                            ? `
                                <div class="hadith-grade">
                                    ${hadith.grade}
                                </div>
                            `
                            : ""
                    }

                    <div class="quran-tap-hint">
                        اضغط للحديث التالي
                    </div>

                </div>

                <div class="quran-reader-controls">

                    <button
                        type="button"
                        ${previousDisabled}
                        onclick="window.previousHadith()">
                        ← الحديث السابق
                    </button>

                    <button
                        type="button"
                        ${nextDisabled}
                        onclick="window.nextHadith()">
                        الحديث التالي →
                    </button>

                </div>

            </div>
        `;
    }

    window.renderHadithReaderFromHistory = async function (
        categoryId,
        index
    ) {
        await loadHadithData();

        const category = getCategory(categoryId);
        const hadiths = getCategoryHadiths(categoryId);

        if (!category || !hadiths.length) {
            renderHadithHome();
            return;
        }

        currentCategory = categoryId;

        const parsedIndex = Number(index);

        currentHadithIndex =
            Number.isFinite(parsedIndex) &&
            parsedIndex >= 0 &&
            parsedIndex < hadiths.length
                ? parsedIndex
                : 0;

        renderHadithReader();
    };

    window.showHadithCategories = async function () {
        await loadHadithData();

        history.replaceState(
            {
                ayoushtiRoute: "hadith"
            },
            "",
            location.pathname + location.search + "#hadith"
        );

        currentCategory = null;
        currentHadithIndex = 0;

        renderHadithHome();
    };

    window.hadithTapNext = function () {
        const state = history.state || {};

        if (state.ayoushtiRoute !== "hadith-reader") {
            return;
        }

        const hadiths = getCategoryHadiths(currentCategory);

        if (!hadiths.length) {
            return;
        }

        if (currentHadithIndex >= hadiths.length - 1) {
            return;
        }

        window.nextHadith();
    };

    window.nextHadith = function () {
        const hadiths = getCategoryHadiths(currentCategory);

        if (
            !hadiths.length ||
            currentHadithIndex >= hadiths.length - 1
        ) {
            return;
        }

        currentHadithIndex++;

        history.pushState(
            {
                ayoushtiRoute: "hadith-reader",
                category: currentCategory,
                index: currentHadithIndex
            },
            "",
            location.pathname +
                location.search +
                "#hadith-reader"
        );

        renderHadithReader();
    };

    window.previousHadith = function () {
        const hadiths = getCategoryHadiths(currentCategory);

        if (!hadiths.length || currentHadithIndex <= 0) {
            return;
        }

        currentHadithIndex--;

        history.pushState(
            {
                ayoushtiRoute: "hadith-reader",
                category: currentCategory,
                index: currentHadithIndex
            },
            "",
            location.pathname +
                location.search +
                "#hadith-reader"
        );

        renderHadithReader();
    };

    window.hadithBackToHome = function () {
        if (typeof window.closeSections === "function") {
            window.closeSections();
        }

        history.replaceState(
            {
                ayoushtiRoute: "home"
            },
            "",
            location.pathname + location.search
        );

        window.scrollTo(0, 0);
    };

})();
