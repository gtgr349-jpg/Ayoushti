// ======================================================
// 🔥 Firebase Messaging - أيوشتي
// ======================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getMessaging,
    getToken,
    onMessage
} from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";


// ======================================================
// 🔥 إعدادات Firebase
// ======================================================

const firebaseConfig = {

    apiKey:"AIzaSyAAJLsWAPfnA8TFzorydP6YoGxOA2-3czI",

    authDomain:
        "ayoushti-de097.firebaseapp.com",

    projectId:
        "ayoushti-de097",

    storageBucket:
        "ayoushti-de097.firebasestorage.app",

    messagingSenderId:
        "788081637968",

    appId:
        "1:788081637968:web:0b0ca35936a2ac46fb6f55",

    measurementId:
        "G-3Q9CM1QJT4"

};


// ======================================================
// 🚀 تشغيل Firebase
// ======================================================

const firebaseApp =
    initializeApp(firebaseConfig);


// ======================================================
// 🔔 تشغيل Firebase Messaging
// ======================================================

const messaging =
    getMessaging(firebaseApp);


// ======================================================
// 🔑 الحصول على Firebase Token
// ======================================================

async function registerFirebaseMessaging() {

    try {

        // التأكد من دعم الإشعارات
        if (!("Notification" in window)) {

            console.error(
                "❌ المتصفح لا يدعم الإشعارات"
            );

            return;
        }


        // التأكد من السماح
        if (
            Notification.permission !==
            "granted"
        ) {

            console.warn(
                "⚠️ الإشعارات غير مسموحة حتى الآن"
            );

            return;
        }


        // التأكد من Service Worker
        if (
            !("serviceWorker" in navigator)
        ) {

            console.error(
                "❌ Service Worker غير مدعوم"
            );

            return;
        }


        // انتظار Service Worker
        const registration =
            await navigator.serviceWorker.ready;


        console.log(
            "✅ Service Worker جاهز لـ Firebase"
        );


        // الحصول على Token
        const token =
            await getToken(
                messaging,
                {

                    vapidKey:
                        "BPUI155KTVpIBoLB9zlfcHxqsgAldYyKcS3OgCzQgOHL_t33tgtMv5y2Skwp19BBAiO5XpwGa3-llkwZADa_FhM",

                    serviceWorkerRegistration:
                        registration

                }
            );


        // ==================================================
        // ✅ نجاح
        // ==================================================

        if (token) {

            console.log(
                "🔥 Firebase Token تم الحصول عليه بنجاح"
            );


            console.log(
                "📱 Firebase Token موجود"
            );


            // حفظ Token
            localStorage.setItem(
                "ayoushtiFirebaseToken",
                token
            );


            console.log(
                "💾 تم حفظ Firebase Token بنجاح"
            );

        }


        // ==================================================
        // ⚠️ لا يوجد Token
        // ==================================================

        else {

            console.warn(
                "⚠️ Firebase لم يُرجع Token"
            );

        }

    }

    catch (error) {

        console.error(
            "❌ Firebase Messaging Error:",
            error
        );

    }

}


// ======================================================
// 📩 استقبال الرسائل والتطبيق مفتوح
// ======================================================

onMessage(
    messaging,
    payload => {

        console.log(
            "📩 رسالة Firebase وصلت:",
            payload
        );


        const notification =
            payload.notification || {};


        if (
            Notification.permission ===
            "granted"
        ) {

            new Notification(

                notification.title ||
                "🌙 أيوشتي",

                {

                    body:
                        notification.body ||
                        "💌 رسالة جديدة من إسلام ❤️",

                    icon:
                        "./icon-192.png"

                }

            );

        }

    }
);


// ======================================================
// 🚀 تشغيل Firebase Messaging
// ======================================================

registerFirebaseMessaging();