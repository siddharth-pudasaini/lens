// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDf6YDfri95JGLJxCVfEMYU9__tHxnsjFc",
    authDomain: "food-lens-283ca.firebaseapp.com",
    projectId: "food-lens-283ca",
    storageBucket: "food-lens-283ca.firebasestorage.app",
    messagingSenderId: "64295060799",
    appId: "1:64295060799:web:e5fbe136966e7699a03f8a",
    measurementId: "G-Y96195J2S8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
