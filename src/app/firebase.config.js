// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsJXipfmeneKOsWdVQl0Fpwj6Iph_S7uk",
  authDomain: "ecommerce-aef81.firebaseapp.com",
  projectId: "ecommerce-aef81",
  storageBucket: "ecommerce-aef81.appspot.com",
  messagingSenderId: "528566005458",
  appId: "1:528566005458:web:8474a9e8fb267abada470b",
  measurementId: "G-0TGKJSGM64"
};

// Initialize Firebase
 const eCommerce=initializeApp(firebaseConfig);

 export const db = getFirestore();

 export const auth=getAuth(eCommerce);
 
 onAuthStateChanged(auth,user=>{
  
   if(user != null){
     console.log('logged in')
   }
   else{
     console.log("no user found")
   }
 })
