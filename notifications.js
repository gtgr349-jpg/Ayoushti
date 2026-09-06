const LocalNotifications =
    window.Capacitor?.Plugins?.LocalNotifications;

async function enableAyoushtiNotifications() {

    const button = document.getElementById("notificationButton");

    if (LocalNotifications) {
        try {
            const permission =
                await LocalNotifications.requestPermissions();

            if (permission.display !== "granted") {
                alert("âš ï¸ Ù„Ø§Ø²Ù… ØªØ³Ù…Ø­ÙŠ Ù„Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ù…Ù† Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù‡Ø§ØªÙ.");
                return;
            }

            return;

        } catch (error) {
            console.error("âŒ Native Notification Error:", error);
        }
    }

    if (!("Notification" in window)) {
        alert("âš ï¸ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ØºÙŠØ± Ù…Ø¯Ø¹ÙˆÙ…Ø© Ø¹Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ø¬Ù‡Ø§Ø² Ø£Ùˆ Ø§Ù„Ù…ØªØµÙØ­.");
        return;
    }

    try {

        let permission = Notification.permission;

        if (permission === "default") {
            permission = await Notification.requestPermission();
        }

        if (permission !== "granted") {
            alert("âš ï¸ Ù„Ø§Ø²Ù… ØªØ³Ù…Ø­ÙŠ Ù„Ù„Ù…ØªØµÙØ­ Ø¨Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª.");
            return;
        }

        try {

            const registration =
                await navigator.serviceWorker.ready;

        } catch (serviceWorkerError) {

            console.warn(
                "Service Worker notification failed:",
                serviceWorkerError
            );
        }

    } catch (error) {

        console.error(
            "âŒ Browser Notification Error:",
            error
        );

        alert("Ø­ØµÙ„ Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª.");
    }
}
