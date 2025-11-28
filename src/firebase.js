import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// นำค่า Config จาก Firebase Console -> Project Settings -> General -> Your apps มาวางตรงนี้
const firebaseConfig = {
    apiKey: "AIzaSyBHWaulOrPle2DFrf_8gjisLFeOC9tXeTA",
    authDomain: "aaitaam-exhibition-9e149.firebaseapp.com",
    projectId: "aaitaam-exhibition-9e149",
    storageBucket: "aaitaam-exhibition-9e149.firebasestorage.app",
    messagingSenderId: "1024624731136",
    appId: "1:1024624731136:web:52b153f4e6fe43233ca4e5",
    measurementId: "G-PNTCP712KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, logEvent };