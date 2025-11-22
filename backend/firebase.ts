import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseApiKey = process.env.FIREBASE_API_KEY;

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "song-browsing-app.firebaseapp.com",
  projectId: "song-browsing-app",
  storageBucket: "song-browsing-app.firebasestorage.app",
  messagingSenderId: "528449180926",
  appId: "1:528449180926:web:aa5608c257b3fdb1cec1af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);