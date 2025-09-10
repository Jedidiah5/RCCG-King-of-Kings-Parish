// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt_RhT3VxKEZbbQfFH36-2UVsaoNMyUH0",
  authDomain: "rccg-king-of-kings-c670a.firebaseapp.com",
  projectId: "rccg-king-of-kings-c670a",
  storageBucket: "rccg-king-of-kings-c670a.firebasestorage.app",
  messagingSenderId: "469610021132",
  appId: "1:469610021132:web:34ddcfc62f7a34cf390929",
  measurementId: "G-79LVNYW85F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
