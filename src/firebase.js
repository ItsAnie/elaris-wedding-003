import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8mnSPTjMz_xCZv__QabOSxFgfsSpWmRw",
  authDomain: "elegant-wedding-6712b.firebaseapp.com",
  projectId: "elegant-wedding-6712b",
  storageBucket: "elegant-wedding-6712b.firebasestorage.app",
  messagingSenderId: "168423092231",
  appId: "1:168423092231:web:efee204f2a2e14804bbaa2",
  measurementId: "G-QDR3G161FX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);