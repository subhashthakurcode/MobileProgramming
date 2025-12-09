// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF2U2j-FgWpyqnJl6EkaTLjGhrSEbNiJE",
  authDomain: "mobile-programming-9ade2.firebaseapp.com",
  projectId: "mobile-programming-9ade2",
  storageBucket: "mobile-programming-9ade2.firebasestorage.app",
  messagingSenderId: "980544393358",
  appId: "1:980544393358:web:ef4d035b7752361279b9df",
  measurementId: "G-7VF68QXDP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize analytics with error handling
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics initialization failed (expected in development):", error);
  analytics = null;
}

export { db, analytics };