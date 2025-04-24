// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_ooMHv1R_5D9g_c5Bg-S_l30ZfZjeTTM",
  authDomain: "professionalpracticeit.firebaseapp.com",
  projectId: "professionalpracticeit",
  storageBucket: "professionalpracticeit.firebasestorage.app",
  messagingSenderId: "677149355521",
  appId: "1:677149355521:web:acb4629cce96973aabda00",
  measurementId: "G-K4LE652XBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);