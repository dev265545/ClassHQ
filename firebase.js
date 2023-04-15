// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe_YbXT7orfTPbDjcWPcFLf0Ke3GIgjoM",
  authDomain: "clone-67117.firebaseapp.com",
  projectId: "clone-67117",
  storageBucket: "clone-67117.appspot.com",
  messagingSenderId: "94968952752",
  appId: "1:94968952752:web:790b1e4b964b30a1aa0875",
  measurementId: "G-ZSVYS2LSML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
export {db};