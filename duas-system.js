/* =========================================================
   AYOSHTI - FINAL DUA SYSTEM
   ========================================================= */

(function () {
    "use strict";

    const STORAGE_KEY = "ayoushti_my_duas";

    const categories = [
        {
            title: "أدعية العمرة",
            icon: "🕋",
            desc: "أدعية وأذكار العمرة والطواف والسعي",
            duas: [
                {
                    text: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ.",
                    source: "التلبية"
                },
                {
                    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ تَقَبَّلْ عُمْرَتِي، وَيَسِّرْ لِي نُسُكِي، وَاغْفِرْ لِي ذَنْبِي، وَارْزُقْنِي الْإِخْلَاصَ وَالْقَبُولَ.",
                    source: "دعاء"
                },
                {
                    text: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ اجْعَلْهَا عُمْرَةً مَقْبُولَةً، وَسَعْيًا مَشْكُورًا، وَذَنْبًا مَغْفُورًا.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.",
                    source: "دعاء"
                },
                {
                    text: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ.",
                    source: "القرآن الكريم"
                }
            ],
            note: "ليس هناك دعاء ثابت مخصوص لكل شوط من أشواط الطواف أو السعي، ويمكنك الدعاء بما تحبين من خير الدنيا والآخرة."
        },

        {
            title: "أدعية السفر",
            icon: "✈️",
            desc: "أدعية السفر والوصول والحفظ في الطريق",
            duas: [
                {
                    text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى.",
                    source: "دعاء السفر"
                },
                {
                    text: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ.",
                    source: "دعاء السفر"
                },
                {
                    text: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ.",
                    source: "دعاء السفر"
                },
                {
                    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ، وَأَعُوذُ بِكَ مِنْ كُلِّ سُوءٍ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ احْفَظْنِي فِي سَفَرِي، وَرُدَّنِي إِلَى أَهْلِي سَالِمَةً مُطْمَئِنَّةً.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ اجْعَلْ سَفَرِي هَذَا مُبَارَكًا، وَوَفِّقْنِي فِي رِحْلَتِي، وَاحْفَظْنِي مِنْ كُلِّ مَكْرُوهٍ.",
                    source: "دعاء"
                },
                {
                    text: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ.",
                    source: "ذكر"
                }
            ]
        },

        {
            title: "أدعية المسجد",
            icon: "🕌",
            desc: "أدعية دخول المسجد والخروج والخشوع",
            duas: [
                {
                    text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.",
                    source: "دعاء دخول المسجد"
                },
                {
                    text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ.",
                    source: "دعاء"
                },
                {
                    text: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ ارْزُقْنِي خُشُوعَ الْقَلْبِ، وَحُضُورَ الرُّوحِ، وَحَلَاوَةَ الْإِيمَانِ.",
                    source: "دعاء"
                },
                {
                    text: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ تَقَبَّلْ صَلَاتِي وَذِكْرِي وَدُعَائِي.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ لَا تَحْرِمْنِي لَذَّةَ الْقُرْبِ مِنْكَ، وَلَا حَلَاوَةَ مُنَاجَاتِكَ.",
                    source: "دعاء"
                }
            ]
        },

        {
            title: "أدعية القرآن",
            icon: "📖",
            desc: "أدعية من القرآن الكريم وأدعية الخير",
            duas: [
                {
                    text: "رَبِّ زِدْنِي عِلْمًا.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ ارْزُقْنِي تَدَبُّرَ كِتَابِكَ، وَالْعَمَلَ بِهِ، وَالِاسْتِمْسَاكَ بِهِ.",
                    source: "دعاء"
                }
            ]
        },

        {
            title: "أدعية للأهل والأحباب",
            icon: "👨‍👩‍👧‍👦",
            desc: "أدعية للأهل والوالدين ومن نحب",
            duas: [
                {
                    text: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا.",
                    source: "القرآن الكريم"
                },
                {
                    text: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ احْفَظْ أَهْلِي وَأَحِبَّتِي، وَاكْفِهِمْ كُلَّ سُوءٍ، وَأَلْبِسْهُمْ ثَوْبَ الصِّحَّةِ وَالْعَافِيَةِ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ اشْفِ مَرْضَانَا، وَارْحَمْ مَوْتَانَا، وَاحْفَظْ أَحْيَاءَنَا.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ بَارِكْ لِأَهْلِي فِي أَعْمَارِهِمْ وَأَرْزَاقِهِمْ، وَاجْعَلْ أَيَّامَهُمْ سَعَادَةً وَطُمَأْنِينَةً.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ اجْمَعْنَا دَائِمًا عَلَى الْخَيْرِ وَالْمَحَبَّةِ وَالطَّاعَةِ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ اغْفِرْ لِوَالِدَيَّ، وَارْحَمْهُمَا، وَاجْزِهِمَا عَنِّي خَيْرَ الْجَزَاءِ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ احْفَظْ مَنْ أُحِبُّ مِنْ كُلِّ مَكْرُوهٍ، وَاكْتُبْ لَهُمْ مِنْ خَيْرِكَ أَوْفَرَ النَّصِيبِ.",
                    source: "دعاء"
                }
            ]
        },

        {
            title: "أدعية وأذكار عامة",
            icon: "🤍",
            desc: "أذكار وأدعية للقلب والرزق والعافية",
            duas: [
                {
                    text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.",
                    source: "سيد الاستغفار"
                },
                {
                    text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ.",
                    source: "القرآن الكريم"
                },
                {
                    text: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ.",
                    source: "دعاء"
                },
                {
                    text: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، أَوَّلَهُ وَآخِرَهُ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ ارْزُقْنِي رِزْقًا طَيِّبًا وَاسِعًا مُبَارَكًا فِيهِ.",
                    source: "دعاء"
                },
                {
                    text: "اللَّهُمَّ اجْعَلْ قَلْبِي مُطْمَئِنًّا بِذِكْرِكَ، وَنَفْسِي رَاضِيَةً بِقَضَائِكَ.",
                    source: "دعاء"
                }
            ]
        },

        {
            title: "دعوات من ياسمين",
            icon: "💕",
            desc: "دعوات خاصة من ياسمين لأجمل رحلة وأجمل أيام",
            duas: [
                {
                    text: "يارب احفظ إسلام في كل خطوة، وكن معاه في سفره ورحلته، ورده ليا بالسلامة وهو فرحان ومطمن.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب اكتب لإسلام الخير في كل طريق يمشي فيه، وافتح له أبواب رزقك وفضلك، وابعد عنه كل شر.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب طمّن قلب إسلام، وخلّي باله مرتاح، ونفسه هادية، وقلبه دايمًا قريب منك.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب احفظ أهل إسلام وكل الناس اللي بيحبهم، وخلّيهم دايمًا بخير وصحة وسعادة.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب اجعل أيام إسلام الجاية أجمل من كل اللي فات، وحقق له كل حاجة نفسه فيها.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب ارزق إسلام راحة البال، والرزق الحلال، والستر، والبركة في عمره وصحته وشغله وحياته.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب اجمع لنا الخير كله، واكتب لنا في كل خطوة رضاك، وخلي المحبة بينا دايمًا سبب للخير والبركة.",
                    source: "💕 دعوة من ياسمين"
                },
                {
                    text: "يارب لا تحرمنا من بعض، واحفظ قلوبنا من الزعل، واكتب لنا أيامًا جميلة نعيشها سوا.",
                    source: "💕 دعوة من ياسمين"
                }
            ]
        },

        {
            title: "أدعيتي الخاصة",
            icon: "❤️",
            desc: "أدعية تكتبيها من قلبك وتفضلي محتفظة بيها",
            custom: true,
            duas: []
        }
    ];

    function getMyDuas() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function saveMyDuas(duas) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(duas));
    }

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function ensureCategoryCards() {
        const panel = document.getElementById("readyDuasPanel");
        if (!panel) return;

        const existing = panel.querySelectorAll(".dua-section-card");

        if (existing.length >= 8) return;

        const yasmine = document.createElement("div");
        yasmine.className = "dua-section-card";
        yasmine.innerHTML =
            '<div class="dua-card-icon">💕</div>' +
            '<div class="dua-card-content">' +
            '<h3>دعوات من ياسمين</h3>' +
            '<p>دعوات خاصة من ياسمين لأجمل رحلة وأجمل أيام</p>' +
            '</div>';
        panel.appendChild(yasmine);

        const mine = document.createElement("div");
        mine.className = "dua-section-card";
        mine.innerHTML =
            '<div class="dua-card-icon">❤️</div>' +
            '<div class="dua-card-content">' +
            '<h3>أدعيتي الخاصة</h3>' +
            '<p>أدعية تكتبيها من قلبك وتفضلي محتفظة بيها</p>' +
            '</div>';
        panel.appendChild(mine);
    }

    function updateDuasHeader() {
        const section = document.getElementById("duasSection");
        if (!section) return;

        const title = section.querySelector("h2");
        const subtitle = section.querySelector(".section-subtitle");

        if (title) title.textContent = "🤲 تصنيفات الأدعية";
        if (subtitle) subtitle.textContent = "اختاري التصنيف اللي حابة تدعي منه";
    }

    function showCategories() {
        const section = document.getElementById("duasSection");
        const reader = document.getElementById("duaReaderSection");

        if (section) section.classList.remove("hidden");
        if (reader) reader.classList.add("hidden");

        updateDuasHeader();

        const ready = document.getElementById("readyDuasPanel");
        const mine = document.getElementById("mineDuasPanel");

        if (ready) ready.classList.remove("hidden");
        if (mine) mine.classList.add("hidden");

        document.querySelectorAll(".dua-tab").forEach(function (button, index) {
            button.classList.toggle("active", index === 0);
        });

        renderMyDuas();
    }

    function ensureReader() {
        if (document.getElementById("duaReaderSection")) return;

        const reader = document.createElement("section");
        reader.id = "duaReaderSection";
        reader.className = "page-section hidden";

        reader.innerHTML = `
            <div class="dua-reader-shell">
                <button type="button" class="back-button dua-library-button">
                    ← الأدعية
                </button>

                <div class="dua-reader-category"></div>

                <div class="dua-reader-counter"></div>

                <div class="dua-reader-card">
                    <div class="dua-reader-icon">🤲</div>
                    <div class="dua-reader-text"></div>
                    <div class="dua-reader-source"></div>
                </div>

                <div class="dua-reader-hint">
                    اضغطي في أي مكان للانتقال للدعاء التالي
                </div>
            </div>
        `;

        document.body.appendChild(reader);

        reader.addEventListener("click", function (event) {
            if (event.target.closest("button")) return;
            nextDua();
        });

        const backButton = reader.querySelector(".dua-library-button");

        if (backButton) {
            backButton.addEventListener("click", function (event) {
                event.stopPropagation();
                goToDuaCategories();
            });
        }
    }

    function ensureCustomForm() {
        const panel = document.getElementById("mineDuasPanel");
        if (!panel) return;

        if (document.getElementById("customDuaForm")) return;

        const form = document.createElement("div");
        form.id = "customDuaForm";
        form.className = "custom-dua-form hidden";

        form.innerHTML = `
            <div class="custom-dua-form-card">
                <h3>🤍 اكتبي دعاء من قلبك</h3>

                <label for="customDuaTitle">اسم الدعاء</label>
                <input
                    id="customDuaTitle"
                    type="text"
                    maxlength="80"
                    placeholder="مثلاً: دعاء لأهلي"
                >

                <label for="customDuaText">الدعاء</label>
                <textarea
                    id="customDuaText"
                    maxlength="2000"
                    rows="7"
                    placeholder="اكتبي دعاءك هنا..."
                ></textarea>

                <div class="custom-dua-actions">
                    <button type="button" class="secondary-button" id="cancelCustomDua">
                        إلغاء
                    </button>

                    <button type="button" class="primary-button" id="saveCustomDua">
                        💾 حفظ الدعاء
                    </button>
                </div>
            </div>
        `;

        panel.prepend(form);

        document
            .getElementById("cancelCustomDua")
            .addEventListener("click", function () {
                form.classList.add("hidden");
                clearCustomForm();
            });

        document
            .getElementById("saveCustomDua")
            .addEventListener("click", saveCustomDua);
    }

    function clearCustomForm() {
        const title = document.getElementById("customDuaTitle");
        const text = document.getElementById("customDuaText");

        if (title) title.value = "";
        if (text) text.value = "";
    }

    function renderMyDuas() {
        const list = document.getElementById("myDuasList");
        if (!list) return;

        ensureCustomForm();

        const duas = getMyDuas();

        if (!duas.length) {
            list.innerHTML = `
                <div class="memories-empty">
                    <div>🤍</div>
                    <p>لسه مفيش أدعية مضافة</p>
                    <span>اكتبي دعاء من قلبك وخليه معاكي في رحلتك</span>
                </div>
            `;
            return;
        }

        list.innerHTML = duas.map(function (dua, index) {
            return `
                <div class="my-dua-item" data-custom-index="${index}">
                    <div class="my-dua-main">
                        <div class="my-dua-icon">❤️</div>
                        <div>
                            <h4>${escapeHtml(dua.title || "دعاء خاص")}</h4>
                            <p>${escapeHtml(dua.text)}</p>
                        </div>
                    </div>

                    <div class="my-dua-actions">
                        <button
                            type="button"
                            class="dua-open-custom"
                            data-index="${index}">
                            🤲 فتح
                        </button>

                        <button
                            type="button"
                            class="dua-delete-custom"
                            data-index="${index}">
                            🗑️ حذف
                        </button>
                    </div>
                </div>
            `;
        }).join("");

        list.querySelectorAll(".dua-open-custom").forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.stopPropagation();
                const index = Number(button.dataset.index);
                openCustomDua(index);
            });
        });

        list.querySelectorAll(".dua-delete-custom").forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.stopPropagation();

                const index = Number(button.dataset.index);
                deleteMyDua(index);
            });
        });
    }

    function saveCustomDua() {
        const titleInput = document.getElementById("customDuaTitle");
        const textInput = document.getElementById("customDuaText");

        const title = titleInput ? titleInput.value.trim() : "";
        const text = textInput ? textInput.value.trim() : "";

        if (!text) {
            alert("اكتبي نص الدعاء أولًا 🤍");
            return;
        }

        const duas = getMyDuas();

        duas.push({
            title: title || "دعاء خاص",
            text: text,
            createdAt: Date.now()
        });

        saveMyDuas(duas);

        const form = document.getElementById("customDuaForm");

        if (form) form.classList.add("hidden");

        clearCustomForm();
        renderMyDuas();

        alert("تم حفظ الدعاء ❤️");
    }

    function deleteMyDua(index) {
        const duas = getMyDuas();

        if (!duas[index]) return;

        if (!confirm("متأكدة إنك عايزة تحذفي الدعاء؟")) return;

        duas.splice(index, 1);
        saveMyDuas(duas);
        renderMyDuas();
    }

    function showMyDuasPanel() {
        const section = document.getElementById("duasSection");
        const ready = document.getElementById("readyDuasPanel");
        const mine = document.getElementById("mineDuasPanel");

        if (!section || !mine) return;

        section.classList.remove("hidden");

        if (ready) ready.classList.add("hidden");
        mine.classList.remove("hidden");

        const title = section.querySelector("h2");
        const subtitle = section.querySelector(".section-subtitle");

        if (title) title.textContent = "❤️ أدعيتي الخاصة";
        if (subtitle) subtitle.textContent = "أدعية تكتبيها من قلبك وتفضلي محتفظة بيها";

        document.querySelectorAll(".dua-tab").forEach(function (button, index) {
            button.classList.toggle("active", index === 1);
        });

        ensureCustomForm();
        renderMyDuas();
    }

    function openAddDua() {
        showMyDuasPanel();

        const form = document.getElementById("customDuaForm");

        if (!form) return;

        form.classList.remove("hidden");

        const title = document.getElementById("customDuaTitle");

        if (title) {
            setTimeout(function () {
                title.focus();
            }, 50);
        }
    }

    function openCustomDua(index) {
        const duas = getMyDuas();

        if (!duas[index]) return;

        ensureReader();

        history.pushState(
            {
                ayoushtiRoute: "dua",
                category: 7,
                step: index + 1,
                customIndex: index,
                customMode: true,
                backSteps: 1
            },
            "",
            location.href
        );

        renderCustomDua(index);
    }

    function renderCustomDua(index) {
        const duas = getMyDuas();
        const dua = duas[index];

        if (!dua) {
            showMyDuasPanel();
            return;
        }

        const section = document.getElementById("duasSection");
        const reader = document.getElementById("duaReaderSection");

        if (section) section.classList.add("hidden");
        if (reader) reader.classList.remove("hidden");

        const category = reader.querySelector(".dua-reader-category");
        const counter = reader.querySelector(".dua-reader-counter");
        const text = reader.querySelector(".dua-reader-text");
        const source = reader.querySelector(".dua-reader-source");

        if (category) {
            category.textContent = "❤️ " + (dua.title || "دعاء خاص");
        }

        if (counter) {
            counter.textContent = (index + 1) + " / " + duas.length;
        }

        if (text) text.textContent = dua.text;

        if (source) {
            source.textContent = "دعاء خاص 🤍";
        }
    }

    function openDuaCategory(index) {
        ensureReader();

        const category = categories[index];

        if (!category) return;

        if (category.custom) {
            const customDuas = getMyDuas();

            if (!customDuas.length) {
                history.pushState(
                    {
                        ayoushtiRoute: "dua-mine"
                    },
                    "",
                    location.href
                );

                showMyDuasPanel();
                return;
            }

            openCustomDua(0);
            return;
        }

        history.pushState(
            {
                ayoushtiRoute: "dua",
                category: index,
                step: 1,
                backSteps: 1
            },
            "",
            location.href
        );

        renderDua(index, 1);
    }

    function renderDua(categoryIndex, step) {
        const category = categories[categoryIndex];

        if (!category || !category.duas || !category.duas.length) {
            return;
        }

        ensureReader();

        const duaIndex = step - 1;

        if (duaIndex < 0 || duaIndex >= category.duas.length) {
            return;
        }

        const dua = category.duas[duaIndex];

        const section = document.getElementById("duasSection");
        const reader = document.getElementById("duaReaderSection");

        if (section) section.classList.add("hidden");
        if (reader) reader.classList.remove("hidden");

        const categoryElement = reader.querySelector(".dua-reader-category");
        const counter = reader.querySelector(".dua-reader-counter");
        const text = reader.querySelector(".dua-reader-text");
        const source = reader.querySelector(".dua-reader-source");
        const hint = reader.querySelector(".dua-reader-hint");

        if (categoryElement) {
            categoryElement.textContent =
                category.icon + " " + category.title;
        }

        if (counter) {
            counter.textContent =
                step + " / " + category.duas.length;
        }

        if (text) {
            text.textContent = dua.text;
        }

        if (source) {
            source.textContent = dua.source || "";
        }

        if (hint) {
            if (step < category.duas.length) {
                hint.textContent =
                    "اضغطي في أي مكان للانتقال للدعاء التالي";
            } else {
                hint.textContent =
                    "وصلنا لآخر دعاء 🤍 — اضغطي ← الأدعية للعودة للتصنيفات";
            }
        }
    }

    function nextDua() {
        const state = history.state;

        if (!state || state.ayoushtiRoute !== "dua") {
            return;
        }

        if (state.customMode) {
            const duas = getMyDuas();
            const current = Number(state.customIndex || 0);

            if (current + 1 >= duas.length) {
                return;
            }

            history.pushState(
                {
                    ayoushtiRoute: "dua",
                    category: 7,
                    step: current + 2,
                    customIndex: current + 1,
                    customMode: true,
                    backSteps: 1
                },
                "",
                location.href
            );

            renderCustomDua(current + 1);
            return;
        }

        const category = categories[state.category];

        if (!category) return;

        const nextStep = Number(state.step || 1) + 1;

        if (nextStep > category.duas.length) {
            return;
        }

        history.pushState(
            {
                ayoushtiRoute: "dua",
                category: state.category,
                step: nextStep,
                backSteps: 1
            },
            "",
            location.href
        );

        renderDua(state.category, nextStep);
    }

    function goToDuaCategories() {
        const state = history.state;

        if (state && state.ayoushtiRoute === "dua") {
            const steps = Number(state.step || 1);

            history.go(-steps);
            return;
        }

        if (state && state.ayoushtiRoute === "dua-mine") {
            history.back();
            return;
        }

        showCategories();
    }

    function backFromCategories() {
        const state = history.state;

        if (state && state.ayoushtiRoute === "dua-categories") {
            history.back();
        } else {
            if (typeof window.closeSections === "function") {
                window.closeSections();
            }
        }
    }

    function patchOpenSection() {
        if (typeof window.openSection !== "function") {
            return;
        }

        const originalOpenSection = window.openSection;

        if (originalOpenSection.__ayoushtiDuaPatched) {
            return;
        }

        function patchedOpenSection(section) {
            if (section === "duas") {
                originalOpenSection.apply(this, arguments);

                history.replaceState(
                    {
                        ayoushtiRoute: "dua-categories"
                    },
                    "",
                    location.href
                );

                ensureCategoryCards();
                ensureReader();
                ensureCustomForm();
                showCategories();

                return;
            }

            return originalOpenSection.apply(this, arguments);
        }

        patchedOpenSection.__ayoushtiDuaPatched = true;
        window.openSection = patchedOpenSection;
    }

    function patchDuaTab() {
        window.showDuaTab = function (tab) {
            if (tab === "mine") {
                showMyDuasPanel();
            } else {
                showCategories();
            }
        };
    }

    function patchBackButton() {
        const section = document.getElementById("duasSection");

        if (!section) return;

        const button = section.querySelector(".back-button");

        if (!button) return;

        button.textContent = "← الرئيسية";
        button.onclick = function (event) {
            event.preventDefault();
            backFromCategories();
        };
    }

    function handlePopState(event) {
        const state = event.state || {};

        setTimeout(function () {
            if (state.ayoushtiRoute === "dua-categories") {
                showCategories();
                return;
            }

            if (state.ayoushtiRoute === "dua-mine") {
                showMyDuasPanel();
                return;
            }

            if (state.ayoushtiRoute === "dua") {
                if (state.customMode) {
                    renderCustomDua(Number(state.customIndex || 0));
                } else {
                    renderDua(
                        Number(state.category || 0),
                        Number(state.step || 1)
                    );
                }
            }
        }, 0);
    }

    function injectStyles() {
        if (document.getElementById("ayoushti-dua-styles")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "ayoushti-dua-styles";

        style.textContent = `
            #duaReaderSection {
                min-height: 100vh;
                box-sizing: border-box;
                padding: 18px;
                background: linear-gradient(
                    180deg,
                    rgba(217, 143, 175, 0.08),
                    rgba(255, 255, 255, 0.98)
                );
            }

            .dua-reader-shell {
                max-width: 720px;
                margin: 0 auto;
                min-height: calc(100vh - 36px);
                display: flex;
                flex-direction: column;
            }

            .dua-library-button {
                align-self: flex-start;
                margin-bottom: 22px;
            }

            .dua-reader-category {
                text-align: center;
                font-size: 22px;
                font-weight: 800;
                margin: 10px 0;
            }

            .dua-reader-counter {
                text-align: center;
                opacity: 0.65;
                font-size: 14px;
                margin-bottom: 18px;
            }

            .dua-reader-card {
                flex: 1;
                min-height: 430px;
                border-radius: 28px;
                padding: 35px 24px;
                background: rgba(255,255,255,0.96);
                box-shadow: 0 15px 45px rgba(0,0,0,0.10);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                border: 1px solid rgba(217,143,175,0.18);
                user-select: none;
            }

            .dua-reader-icon {
                font-size: 42px;
                margin-bottom: 25px;
            }

            .dua-reader-text {
                direction: rtl;
                font-size: 25px;
                line-height: 2;
                font-weight: 700;
                max-width: 650px;
            }

            .dua-reader-source {
                margin-top: 28px;
                font-size: 14px;
                opacity: 0.65;
            }

            .dua-reader-hint {
                text-align: center;
                margin-top: 18px;
                font-size: 13px;
                opacity: 0.6;
            }

            .custom-dua-form {
                margin-bottom: 18px;
            }

            .custom-dua-form-card {
                background: #fff;
                border-radius: 22px;
                padding: 20px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                border: 1px solid rgba(217,143,175,0.18);
            }

            .custom-dua-form-card h3 {
                margin-top: 0;
            }

            .custom-dua-form-card label {
                display: block;
                margin: 14px 0 7px;
                font-weight: 700;
            }

            .custom-dua-form-card input,
            .custom-dua-form-card textarea {
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #ddd;
                border-radius: 14px;
                padding: 13px;
                font-family: inherit;
                font-size: 16px;
                background: #fff;
            }

            .custom-dua-form-card textarea {
                resize: vertical;
                line-height: 1.8;
            }

            .custom-dua-actions {
                display: flex;
                gap: 10px;
                margin-top: 16px;
            }

            .custom-dua-actions button {
                flex: 1;
            }

            .my-dua-item {
                background: #fff;
                border-radius: 18px;
                padding: 16px;
                margin-bottom: 12px;
                box-shadow: 0 6px 20px rgba(0,0,0,0.06);
                border: 1px solid rgba(217,143,175,0.14);
            }

            .my-dua-main {
                display: flex;
                gap: 12px;
                align-items: flex-start;
            }

            .my-dua-icon {
                font-size: 28px;
            }

            .my-dua-main h4 {
                margin: 0 0 6px;
            }

            .my-dua-main p {
                margin: 0;
                line-height: 1.8;
                white-space: pre-wrap;
            }

            .my-dua-actions {
                display: flex;
                gap: 8px;
                margin-top: 14px;
            }

            .my-dua-actions button {
                border: 0;
                border-radius: 12px;
                padding: 9px 13px;
                font-family: inherit;
                cursor: pointer;
            }

            .dua-open-custom {
                background: rgba(217,143,175,0.16);
            }

            .dua-delete-custom {
                background: rgba(220,50,50,0.10);
            }

            #readyDuasPanel .dua-section-card {
                transition: transform .15s ease, box-shadow .15s ease;
            }

            #readyDuasPanel .dua-section-card:active {
                transform: scale(.98);
            }

            @media (max-width: 600px) {
                .dua-reader-text {
                    font-size: 22px;
                    line-height: 1.9;
                }

                .dua-reader-card {
                    min-height: 400px;
                    padding: 28px 18px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function init() {
        injectStyles();
        ensureCategoryCards();
        ensureReader();
        ensureCustomForm();
        patchOpenSection();
        patchDuaTab();
        patchBackButton();
        renderMyDuas();

        window.openDuaCategory = openDuaCategory;
        window.openAddDua = openAddDua;
        window.deleteMyDua = deleteMyDua;
        window.renderMyDuas = renderMyDuas;

        window.addEventListener("popstate", handlePopState);

        if (history.state && history.state.ayoushtiRoute === "dua-categories") {
            showCategories();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
