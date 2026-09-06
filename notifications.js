const LocalNotifications =
    window.Capacitor?.Plugins?.LocalNotifications;

async function enableAyoushtiNotifications() {

    const button = document.getElementById("notificationButton");

    try {

        // ==========================================
        // 📱 Capacitor / Android
        // ==========================================

        if (LocalNotifications) {

            const permission =
                await LocalNotifications.requestPermissions();

            if (permission.display !== "granted") {

                alert(
                    "⚠️ لازم تسمحي للتطبيق بإرسال الإشعارات من إعدادات الهاتف."
                );

                return;
            }

            if (button) {
                button.textContent = "🔔 الإشعارات مفعلة";
            }

            console.log(
                "✅ Local Notifications permission granted"
            );

            return;
        }


        // ==========================================
        // 🌐 PWA / Browser
        // ==========================================

        if (!("Notification" in window)) {

            alert(
                "⚠️ الإشعارات غير مدعومة على هذا الجهاز."
            );

            return;
        }


        let permission = Notification.permission;

        if (permission === "default") {

            permission =
                await Notification.requestPermission();
        }


        if (permission !== "granted") {

            alert(
                "⚠️ لازم تسمحي للمتصفح بإرسال الإشعارات."
            );

            return;
        }


        // التأكد من وجود Service Worker
        if ("serviceWorker" in navigator) {

            try {

                await navigator.serviceWorker.ready;

                console.log(
                    "✅ Service Worker ready for notifications"
                );

            } catch (serviceWorkerError) {

                console.warn(
                    "⚠️ Service Worker notification setup failed:",
                    serviceWorkerError
                );
            }
        }


        if (button) {
            button.textContent = "🔔 الإشعارات مفعلة";
        }

        console.log(
            "✅ Browser notifications permission granted"
        );

    } catch (error) {

        console.error(
            "❌ Notification setup failed:",
            error
        );
    }
}
