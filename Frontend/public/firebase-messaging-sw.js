// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBND1Y_PEQ2MNk68sYQym8WR5UZH6VROR8",
  authDomain: "healmate-6b3b6.firebaseapp.com",
  projectId: "healmate-6b3b6",
  storageBucket: "healmate-6b3b6.firebasestorage.app",
  messagingSenderId: "870788450265",
  appId: "1:870788450265:web:b883c61c80c1cae8787bc8",
  measurementId: "G-V22LS2VPE5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
