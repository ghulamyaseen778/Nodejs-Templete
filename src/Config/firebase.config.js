// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsckABPiJTp8CUdUkiJOdby6Gv65yEzQ",
  authDomain: "desksskill.firebaseapp.com",
  projectId: "desksskill",
  storageBucket: "desksskill.appspot.com",
  messagingSenderId: "738824486534",
  appId: "1:738824486534:web:e9ff215e06a3a63fd99b07"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Storage = getStorage(app)

export {Storage}