// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDt4gv-Phz9UljbMnLwQAYAmagdmte2MuI",
  authDomain: "tigergrub.firebaseapp.com",
  projectId: "tigergrub",
  storageBucket: "tigergrub.firebasestorage.app",
  messagingSenderId: "774238777295",
  appId: "1:774238777295:web:472bf310843b8ae75a6cba",
  measurementId: "G-8PQ5GMQY73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);