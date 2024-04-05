
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0jQbV7q46OjBrGkQ2PF0JfXq7aR5hIhg",
  authDomain: "hogamilan-374c2.firebaseapp.com",
  databaseURL: "https://hogamilan-374c2-default-rtdb.firebaseio.com",
  projectId: "hogamilan-374c2",
  storageBucket: "hogamilan-374c2.appspot.com",
  messagingSenderId: "14121297363",
  appId: "1:14121297363:web:eaa269ea1b3f450ba73b26",
  measurementId: "G-ZN5RB89NXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getAuth(app);





// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyAUr5XH60zt3U6wh2GUKKc-plPwc-rilXU",
//   authDomain: "expertapp-86aba.firebaseapp.com",
//   projectId: "expertapp-86aba",
//   storageBucket: "expertapp-86aba.appspot.com",
//   messagingSenderId: "729957261858",
//   appId: "1:729957261858:web:a6eb632579c7b2f2a4607b",
//   measurementId: "G-DWRKN7PFP2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);