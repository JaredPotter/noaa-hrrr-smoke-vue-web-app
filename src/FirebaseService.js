// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBm3G8izywDgeMVjEvFUa0MynIqf4uvzY',
  authDomain: 'noaa-hrrr-smoke.firebaseapp.com',
  projectId: 'noaa-hrrr-smoke',
  storageBucket: 'noaa-hrrr-smoke.appspot.com',
  messagingSenderId: '693020610984',
  appId: '1:693020610984:web:128dcf396734f5d9f58d9d',
  measurementId: 'G-PFZV6G0L9G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
  app,
};
