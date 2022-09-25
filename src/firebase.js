// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBr2V9cdipYee6KNu1h6LE-DMJdoD6YmK8",
    authDomain: "whistlebugle-2d1d0.firebaseapp.com",
    databaseURL: "https://whistlebugle-2d1d0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "whistlebugle-2d1d0",
    storageBucket: "whistlebugle-2d1d0.appspot.com",
    messagingSenderId: "499421700362",
    appId: "1:499421700362:web:e6e0f1cd34085d7e111af3",
    measurementId: "G-PZ5H6M3XF4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);