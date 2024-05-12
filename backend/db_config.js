import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDO-CTaRBzSjCR4C5nnluMP6nHeit5FM1M",
  authDomain: "hack-bangalore-2024.firebaseapp.com",
  projectId: "hack-bangalore-2024",
  storageBucket: "hack-bangalore-2024.appspot.com",
  messagingSenderId: "403908037976",
  appId: "1:403908037976:web:26e1d0b4e9c288fc6fa92d",
  measurementId: "G-6271NR4JX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };