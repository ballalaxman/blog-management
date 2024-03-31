// @ts-nocheck
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ca921.firebaseapp.com",
  projectId: "mern-blog-ca921",
  storageBucket: "mern-blog-ca921.appspot.com",
  messagingSenderId: "514112393024",
  appId: "1:514112393024:web:645affa3a3139e963934a5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
