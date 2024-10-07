// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtoH0wRQ5BZ7fT6DFm-SpDw4YUEW5Iid0",
  authDomain: "cs392tutorial.firebaseapp.com",
  projectId: "cs392tutorial",
  storageBucket: "cs392tutorial.appspot.com",
  messagingSenderId: "605522652540",
  appId: "1:605522652540:web:98f9a16abf5ebd0e1cc8f9",
  measurementId: "G-BCS4P6YHCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);