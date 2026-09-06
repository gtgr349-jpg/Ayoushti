(function () {
    "use strict";

    const categories = [
        { id: "umrah", icon: "🕋", title: "أدعية العمرة", desc: "أدعية ترافقك في مناسك العمرة" },
        { id: "travel", icon: "✈️", title: "أدعية السفر", desc: "من الخروج حتى الوصول" },
        { id: "mosque", icon: "🕌", title: "أدعية المسجد", desc: "أذكار وأدعية المسجد الحرام" },
        { id: "quran", icon: "📖", title: "أدعية القرآن", desc: "للتدبر والفهم والقرب من القرآن" },
        { id: "family", icon: "👨‍👩‍👧‍👦", title: "للأهل والأحباب", desc: "أجمل ما تدعين به لمن تحبين" },
        { id: "general", icon: "🤍", title: "أدعية وأذكار عامة", desc: "أذكار قصيرة ترافق يومك" },
        { id: "yasmin", icon: "💕", title: "دعوات من ياسمين ولصاحبتها بالمثل", desc: "دعوات خاصة من القلب" },
        { id: "mine", icon: "❤️", title: "أدعيتي الخاصة", desc: "أدعية تحفظينها لنفسك" }
    ];

    const duaData = {

        umrah: [
            ["النية", "اللهم إني أريد العمرة فيسرها لي وتقبلها مني."],
            ["التلبية", "لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك."],
            ["عند رؤية الكعبة", "اللهم زد هذا البيت تشريفًا وتعظيمًا ومهابةً وأمنًا، وارزقني فيه من الخير كله."],
            ["أثناء الطواف", "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار."],
            ["بين الركن اليماني والحجر الأسود", "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار."],
            ["عند الصفا والمروة", "إن الصفا والمروة من شعائر الله."],
            ["دعاء القبول", "اللهم تقبل عمرتي، واغفر ذنبي، وارحم ضعفي، واكتب لي الخير والقبول."]
        ],

        travel: [
            ["دعاء السفر", "سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون."],
            ["دعاء الركوب", "اللهم إنا نسألك في سفرنا هذا البر والتقوى، ومن العمل ما ترضى."],
            ["الخروج من المنزل", "بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله."],
            ["الوصول", "اللهم أنزلني منزلًا مباركًا وأنت خير المنزلين."]
        ],

        mosque: [
            ["دخول المسجد", "اللهم افتح لي أبواب رحمتك."],
            ["الخروج من المسجد", "اللهم إني أسألك من فضلك."],
            ["في المسجد", "اللهم اجعلني من أهل المساجد، واغفر لي وارحمني وتقبل مني."]
        ],

        quran: [
            ["طلب العلم", "رب زدني علمًا."],
            ["الفهم والتدبر", "اللهم افتح علي فهم كتابك، وارزقني تدبره والعمل به."],
            ["مع القرآن", "اللهم اجعل القرآن ربيع قلبي ونور صدري وجلاء حزني وذهاب همي."]
        ],

        family: [
            ["للأهل", "رب اغفر لي ولوالدي وللمؤمنين يوم يقوم الحساب."],
            ["للأحباب", "اللهم احفظ أهلي وأحبابي، وبارك لهم في أعمارهم وأعمالهم، واكتب لهم الخير والسعادة."],
            ["دعاء جامع", "ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إمامًا."]
        ],

        general: [
            ["الاستغفار", "أستغفر الله وأتوب إليه."],
            ["الثبات", "يا مقلب القلوب ثبت قلبي على دينك."],
            ["العفو", "اللهم إنك عفو تحب العفو فاعف عني."],
            ["دعاء جامع", "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار."]
        ],

        yasmin: [
            ["من ياسمين ❤️", "يارب تحفظ أيوشتي، وتحفظ صاحبتها بالمثل، وتطمن قلوبهم، وتكتب لهم في كل خطوة خير وبركة، وترجعهم بالسلامة وهم مبسوطين وفرحانين."],
            ["من ياسمين ❤️", "يارب تقبل عمرتها، وتغفر لها ذنوبها، وتحفظ صاحبتها بالمثل، وتفتح لهما أبواب الخير والرزق والسعادة."],
            ["من ياسمين ❤️", "يارب خلي رحلتها أجمل مما تتمنى، واحفظها في كل مكان، واحفظ صاحبتها بالمثل، وارجعهما سالمتين مطمئنتين."],
            ["من ياسمين ❤️", "يارب ما تحرمهاش من أي دعوة دعتها بيها، واكتب لها ولصاحبتها بالمثل راحة وفرحة في قلوبهم، وحقق لهم أجمل الأمنيات."]
        ]
    };

    let currentCategory = null;
    let currentIndex = 0;

    function getMine() {
        try {
            return JSON.parse(
                localStorage.getItem("ayoushti_my_duas") || "[]"
            );
        } catch {
            return [];
        }
    }

    function saveMine(list) {
        localStorage.setItem(
            "ayoushti_my_duas",
            JSON.stringify(list)
        );
    }

    function getSection() {
        return document.getElementById("duasSection");
    }

    function getContent() {
        return document.getElementById("duasContent");
    }

    function showDuasSection() {
        const section = getSection();

        if (!section) return;

        section.classList.remove("hidden");

        document
            .querySelectorAll(
                ".header, .trip-card, .message-card, .notification-button, .menu"
            )
            .forEach(el => el.classList.add("hidden"));
    }

    function renderCategories() {
        showDuasSection();

        const content = getContent();

        if (!content) return;

        content.innerHTML = `
            <div class="duas-categories-pro">
                ${categories.map(category => `
                    <button
                        type="button"
                        class="dua-category-card-pro"
                        onclick="window.openDuaCategory('${category.id}')">

                        <span class="dua-category-icon-pro">
                            ${category.icon}
                        </span>

                        <span class="dua-category-text-pro">
                            <strong>${category.title}</strong>
                            <small>${category.desc}</small>
                        </span>

                        <span class="dua-category-arrow">
                            ‹
                        </span>

                    </button>
                `).join("")}
            </div>
        `;
    }

    function renderCategory(categoryId) {
        showDuasSection();

        currentCategory = categoryId;

        const content = getContent();

        if (!content) return;

        const category = categories.find(
            item => item.id === categoryId
        );

        if (categoryId === "mine") {
            renderMine();
            return;
        }

        const list = duaData[categoryId] || [];

        if (!list.length) {
            content.innerHTML = `
                <button
                    class="dua-inner-back-pro"
                    type="button"
                    onclick="window.duasBackToCategories()">
                    ← الأدعية
                </button>

                <div class="dua-empty-pro">
                    لا توجد أدعية حاليًا.
                </div>
            `;

            return;
        }

        currentIndex = 0;

        renderSingleDua(category, list);
    }

    function renderSingleDua(category, list) {
        const content = getContent();

        if (!content || !list.length) return;

        const dua = list[currentIndex];

        const isFirst = currentIndex === 0;
        const isLast = currentIndex === list.length - 1;

        content.innerHTML = `
            <button
                class="dua-inner-back-pro"
                type="button"
                onclick="window.duasBackToCategories()">
                ← الأدعية
            </button>

            <div class="dua-reader-header-pro">
                <div>
                    <small>${category.title}</small>
                    <strong>${dua[0]}</strong>
                </div>

                <span>
                    ${currentIndex + 1}/${list.length}
                </span>
            </div>

            <article
                class="dua-reader-card-pro ${isLast ? "dua-last-card" : ""}"
                onclick="window.nextDua()">

                <div class="dua-reader-icon-pro">
                    ${category.icon}
                </div>

                <div class="dua-reader-label-pro">
                    ${dua[0]}
                </div>

                <p>${dua[1]}</p>

                ${
                    !isLast
                    ? `<div class="dua-swipe-hint">
                            اضغطي على الدعاء للانتقال للتالي
                       </div>`
                    : `<div class="dua-finished-hint">
                            🤍 انتهت أدعية هذا القسم
                       </div>`
                }

            </article>

            <div class="dua-reader-navigation-pro">

                <button
                    type="button"
                    class="dua-nav-button secondary"
                    onclick="event.stopPropagation(); window.previousDua()"
                    ${isFirst ? "disabled" : ""}>
                    → السابق
                </button>

                <button
                    type="button"
                    class="dua-nav-button primary"
                    onclick="event.stopPropagation(); window.nextDua()"
                    ${isLast ? "disabled" : ""}>
                    التالي ←
                </button>

            </div>
        `;
    }

    function getCurrentList() {
        if (currentCategory === "mine") {
            return getMine().map(item => [
                item.title,
                item.text,
                item.id
            ]);
        }

        return duaData[currentCategory] || [];
    }

    window.openDuaCategory = function (categoryId) {

        const list = duaData[categoryId] || [];

        if (!list.length) return;

        currentCategory = categoryId;
        currentIndex = 0;

        history.pushState(
            {
                ayoushtiRoute: "duas-category",
                category: categoryId
            },
            "",
            location.pathname +
            location.search +
            "#duas-category-" +
            categoryId
        );

        history.pushState(
            {
                ayoushtiRoute: "duas-reader",
                category: categoryId,
                index: 0
            },
            "",
            location.pathname +
            location.search +
            "#dua-" +
            categoryId +
            "-0"
        );

        const category = categories.find(
            item => item.id === categoryId
        );

        renderSingleDua(category, list);
    };

    window.nextDua = function () {

        const list = getCurrentList();

        if (!list.length) return;

        if (currentIndex >= list.length - 1) return;

        currentIndex++;

        history.pushState(
            {
                ayoushtiRoute: "duas-reader",
                category: currentCategory,
                index: currentIndex
            },
            "",
            location.pathname +
            location.search +
            "#dua-" +
            currentCategory +
            "-" +
            currentIndex
        );

        const category = categories.find(
            item => item.id === currentCategory
        );

        renderSingleDua(category, list);
    };

    window.previousDua = function () {

        if (currentIndex <= 0) return;

        history.back();
    };

    window.duasBackToCategories = function () {

        const state = history.state || {};

        if (state.ayoushtiRoute === "duas-reader") {

            const index =
                Number(state.index) || 0;

            history.go(-(index + 2));
            return;
        }

        if (state.ayoushtiRoute === "duas-category") {
            history.back();
            return;
        }

        history.back();
    };

    window.duasBackToHome = function () {

        const state = history.state || {};

        if (state.ayoushtiRoute === "duas-reader") {

            const index =
                Number(state.index) || 0;

            history.go(-(index + 3));
            return;
        }

        if (state.ayoushtiRoute === "duas-category") {

            history.go(-2);
            return;
        }

        if (state.ayoushtiRoute === "duas") {

            history.back();
            return;
        }

        history.back();
    };

    window.showDuasCategories = function () {

        const currentState = history.state || {};

        if (
            currentState.ayoushtiRoute === "duas" ||
            currentState.ayoushtiRoute === "duas-category" ||
            currentState.ayoushtiRoute === "duas-reader"
        ) {

            history.replaceState(
                {
                    ayoushtiRoute: "duas"
                },
                "",
                location.pathname +
                location.search +
                "#duas"
            );

            renderCategories();
            return;
        }

        history.pushState(
            {
                ayoushtiRoute: "duas"
            },
            "",
            location.pathname +
            location.search +
            "#duas"
        );

        renderCategories();
    };

    window.renderDuaHistory = function (state) {

        if (!state) return;

        if (state.ayoushtiRoute === "duas") {
            renderCategories();
            return;
        }

        if (state.ayoushtiRoute === "duas-category") {
            renderCategory(state.category);
            return;
        }

        if (state.ayoushtiRoute === "duas-reader") {

            currentCategory = state.category;
            currentIndex = Number(state.index) || 0;

            const category = categories.find(
                item => item.id === currentCategory
            );

            const list = getCurrentList();

            renderSingleDua(category, list);
        }
    };

    function renderMine() {

        const content = getContent();

        if (!content) return;

        const list = getMine();

        content.innerHTML = `
            <button
                class="dua-inner-back-pro"
                type="button"
                onclick="window.duasBackToCategories()">
                ← الأدعية
            </button>

            <button
                class="my-dua-add-button-pro"
                type="button"
                onclick="window.showAddDuaForm()">
                ＋ إضافة دعاء
            </button>

            <div id="myDuasForm"></div>

            <div class="my-duas-list-pro">

                ${
                    list.length
                    ? list.map((dua, index) => `
                        <article class="dua-card-pro my-dua-card-pro">

                            <div class="my-dua-title-pro">
                                ❤️ ${dua.title}
                            </div>

                            <p>${dua.text}</p>

                            <button
                                type="button"
                                class="dua-delete-button-pro"
                                onclick="window.deleteMyDua(${index})">
                                حذف الدعاء
                            </button>

                        </article>
                    `).join("")
                    : `
                        <div class="dua-empty-pro">
                            <span>🤍</span>
                            لم تضيفي أي دعاء بعد
                        </div>
                    `
                }

            </div>
        `;
    }

    window.showAddDuaForm = function () {

        const form = document.getElementById("myDuasForm");

        if (!form) return;

        form.innerHTML = `
            <div class="my-dua-form-pro">

                <input
                    id="myDuaTitle"
                    type="text"
                    placeholder="اسم الدعاء"
                    maxlength="80">

                <textarea
                    id="myDuaText"
                    placeholder="اكتبي الدعاء هنا..."
                    maxlength="1000"></textarea>

                <div class="my-dua-form-buttons-pro">

                    <button
                        type="button"
                        onclick="window.saveMyDua()">
                        حفظ الدعاء
                    </button>

                    <button
                        type="button"
                        onclick="window.cancelAddDua()">
                        إلغاء
                    </button>

                </div>

            </div>
        `;

        document
            .getElementById("myDuaTitle")
            ?.focus();
    };

    window.cancelAddDua = function () {

        const form =
            document.getElementById("myDuasForm");

        if (form) form.innerHTML = "";
    };

    window.saveMyDua = function () {

        const title =
            document.getElementById("myDuaTitle")
            ?.value
            .trim();

        const text =
            document.getElementById("myDuaText")
            ?.value
            .trim();

        if (!title || !text) {
            alert("من فضلك اكتبي اسم الدعاء ونص الدعاء.");
            return;
        }

        const list = getMine();

        list.push({
            id: Date.now(),
            title: title,
            text: text
        });

        saveMine(list);

        renderMine();
    };

    window.deleteMyDua = function (index) {

        const list = getMine();

        if (!list[index]) return;

        if (!confirm("هل تريدين حذف هذا الدعاء؟")) {
            return;
        }

        list.splice(index, 1);

        saveMine(list);

        renderMine();
    };


    // ===== الإصلاح النهائي للتنقل في الأدعية =====

    window.openDuaCategory = function (categoryId) {

        // أدعيتي الخاصة
        if (categoryId === "mine") {

            currentCategory = "mine";
            currentIndex = 0;

            history.pushState(
                {
                    ayoushtiRoute: "duas-category",
                    category: "mine"
                },
                "",
                location.pathname +
                location.search +
                "#duas-category-mine"
            );

            renderMine();
            return;
        }

        const list = duaData[categoryId] || [];

        if (!list.length) return;

        currentCategory = categoryId;
        currentIndex = 0;

        history.pushState(
            {
                ayoushtiRoute: "duas-category",
                category: categoryId
            },
            "",
            location.pathname +
            location.search +
            "#duas-category-" +
            categoryId
        );

        history.pushState(
            {
                ayoushtiRoute: "duas-reader",
                category: categoryId,
                index: 0
            },
            "",
            location.pathname +
            location.search +
            "#dua-" +
            categoryId +
            "-0"
        );

        const category = categories.find(
            item => item.id === categoryId
        );

        renderSingleDua(category, list);
    };


    // عند الرجوع من الدعاء إلى التصنيفات
    window.duasBackToCategories = function () {

        const state = history.state || {};

        if (state.ayoushtiRoute === "duas-reader") {

            const index = Number(state.index) || 0;

            history.go(-(index + 2));
            return;
        }

        if (state.ayoushtiRoute === "duas-category") {

            history.back();
            return;
        }

        history.back();
    };


    // الرجوع للرئيسية
    window.duasBackToHome = function () {

        const state = history.state || {};

        if (state.ayoushtiRoute === "duas-reader") {
            const index = Number(state.index) || 0;
            history.go(-(index + 3));
            return;
        }

        if (state.ayoushtiRoute === "duas-category") {

            history.go(-2);
            return;
        }

        if (state.ayoushtiRoute === "duas") {

            history.back();
            return;
        }

        history.back();
    };


    // عند الرجوع بالـ Back إلى التصنيف
    window.renderDuaHistory = function (state) {

        if (!state) return;

        if (state.ayoushtiRoute === "duas") {
            renderCategories();
            return;
        }

        if (state.ayoushtiRoute === "duas-category") {

            // التصنيف يعرض قائمة التصنيفات/التعامل مع mine
            renderCategories();
            return;
        }

        if (state.ayoushtiRoute === "duas-reader") {

            currentCategory = state.category;
            currentIndex = Number(state.index) || 0;

            const category = categories.find(
                item => item.id === currentCategory
            );

            const list = getCurrentList();

            renderSingleDua(category, list);
        }
    };


    // ===== دعوات ياسمين =====

    const yasmineCategory = categories.find(
        category =>
            String(category.title || "")
                .includes("ياسمين")
    );

    if (yasmineCategory) {

        duaData[yasmineCategory.id] = [

            [
                "إقرأ بنيه قضاء الحاجه 🤲🏻💖",
                `سبحَان الله، والحمدُلله، ولا إله إلا الله، والله أكبر، سبحان الله وبحمدِه، سبحان الله العَظيم، ولا حَول ولا قُوة إلا بالله، أستغفر الله وأتُوب إليه، اللهُم صل وسلم على نبينا مُحمد، لا إله إلا الله وحدهُ لا شريك له، له المُلك وله الحمد وهو على كُل شيء قدِير، حسبي الله لا إله إلا هو عليه تَوكلت وهُو ربّ العرش العظيم.. اللهم اجعلنِي من التَوابين واجعلنِي من المُتطهرين، لا إله إلا أنت سبحانك إني كُنت من الظَالمين.. اللهم قلبِي ومن بقلبِي، اللهم نُورك إذا حلت الظُلمة، اللهم نجنِي من عذابِك يومُ يبعث عبادك، اللهم اغفر لِي، ولمن إغتبتُه وظلمتُه وأسأتُ إليه، اللهم تجاوز عنا وعَنه.. رضيتُ بالله ربًا، وبالإسلام دينًا، وبمحمدٍ صلى الله عليه وسلم نبيًا ورَسولًا، اللهم ارزقني حبك، وحب من يحبك، وحب كل عملٍ صالحٍ يقربني إلى حبك، ‏اللهُم إن كنت أفعل ذنبًا يمنع فرحتي وإستجابة دعائي فاغفره لي يا رب، اللهم طهرني من كل الذنوب وغيِّر حالي إلى حال تحبني به، يا رب قدرتك أقوى من ضعف حيلتي ورحمتك أوسع من قلقي مد لي بالنور في طريقي وقوِّ قلبي، اللهُم وكلتك أمري وكُلِّي ثقة بك وبأنَّك لن تخذلني وأنك ستؤتيني سؤلي، اللهم إني أستغفرك حتي ترضى، اللهم إني أستغفرك حتي تستجيب، اللهم إني أستغفرك حتي تجبر قلبي، اللهم اجعلنا من الذين إزدادوا إليك قربًا وصرفت عنهم مصائب الدنيا، اللهم لا تصعب علينا أمراً وارزقنا حظ الدنيا ونعيم الآخرة، اللهمّ إنّي توكلت عليك، وسلمت أمري إليك، لا ملجأ ولا منجا منك إلا إليك، اللهم إني أستودعتك حلمًا يتمناه قلبي ويشغل تفكيري فقر عيني به، اللهم اجعلني أبكي فرحا من حلم ظننته مستحيل فتحقق بحق سورة يس والبقرة ومحمد

ولصاحبتها بالمثل.`
            ],

            [
                "دعاء",
                `اللهم دلني علي من اراد لي خيرا و دله عليا و اصرف عني من اراد بي شرًا و اصرفه عني

اللهم اهدني و اهدي لي قلبي و ردني أليك ردًا جميلًا

اللهم طهر قلبي من بؤس الحياه و من كل ضيق

اللهم قلبي لا يؤذيه بلاء الدينا

اللهم اصرف عن قلبي اي شئ يرهقه و عن عقلي اي شئ يقلقه

اللهم انر بصيرتي و ارضني بقدري و احيني و امتني مقبولا مستورا ي الله

اللهم ابصرني الحقائق و الهمني الحكمه اللهم ارشدني طريق الصواب و يسر لي ما ادعوك ان ابلغه

اللهم ارزقني فرحه الوصول و انت راضٍ عني

اللهم ارزقني من حظوظ الدنيا اجملها

ولصاحبتها بالمثل.`
            ],

            [
                "دعاء الزوج الصالح",
                `اللهُم ارزقني الزوج الصالح الهين، اللين،الحنون الذي لا يُشقيني بصحبته أبدًا، يُعينني وأعينه على الطاعة، يأخذ بشتات قلبي؛ فندخل الجنة معًا..

اللهم ارزقني زوجًا صالحًا، ناصحًا ،صوامًا، قوامًا، تقيًا، نقيًا، غنيًا جميل الخُلُق والخَلق كأنما السماء لفظته من ثغر غيمها فأمطرته صيبًا نافعًا لقلبي..

قلبه معلق بالمساجد ،وبصره معلق بالله،وتهتز أوتار الفؤاد من جمال تلاوته للقرآن، يسعى دائماً لرضاك..

لا يكذب، لا يخون، ولا يُخالِط النساء..

يخاف الله في قلبي، سندًا طيب العشرة، لا أهون عليه حتى في الخصام، لا يكل، ولا يمل، ولا يميل حتى الممات يا الله..

زوجاً يكون لي صديقاً قبل أن يكون زوج، اسعد بقربه كما يسعد هو بي..

اللهم ارزقنى زوجاً يصب عليا الحب صباً ويكون عابداً لك كما تحب وترضى..🤍

ولصاحبتها بالمثل.`
            ],

            [
                "دعاء تيسير الزواج",
                `اللهم يا ودود يا كريم يا قريب يا مجيب
يا من بيدك القلوب والارزاق والاعمار
يا من لا يعجزك شيء في الارض ولا في السماء

اللهم يسر زواجي ويسر امري
اللهم ازل عني كل عائق ظاهر وخفي
اللهم ابطل عني كل تعطيل وكل ربط وكل تاخير
اللهم فك عني كل عقدة كانت سببا في تأخر زواجي
اللهم اقطع عني كل عين وحسد وسحر وهم ووسواس

اللهم ارزقني شريكا صالحا في حياتي
تسكن به نفسي ويطمئن به قلبي
ويعينني على طاعتك
وتكون بيننا مودة ورحمة وسكينة
وترزقنا الذرية الصالحة ان شئت

اللهم اجعل زواجي ستر وراحة لا تعب فيه ولا شقاء
واجعل اختياري مباركا
وقراري موفقا
واجعل القبول لي في القلوب
والقبول عند الاهل
والقبول في الامر كله

اللهم ان كان زواجي متعسرا فسهله
وان كان رزقي فيه متاخرا فعجله
وان كان قلبي قلقا فاطمئنه
وان كان في نفسي خوف فازله
وان كان في صدري حزن فاجبره

اللهم اجمعني بمن كتبت لي على خير
واجعل بيتنا قائما على طاعتك
مليئا بالرحمة والطمأنينة
وابعد عنا الشيطان ووساوسه
واحفظنا من كل شر

اللهم لا ترد لي دعاء
ولا تخيب لي رجاء
ولا تترك لي هما الا فرجته
ولا حزنا الا ازلته
ولا حاجة من حوائج الزواج الا قضيتها

اللهم اني اسالك باسمك الاعظم
الذي اذا دعيت به اجبت
واذا سئلت به اعطيت
ان تيسر لي الزواج
تيسيرا عاجلا مباركا غير اجل

وصلى الله وسلم على نبينا محمد
والحمد لله رب العالمين

ولصاحبتها بالمثل.`
            ]
        ];
    }

})();

