// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwFVgvuASE-cQReGsGQ8_sGvgQRtjVFQQ",
  authDomain: "inventory-management-fda3f.firebaseapp.com",
  projectId: "inventory-management-fda3f",
  storageBucket: "inventory-management-fda3f.appspot.com",
  messagingSenderId: "784775337048",
  appId: "1:784775337048:web:43bd26913a748ef02ca62d",
  measurementId: "G-E5T0BSPXW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}