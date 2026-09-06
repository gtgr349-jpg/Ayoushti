const LocalNotifications =
    window.Capacitor?.Plugins?.LocalNotifications;

async function enableAyoushtiNotifications() {

    const button = document.getElementById("notificationButton");

    if (LocalNotifications) {
        try {
            const permission =
                await LocalNotifications.requestPermissions();

            if (permission.display !== "granted") {
                alert("⚠️ لازم تسمحي للتطبيق بالإشعارات من إعدادات الهاتف.");
                return;
            }

            await LocalNotifications.schedule({
                notifications: [{
                    id: 1001,
                    title: "🌙 أيوشتي",
                    body: "😂 دي رسالة تجريبية من إسلام… أيوشتي، إسلام موجود يعني مفيش هروب من الرخامة ❤️",
                    schedule: {
                        at: new Date(Date.now() + 3000)
                    },
                    extra: {
                        type: "test"
                    }
                }]
            });

            if (button) {
                button.innerHTML =
                    "<span>✅</span>" +
                    "<span>رسائل إسلام مفعلة</span>" +
                    "<small>هتوصلك التذكيرات خلال الرحلة 🤍</small>";
            }

            return;

        } catch (error) {
            console.error("❌ Native Notification Error:", error);
        }
    }

    if (!("Notification" in window)) {
        alert("⚠️ الإشعارات غير مدعومة على هذا الجهاز أو المتصفح.");
        return;
    }

    try {

        let permission = Notification.permission;

        if (permission === "default") {
            permission = await Notification.requestPermission();
        }

        if (permission !== "granted") {
            alert("⚠️ لازم تسمحي للمتصفح بإرسال الإشعارات.");
            return;
        }

        try {

            const registration =
                await navigator.serviceWorker.ready;

            await registration.showNotification(
                "🌙 أيوشتي",
                {
                    body: "😂 دي رسالة تجريبية من إسلام… أيوشتي، إسلام موجود يعني مفيش هروب من الرخامة ❤️",
                    icon: "./icon-192.png",
                    badge: "./icon-192.png",
                    tag: "ayoushti-test"
                }
            );

        } catch (serviceWorkerError) {

            console.warn(
                "Service Worker notification failed:",
                serviceWorkerError
            );

            new Notification(
                "🌙 أيوشتي",
                {
                    body: "😂 دي رسالة تجريبية من إسلام… أيوشتي، إسلام موجود يعني مفيش هروب من الرخامة ❤️",
                    icon: "./icon-192.png",
                    tag: "ayoushti-test"
                }
            );
        }

        if (button) {
            button.innerHTML =
                "<span>✅</span>" +
                "<span>رسائل إسلام مفعلة</span>" +
                "<small>هتوصلك التذكيرات خلال الرحلة 🤍</small>";
        }

    } catch (error) {

        console.error(
            "❌ Browser Notification Error:",
            error
        );

        alert("حصل خطأ أثناء تفعيل الإشعارات.");
    }
}