// ======================================================
// 🔔 Ayoushti Notifications
// ======================================================

const LocalNotifications =
    window.Capacitor?.Plugins?.LocalNotifications;

async function enableAyoushtiNotifications() {

    if (!LocalNotifications) {

        console.error(
            "❌ LocalNotifications plugin غير متاح"
        );

        alert(
            "الإشعارات غير متاحة حاليًا داخل التطبيق."
        );

        return;
    }

    try {

        // طلب الصلاحية
        const permission =
            await LocalNotifications.requestPermissions();

        console.log(
            "🔔 Notification permission:",
            permission
        );

        if (permission.display !== "granted") {

            alert(
                "⚠️ لازم تسمحي للتطبيق بالإشعارات من إعدادات الهاتف."
            );

            return;
        }

        // إشعار تجريبي
        await LocalNotifications.schedule({

            notifications: [

                {

                    id: 1001,

                    title: "🌙 أيوشتي",

                    body:
                        "😂 دي رسالة تجريبية من إسلام… أيوشتي، إسلام موجود يعني مفيش هروب من الرخامة ❤️",

                    schedule: {
                        at: new Date(
                            Date.now() + 3000
                        )
                    },

                    extra: {
                        type: "test"
                    }

                }

            ]

        });

        console.log(
            "✅ تم جدولة الإشعار التجريبي"
        );

    }

    catch (error) {

        console.error(
            "❌ Notification Error:",
            error
        );

        alert(
            "حصل خطأ أثناء تفعيل الإشعارات."
        );

    }

}