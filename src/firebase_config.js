import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLT1HygTML7TeOT986R4CTgMq5JDy1A1o",
  authDomain: "note-app-91d48.firebaseapp.com",
  projectId: "note-app-91d48",
  storageBucket: "note-app-91d48.firebasestorage.app",
  messagingSenderId: "188758610545",
  appId: "1:188758610545:web:2ea929ab94e878d00e41d0",
  measurementId: "G-V636L1XVE8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 const db = getFirestore(app);
export default db;