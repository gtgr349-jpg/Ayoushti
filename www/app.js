// ======================================================
// 🌙 أيوشتي
// التطبيق الرئيسي
// ======================================================


// ======================================================
// ⚙️ إعدادات الرحلة
// ======================================================

// سبتمبر = الشهر رقم 8 في JavaScript
const TRIP_START = new Date(2026, 8, 5);

const TRIP_DAYS = 14;


// ======================================================
// 📅 حساب يوم الرحلة
// ======================================================

function getTripDay() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const start = new Date(TRIP_START);

    start.setHours(0, 0, 0, 0);

    const difference = today - start;

    const daysPassed = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    return daysPassed + 1;
}


// ======================================================
// 📅 حالة الرحلة
// ======================================================

function getTripStatus() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const start = new Date(TRIP_START);

    start.setHours(0, 0, 0, 0);

    const end = new Date(start);

    end.setDate(
        end.getDate() + TRIP_DAYS - 1
    );


    // -----------------------------
    // قبل الرحلة
    // -----------------------------

    if (today < start) {

        const difference = start - today;

        const remainingDays = Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );

        return {
            status: "before",
            remainingDays: remainingDays
        };
    }


    // -----------------------------
    // أثناء الرحلة
    // -----------------------------

    if (
        today >= start &&
        today <= end
    ) {

        return {
            status: "during",
            day: getTripDay()
        };
    }


    // -----------------------------
    // بعد الرحلة
    // -----------------------------

    return {
        status: "after"
    };
}


// ======================================================
// 🕋 تحديث بطاقة الرحلة الرئيسية
// ======================================================

function updateTripUI() {

    const trip = getTripStatus();

    const tripIcon =
        document.getElementById("tripIcon");

    const tripTitle =
        document.getElementById("tripTitle");

    const tripDay =
        document.getElementById("tripDay");

    const tripMessage =
        document.getElementById("tripMessage");


    if (
        !tripIcon ||
        !tripTitle ||
        !tripDay ||
        !tripMessage
    ) {
        return;
    }


    // -----------------------------
    // قبل الرحلة
    // -----------------------------

    if (trip.status === "before") {

        tripIcon.textContent = "✈️";

        tripTitle.textContent =
            "رحلتك قريبة يا أيوشتي 🤍";

        tripDay.textContent =
            trip.remainingDays === 1
                ? "متبقي يوم واحد 🤍"
                : `متبقي ${trip.remainingDays} أيام`;

        tripMessage.textContent =
            "استعدي يا أيوشتي... ربنا يكتب لكِ رحلة مباركة، ويحفظك في طريقك، ويبلغك بيته وأنتِ في أجمل حال. 🤲🏻";

        return;
    }


    // -----------------------------
    // أثناء الرحلة
    // -----------------------------

    if (trip.status === "during") {

        tripIcon.textContent = "🕋";

        tripTitle.textContent =
            "رحلتك إلى بيت الله 🤍";

        tripDay.textContent =
            `اليوم ${trip.day} من ${TRIP_DAYS}`;

        tripMessage.textContent =
            "ربنا يتقبل منكِ، ويجعل كل خطوة وكل دعاء وكل لحظة في ميزان حسناتكِ. 🤲🏻";

        return;
    }


    // -----------------------------
    // بعد الرحلة
    // -----------------------------

    tripIcon.textContent = "❤️";

    tripTitle.textContent =
        "رحلة مباركة يا أيوشتي";

    tripDay.textContent =
        "اكتملت رحلة الـ14 يوم";

    tripMessage.textContent =
        "تقبل الله عمرتكِ، وكتب لكِ العودة إلى بيته مرات ومرات. 🤍";
}


// ======================================================
// 📂 فتح الأقسام
// ======================================================

function openSection(section) {

    closeSections();

    const element = document.getElementById(
        section + "Section"
    );

    if (!element) {
        console.error(
            "❌ القسم غير موجود:",
            section + "Section"
        );
        return;
    }

    element.classList.remove("hidden");

    const header = document.querySelector(".header");
    const tripCard = document.querySelector(".trip-card");
    const messageCard = document.querySelector(".message-card");
    const menu = document.querySelector(".menu");

    if (header) header.classList.add("hidden");
    if (tripCard) tripCard.classList.add("hidden");
    if (messageCard) messageCard.classList.add("hidden");
    if (menu) menu.classList.add("hidden");


    // 🕋 عمرتي
    if (section === "umrah") {
        renderUmrah();
    }


    // 📅 رحلتي
    if (section === "journey") {
        renderJourney();
    }


    // 💌 من إسلام
    if (section === "messages") {
        renderMessagesSection();
    }


    // 🗺️ خريطتي
    if (section === "map") {

        if (typeof initMap === "function") {
            initMap();
        } else {
            console.error("❌ initMap غير موجودة في map.js");
        }

    }

}

// ======================================================
// 🏠 إغلاق الأقسام والعودة للرئيسية
// ======================================================

function closeSections() {

    const sections =
        document.querySelectorAll(
            ".page-section"
        );


    sections.forEach(section => {

        section.classList.add("hidden");

    });


    const header =
        document.querySelector(".header");

    const tripCard =
        document.querySelector(".trip-card");

    const messageCard =
        document.querySelector(".message-card");

    const menu =
        document.querySelector(".menu");


    if (header)
        header.classList.remove("hidden");

    if (tripCard)
        tripCard.classList.remove("hidden");

    if (messageCard)
        messageCard.classList.remove("hidden");

    if (menu)
        menu.classList.remove("hidden");
}


// ======================================================
// 📅 عرض أيام الرحلة
// ======================================================

function renderJourney() {

    const container =
        document.getElementById("journeyList");


    if (!container) return;


    container.innerHTML = "";


    if (typeof journeyDays === "undefined") {

        console.error(
            "❌ journeyDays غير معرفة"
        );

        container.innerHTML = `
            <div class="info-box">
                لم يتم تحميل بيانات الرحلة.
            </div>
        `;

        return;
    }


    const trip = getTripStatus();

    let currentDay = 0;


    if (trip.status === "during") {

        currentDay = trip.day;

    }


    journeyDays.forEach(day => {

        const card =
            document.createElement("div");


        let dayStatus = "";


        if (trip.status === "before") {

            dayStatus = "upcoming";

        }

        else if (trip.status === "during") {

            if (day.day < currentDay) {

                dayStatus = "completed";

            }

            else if (day.day === currentDay) {

                dayStatus = "today";

            }

            else {

                dayStatus = "upcoming";

            }

        }

        else {

            dayStatus = "completed";

        }


        card.className =
            `journey-card ${dayStatus}`;


        let statusIcon = day.icon;


        if (dayStatus === "completed") {

            statusIcon = "✅";

        }


        if (dayStatus === "today") {

            statusIcon = "📍";

        }


        if (dayStatus === "upcoming") {

            statusIcon = "🔒";

        }


        let tasksHTML = "";


        if (
            day.tasks &&
            day.tasks.length
        ) {

            day.tasks.forEach(task => {

                tasksHTML += `
                    <li>
                        ${task}
                    </li>
                `;

            });

        }


        let statusText = "";


        if (dayStatus === "completed") {

            statusText =
                "تم الانتهاء ✅";

        }

        else if (dayStatus === "today") {

            statusText =
                "يومك الحالي 🤍";

        }

        else {

            statusText =
                "قادم 🔒";

        }


        card.innerHTML = `

            <div class="journey-header">

                <div class="journey-icon">
                    ${statusIcon}
                </div>

                <div>

                    <h3>
                        اليوم ${day.day}
                    </h3>

                    <small>
                        ${day.date}
                    </small>

                </div>

            </div>


            <div class="journey-status">
                ${statusText}
            </div>


            <h4>
                ${day.title}
            </h4>


            <p>
                ${day.description}
            </p>


            ${
                tasksHTML
                    ? `
                        <ul>
                            ${tasksHTML}
                        </ul>
                    `
                    : ""
            }

        `;


        container.appendChild(card);


        if (dayStatus === "today") {

            setTimeout(() => {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 300);

        }

    });

}


// ======================================================
// 🕋 قسم عمرتي
// ======================================================

function renderUmrah() {

    const section =
        document.getElementById(
            "umrahSection"
        );


    if (!section) return;


    section.innerHTML = `

        <button
            class="back-button"
            onclick="closeSections()">

            ← الرئيسية

        </button>


        <div class="umrah-header">

            <div class="umrah-icon">
                🕋
            </div>

            <h2>
                عمرتي
            </h2>

            <p>
                خطوة بخطوة حتى إتمام العمرة 🤍
            </p>

        </div>


        <div class="umrah-progress">

            <div class="progress-item active">

                <span>1</span>

                <small>
                    الإحرام
                </small>

            </div>


            <div class="progress-line"></div>


            <div class="progress-item">

                <span>2</span>

                <small>
                    الطواف
                </small>

            </div>


            <div class="progress-line"></div>


            <div class="progress-item">

                <span>3</span>

                <small>
                    السعي
                </small>

            </div>


            <div class="progress-line"></div>


            <div class="progress-item">

                <span>4</span>

                <small>
                    التقصير
                </small>

            </div>

        </div>


        <div class="umrah-step-card">

            <div class="step-number">
                الخطوة 1
            </div>


            <h3>
                🕊️ الاستعداد والإحرام
            </h3>


            <p>
                استعدي للعمرة بهدوء،
                واحتسبي كل خطوة تقربين بها إلى الله.
            </p>


            <div class="info-box">

                <h4>
                    🤍 قبل الإحرام
                </h4>

                <ul>

                    <li>
                        الاغتسال والتنظف.
                    </li>

                    <li>
                        لبس ملابس الإحرام المناسبة للمرأة.
                    </li>

                    <li>
                        الاستعداد للنسك قبل الوصول إلى الميقات.
                    </li>

                    <li>
                        تجنب الطيب بعد الدخول في الإحرام.
                    </li>

                </ul>

            </div>


            <div class="info-box">

                <h4>
                    🤲 النية
                </h4>

                <p>
                    تنوي العمرة بقلبها عند الدخول في النسك.
                </p>

                <p class="note">
                    النية محلها القلب،
                    ولا يلزم التلفظ بها بصيغة معينة.
                </p>

            </div>


            <div class="info-box">

                <h4>
                    📿 التلبية
                </h4>


                <div class="talbiyah">

                    لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ،
                    لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ،
                    إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ،
                    لَا شَرِيكَ لَكَ.

                </div>


                <p class="note">
                    تكثر من التلبية حتى تبدأ الطواف.
                </p>

            </div>


            <button
                class="primary-button"
                onclick="startTawaf()">

                🕋 أنا مستعدة للطواف

            </button>

        </div>

    `;
}


// ======================================================
// 🕋 بداية الطواف
// ======================================================

function startTawaf() {

    window.tawafRound = 1;

    renderTawaf();

}


// ======================================================
// 🕋 عرض الطواف
// ======================================================

function renderTawaf() {

    const section =
        document.getElementById(
            "umrahSection"
        );


    if (!section) return;


    section.innerHTML = `

        <button
            class="back-button"
            onclick="renderUmrah()">

            ← الإحرام

        </button>


        <div class="umrah-header">

            <div class="umrah-icon">
                🕋
            </div>

            <h2>
                الطواف
            </h2>

            <p>
                سبعة أشواط حول الكعبة 🤍
            </p>

        </div>


        <div class="tawaf-counter">

            <div class="counter-title">
                الشوط
            </div>


            <div
                id="tawafNumber"
                class="counter-number">

                ${window.tawafRound}

            </div>


            <div class="counter-total">
                من 7
            </div>

        </div>


        <div
            id="tawafDots"
            class="tawaf-dots">

        </div>


        <div class="info-box">

            <h4>
                🕋 بداية الطواف
            </h4>

            <p>
                يبدأ الطواف من جهة الحجر الأسود،
                ويكون البيت عن يسارك.
            </p>

            <p class="important">
                عند محاذاة الحجر الأسود يُشرع التكبير.
            </p>

        </div>


        <div class="info-box">

            <h4>
                🤲 ماذا أقول؟
            </h4>

            <p>
                ليس هناك دعاء مخصوص صحيح لكل شوط.
                يمكنكِ الدعاء بما أحببتِ من خير الدنيا والآخرة،
                والذكر والاستغفار وقراءة القرآن.
            </p>

        </div>


        <div class="info-box">

            <h4>
                🤍 بين الركن اليماني والحجر الأسود
            </h4>


            <div class="dua">

                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً،
                وَفِي الْآخِرَةِ حَسَنَةً،
                وَقِنَا عَذَابَ النَّارِ.

            </div>

        </div>


        <button
            class="primary-button"
            onclick="nextTawafRound()">

            ✅ انتهيت من الشوط

        </button>

    `;


    updateTawaf();

}


// ======================================================
// 🕋 الشوط التالي
// ======================================================

function nextTawafRound() {

    if (window.tawafRound < 7) {

        window.tawafRound++;

        renderTawaf();

    }

    else {

        finishTawaf();

    }

}


// ======================================================
// تحديث عداد الطواف
// ======================================================

function updateTawaf() {

    const number =
        document.getElementById(
            "tawafNumber"
        );

    const dots =
        document.getElementById(
            "tawafDots"
        );


    if (number) {

        number.textContent =
            window.tawafRound;

    }


    if (dots) {

        let result = "";


        for (
            let i = 1;
            i <= 7;
            i++
        ) {

            result +=
                i <= window.tawafRound
                    ? "● "
                    : "○ ";

        }


        dots.textContent =
            result;

    }

}


// ======================================================
// انتهاء الطواف
// ======================================================

function finishTawaf() {

    const section =
        document.getElementById(
            "umrahSection"
        );


    if (!section) return;


    section.innerHTML = `

        <div class="completion-card">

            <div class="completion-icon">
                🤍
            </div>


            <h2>
                أحسنتِ يا أيوشتي
            </h2>


            <p>
                أتممتِ سبعة أشواط من الطواف.
            </p>


            <p>
                تقبل الله منكِ وجعلها عمرة مباركة.
            </p>


            <button
                class="primary-button"
                onclick="startSai()">

                🏃‍♀️ الانتقال إلى السعي

            </button>

        </div>

    `;

}


// ======================================================
// 🏃‍♀️ بداية السعي
// ======================================================

function startSai() {

    window.saiRound = 1;

    renderSai();

}


// ======================================================
// 🏃‍♀️ عرض السعي
// ======================================================

function renderSai() {

    const section =
        document.getElementById(
            "umrahSection"
        );


    if (!section) return;


    const from =
        window.saiRound % 2 === 1
            ? "الصفا"
            : "المروة";


    const to =
        window.saiRound % 2 === 1
            ? "المروة"
            : "الصفا";


    section.innerHTML = `

        <button
            class="back-button"
            onclick="renderTawaf()">

            ← الطواف

        </button>


        <div class="umrah-header">

            <div class="umrah-icon">
                🏃‍♀️
            </div>


            <h2>
                السعي
            </h2>


            <p>
                الشوط ${window.saiRound} من 7
            </p>

        </div>


        <div class="sai-route">

            <div class="sai-point active">

                🟢

                <span>
                    ${from}
                </span>

            </div>


            <div class="sai-arrow">
                ↓
            </div>


            <div class="sai-point">

                🔵

                <span>
                    ${to}
                </span>

            </div>

        </div>


        <div class="info-box">

            <h4>
                🤲 الدعاء والذكر
            </h4>

            <p>
                ليس لكل شوط من السعي دعاء مخصوص.
                ادعي بما أحببتِ، واذكري الله بما تيسر.
            </p>

        </div>


        <div class="info-box">

            <h4>
                🌿 تنبيه
            </h4>

            <p>
                الهرولة بين العلمين الأخضرين خاصة بالرجال،
                أما المرأة فتمشي مشيًا معتادًا.
            </p>

        </div>


        <button
            class="primary-button"
            onclick="nextSaiRound()">

            ✅ انتهيت من الشوط

        </button>

    `;

}


// ======================================================
// الشوط التالي في السعي
// ======================================================

function nextSaiRound() {

    if (window.saiRound < 7) {

        window.saiRound++;

        renderSai();

    }

    else {

        finishSai();

    }

}


// ======================================================
// انتهاء السعي
// ======================================================

function finishSai() {

    const section =
        document.getElementById(
            "umrahSection"
        );


    if (!section) return;


    section.innerHTML = `

        <div class="completion-card">

            <div class="completion-icon">
                ✂️
            </div>


            <h2>
                بقيت خطوة واحدة 🤍
            </h2>


            <p>
                بعد إتمام السعي،
                تقصر المرأة من أطراف شعرها،
                وبذلك تتم عمرتها بإذن الله.
            </p>


            <button
                class="primary-button"
                onclick="finishUmrah()">

                ✂️ فهمت

            </button>

        </div>

    `;

}


// ======================================================
// ❤️ انتهاء العمرة
// ======================================================

function finishUmrah() {

    const section =
        document.getElementById(
            "umrahSection"
        );


    if (!section) return;


    localStorage.setItem(
        "ayoushtiUmrahCompleted",
        "true"
    );


    section.innerHTML = `

        <div class="completion-card">

            <div class="completion-icon">
                🕋❤️
            </div>


            <h2>
                تمت العمرة يا أيوشتي
            </h2>


            <p>
                تقبل الله منكِ عمرتكِ،
                وغفر لكِ، وكتب لكِ القبول والأجر.
            </p>


            <p class="special-message">

                يا رب تكون العمرة بداية
                راحة بال،
                وجبر خاطر،
                وعوض جميل
                لكل حاجة نفسها فيها. 🤲🏻❤️

            </p>


            <button
                class="primary-button"
                onclick="closeSections()">

                ❤️ العودة للرئيسية

            </button>

        </div>

    `;

}


// ======================================================
// 💌 رسائل إسلام اليومية
// ======================================================

const islamMessages = [

    {
        title: "اليوم الأول 🤍",
        message: "يا رب احفظ أيوشتي في أول خطوة من رحلتها، وكن معها في طريقها، واملأ قلبها طمأنينة، واجعل بداية رحلتها بداية لأيام أجمل."
    },

    {
        title: "اليوم الثاني 🌿",
        message: "اللهم ارزق أيوشتي راحة بال لا تزول، وطمأنينة تسكن قلبها، وأبعد عنها كل خوف وحزن وتعب."
    },

    {
        title: "اليوم الثالث 🤲🏻",
        message: "يا رب إنك تعلم ما في قلب أيوشتي أكثر مني، فحقق لها ما تتمنى، واصرف عنها ما يؤذيها، واكتب لها الخير حيث كان."
    },

    {
        title: "اليوم الرابع 🕋",
        message: "اللهم اجعل خطوات أيوشتي إلى بيتك خطوات مباركة، واجعل عمرتها مقبولة، ودعاءها مسموعًا، وقلبها مطمئنًا."
    },

    {
        title: "اليوم الخامس ❤️",
        message: "يا رب عوض أيوشتي عن كل لحظة وجع عاشتها، وعن كل أمنية تأخرت، وعن كل شيء جعل قلبها حزينًا، بعوض جميل يجعلها تقول: الحمد لله أنني انتظرت."
    },

    {
        title: "اليوم السادس 🌸",
        message: "اللهم اجبر قلب أيوشتي جبرًا يتعجب له أهل الأرض والسماء، وارزقها من الخير أكثر مما تتمنى."
    },

    {
        title: "اليوم السابع 🤍",
        message: "يا رب لا تجعل في قلب أيوشتي أمنية إلا وكتبت لها فيها خيرًا، ولا دعاء إلا وسمعتَه، ولا خوفًا إلا وأبدلته أمانًا."
    },

    {
        title: "اليوم الثامن 🌙",
        message: "اللهم اجعل الليل على أيوشتي سكينة، والصباح عليها بشرى، وأيامها القادمة أجمل من كل ما مضى."
    },

    {
        title: "اليوم التاسع 🤲🏻",
        message: "يا رب ارزق أيوشتي راحة تجعلها تنسى كل تعب، وفرحة تجعلها تنسى كل حزن، وعوضًا يجعل قلبها يطمئن بأنك لم تنسها."
    },

    {
        title: "اليوم العاشر 🌿",
        message: "اللهم احفظ أيوشتي من كل سوء، واحفظ قلبها من الحزن، ونفسها من الضيق، وارزقها السكينة في كل أمر."
    },

    {
        title: "اليوم الحادي عشر ❤️",
        message: "يا رب افتح لأيوشتي أبوابًا لم تكن تتوقعها، وارزقها من حيث لا تحتسب، واكتب لها من الأقدار أجملها."
    },

    {
        title: "اليوم الثاني عشر 🌸",
        message: "اللهم إن كان في قلب أيوشتي شيء تخاف ألا يتحقق، فطمئن قلبها، وإن كان فيه أمنية، فاكتب لها فيها الخير وحققها لها بكرمك."
    },

    {
        title: "اليوم الثالث عشر 🕋",
        message: "يا رب تقبل من أيوشتي كل دعاء، وكل دمعة، وكل خطوة، وكل تعب، واجعل هذه الرحلة بداية خير كبير في حياتها."
    },

    {
        title: "اليوم الرابع عشر ❤️",
        message: "اللهم كما أكرمت أيوشتي بزيارة بيتك، فأكرمها بعد عودتها براحة بال، وجبر خاطر، وعوض جميل، وأيام لا ترى فيها إلا الخير."
    }

];


// ======================================================
// 🤲 أدعية إضافية
// ======================================================

const islamDuas = [

    "يا رب ارزق أيوشتي راحة بال لا يعكرها شيء، وطمأنينة لا تزول، وقلبًا لا يحمل إلا الخير.",

    "اللهم عوض أيوشتي عوضًا جميلًا عن كل شيء فقدته، وعن كل دعاء ظنت أنه تأخر، وعن كل وجع أخفته في قلبها.",

    "يا رب اجبر قلب أيوشتي جبرًا كاملًا، جبرًا يليق بكرمك، ويجعلها تنسى كل ما أحزنها.",

    "اللهم اجعل القادم في حياة أيوشتي أجمل مما تتمنى، واكتب لها من الخير فوق ما تتخيل.",

    "يا رب إذا ضاق صدر أيوشتي فكن لها سعة، وإذا خافت فكن لها أمانًا، وإذا تعبت فكن لها راحة.",

    "اللهم لا تجعل لأيوشتي أمرًا إلا يسّرته، ولا طريقًا إلا أنرته، ولا أمنية فيها خير إلا حققتها.",

    "يا رب ارزق أيوشتي فرحة قريبة، وفرجًا قريبًا، وخبرًا جميلًا يطمئن قلبها.",

    "اللهم احفظ قلب أيوشتي من الحزن، ونفسها من الضيق، وأيامها من كل ما يؤلمها.",

    "يا رب اجعل هذه العمرة بداية جديدة لأيوشتي، بداية مليئة بالسكينة والبركة والرضا.",

    "اللهم ارزق أيوشتي من الخير ما يجعلها تبتسم كلما تذكرت دعاءها في بيتك.",

    "يا رب لا ترد أيوشتي خائبة، واكتب لها في دعائها الخير والقبول والبركة.",

    "اللهم اكتب لأيوشتي عوضًا جميلًا عن كل انتظار، وفرحة عن كل صبر، وطمأنينة عن كل خوف.",

    "يا رب كن مع أيوشتي في كل خطوة، واحفظها أينما كانت، وأعدها إلينا سالمة مطمئنة.",

    "اللهم اجعل قلب أيوشتي متعلقًا بك، مطمئنًا بك، راضيًا بما قسمت لها، واثقًا بما تخبئه لها من خير.",

    "يا رب إن كانت أيوشتي تحمل في قلبها أمنية لا يعلمها إلا أنت، فحققها لها إن كانت خيرًا، وعوضها عنها خيرًا إن كان غير ذلك."

];


// ======================================================
// 😂 رسائل هزار من إسلام لأيوشتي
// ======================================================

const islamFunnyMessages = [

    "😂 أيوشتي، تذكير من إدارة إسلام العليا: متنسيش تدعي لأخوك العبقري اللي عامل لكِ التطبيق ده 😂❤️",

    "😂 لو فتحتي التطبيق ولقيتي رسالة مني، اعرفي إن أخوكِ بيراقب مستوى الدلع في الرحلة بنجاح.",

    "📸 أيوشتي، استمتعي بالعمرة… بس متنسيش إن في حد مستني الصور في الناحية التانية 😂",

    "😂 سؤال مهم جدًا: هو ينفع الواحد يعمل عمرة بدل أخته؟ عشان إسلام حاسس إنك واخدة كل البركة لوحدك 😂❤️",

    "😏 تنبيه: الرجوع من العمرة بدون حاجة حلوة لإسلام يعتبر مخالفة صريحة لقوانين الأخوة.",

    "😂 أيوشتي، لو حد سألك مين عمل لكِ التطبيق ده؟ قولي: أخويا إسلام… بس متقوليش له إنه حلو أوي عشان هيصدق نفسه 😂",

    "🤲🏻 دعاء اليوم: يا رب احفظ أيوشتي، وبلغها كل اللي نفسها فيه… وخليها تسمع كلام أخوها ولو مرة واحدة 😂❤️",

    "😂 أيوشتي، متتعبيش نفسك في التصوير… صورة واحدة حلوة تكفيني. وبعدها 47 صورة احتياطي طبعًا 😂📸",

    "😎 إسلام يطمئن عليكِ: هل أكلتي؟ شربتي؟ ارتحتي؟ طيب صوري لنا المكان بقى 😂",

    "😂 لو حسيتي إن التطبيق بيكلمك كتير، متقلقيش… دي مش مشكلة تقنية، ده أخوكِ رخم بس ❤️",

    "🤍 أهم حاجة ترجعي بالسلامة يا أيوشتي، وبعدها هنقعد نسمع كل تفاصيل الرحلة واحدة واحدة… غصب عنك 😂",

    "😂 أيوشتي، استغلي الرحلة في الدعاء… وأنا هتولى مهمة الاستفادة من الصور 😂📸",

    "😏 معلومة سرية: إسلام عامل الرسائل دي مخصوص عشان يفضل يرخم عليكِ حتى وإنتِ بعيدة 😂",

    "😂 لو فتحتي الرسالة دي وإنتِ بتاكلي، كملي أكلك عادي… الرسالة مش هتاخد منكِ لقمة 😂",

    "❤️ ربنا يحفظك يا أيوشتي ويكتب لكِ كل خير، ويخليكي دايمًا مبسوطة… بس متنسيش أخوكي لما ترجعي 😂",

    "😂 اليوم كام؟ مش مهم… المهم إن أيوشتي لسه فاكرة إن عندها أخ اسمه إسلام 😂",

    "📢 إعلان رسمي: أيوشتي مطالبة بالاستمتاع بالرحلة، والدعاء، وتصوير كل حاجة… وخاصة الحاجات اللي إسلام قال عليها 😂",

    "😂 أيوشتي، لو قابلتي إسلام في المنام قولي له يرجع ينام… عنده شغل 😂",

    "🤍 يا رب تكون كل خطوة في الرحلة سبب في راحة قلب أيوشتي، وكل دعوة سبب في فرحة جاية ليها.",

    "😂 وأخيرًا: متنسيش ترجعي… عشان البيت من غير أيوشتي هيبقى هادي زيادة عن اللزوم 😂❤️"

];


// ======================================================
// 🎭 رسائل أخوية عشوائية
// ======================================================

const islamBrotherMessages = [

    "🤍 ربنا يحفظك يا أيوشتي ويطمن قلبي عليكِ في كل خطوة.",

    "😂 أيوشتي، إسلام موجود… يعني مفيش هروب من الرخامة حتى في العمرة.",

    "❤️ مهما كنتِ بعيدة، أهم حاجة ترجعي لنا سالمة وفرحانة ومطمنة.",

    "🤲🏻 ربنا يكتب لكِ في الرحلة خيرًا كثيرًا، ويحقق لكِ كل أمنية فيها خير.",

    "😂 أيوشتي، خلي بالك من نفسك… أصل إسلام مش ناقص قلق 😂",

    "🤍 ربنا يجعل أيامك هناك كلها راحة وطمأنينة وبركة.",

    "😂 رسالة أخوية مهمة: كلي كويس، اشربي مية، وارتاحي… أيوه أنا أخوكِ مش الدكتور 😂",

    "❤️ ربنا يحفظك من كل سوء ويرجعك لنا بأجمل ذكريات.",

    "😂 لو تعبتي ارتاحي، ولو جعتي كلي، ولو عطشتي اشربي… ولو وحشك أخوكِ افتحي التطبيق 😂",

    "🤲🏻 يا رب كل دعوة تدعيها هناك يكون لها نصيب من القبول والخير."

];


// ======================================================
// 😂 عرض رسالة عشوائية من إسلام
// ======================================================

function showFunnyMessage() {

    const title =
        document.getElementById(
            "islamMessageTitle"
        );

    const text =
        document.getElementById(
            "islamMessageText"
        );


    if (!text) return;


    const allMessages = [
        ...islamFunnyMessages,
        ...islamBrotherMessages
    ];


    if (!allMessages.length) return;


    const randomIndex =
        Math.floor(
            Math.random() * allMessages.length
        );


    if (title) {

        title.textContent =
            "😂 رسالة من إسلام";

    }


    text.textContent =
        allMessages[randomIndex];

}


// ======================================================
// 💌 تحديد رسالة اليوم
// ======================================================

function getMessageDay() {

    const trip =
        getTripStatus();


    if (
        trip.status === "during"
    ) {

        return trip.day;

    }


    if (
        trip.status === "before"
    ) {

        return 1;

    }


    return TRIP_DAYS;

}


// ======================================================
// 💌 عرض رسالة اليوم
// ======================================================

function renderIslamMessage() {

    const title =
        document.getElementById(
            "islamMessageTitle"
        );

    const text =
        document.getElementById(
            "islamMessageText"
        );


    if (!title || !text) return;


    const day =
        getMessageDay();


    const index =
        Math.min(
            Math.max(day - 1, 0),
            islamMessages.length - 1
        );


    title.textContent =
        islamMessages[index].title;


    text.textContent =
        islamMessages[index].message;

}


// ======================================================
// 🤲 عرض دعاء عشوائي
// ======================================================

function showAnotherDua() {

    const text =
        document.getElementById(
            "islamMessageText"
        );

    const title =
        document.getElementById(
            "islamMessageTitle"
        );


    if (!text) return;


    if (!islamDuas.length) return;


    const randomIndex =
        Math.floor(
            Math.random() *
            islamDuas.length
        );


    if (title) {

        title.textContent =
            "دعاء من إسلام ❤️";

    }


    text.textContent =
        islamDuas[randomIndex];

}


// ======================================================
// 💌 قسم من إسلام
// ======================================================

function renderMessagesSection() {

    const section =
        document.getElementById(
            "messagesSection"
        );


    if (!section) {

        console.error(
            "❌ messagesSection غير موجود في index.html"
        );

        return;
    }


    section.innerHTML = `

        <button
            class="back-button"
            onclick="closeSections()">

            ← الرئيسية

        </button>


        <div class="umrah-header">

            <div class="umrah-icon">
                💌
            </div>


            <h2>
                من إسلام إلى أيوشتي
            </h2>


            <p>
                دعوات ورسائل مخصوصة ليكي ❤️
            </p>

        </div>


        <div class="completion-card">

            <div class="completion-icon">
                🤲🏻
            </div>


            <h3 id="islamMessageTitle">
                دعاء من إسلام ❤️
            </h3>


            <p
                id="islamMessageText"
                class="special-message">

            </p>


            <button
                class="primary-button"
                onclick="renderIslamMessage()">

                📅 دعاء اليوم

            </button>


            <button
                class="primary-button"
                onclick="showAnotherDua()">

                ❤️ دعاء آخر من إسلام

            </button>


            <button
                class="primary-button"
                onclick="showFunnyMessage()">

                😂 إسلام بيرخم عليكي

            </button>

        </div>

    `;


    renderIslamMessage();

}


// ======================================================
// 🚀 تشغيل تطبيق أيوشتي
// ======================================================

function initAyoushti() {

    console.log(
        "🌙 أيوشتي تعمل"
    );


    // -----------------------------
    // تحديث بطاقة الرحلة
    // -----------------------------

    updateTripUI();


    // -----------------------------
    // تحديث رسالة اليوم
    // -----------------------------

    renderIslamMessage();


    // -----------------------------
    // تسجيل الإشعارات
    // -----------------------------

    registerAyoushtiNotifications();

}


// ======================================================
// 🔔 تسجيل Service Worker
// ======================================================

async function registerAyoushtiNotifications() {

    if (!("serviceWorker" in navigator)) {

        console.error(
            "❌ المتصفح لا يدعم Service Worker"
        );

        return;
    }


    try {

        const registration =
            await navigator.serviceWorker.register(
                "./service-worker.js"
            );


        console.log(
            "✅ تم تسجيل Service Worker",
            registration
        );

    }

    catch (error) {

        console.error(
            "❌ فشل تسجيل Service Worker:",
            error
        );

    }

}


// ======================================================
// 🔔 تفعيل إشعارات أيوشتي
// ======================================================




// ======================================================
// 🚀 تشغيل التطبيق بعد تحميل الصفحة
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initAyoushti();

        console.log(
            "🔍 Capacitor:",
            window.Capacitor
        );

        console.log(
            "🔍 LocalNotifications:",
            window.Capacitor?.Plugins?.LocalNotifications
        );

    }
);