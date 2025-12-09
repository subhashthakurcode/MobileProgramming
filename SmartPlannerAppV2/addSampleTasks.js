const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

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

const sampleTasks = [
  { title: "Morning Standup", time: "10:00 AM", completed: false },
  { title: "Project Review", time: "11:30 AM", completed: false },
  { title: "Lunch with Sarah", time: "1:00 PM", completed: false },
  { title: "Focus Time", time: "2:00 PM", completed: false },
];

async function addSampleTasks() {
  try {
    // Check if tasks already exist to avoid duplicates
    const existingSnapshot = await getDocs(collection(db, "tasks"));
    if (!existingSnapshot.empty) {
      console.log("Tasks already exist. Skipping sample data creation.");
      return;
    }

    for (const task of sampleTasks) {
      await addDoc(collection(db, "tasks"), task);
      console.log(`Added task: ${task.title}`);
    }
    console.log("All sample tasks added successfully!");
  } catch (error) {
    console.error("Error adding tasks:", error);
    if (error.code === 'permission-denied') {
      console.error("Firestore permissions denied. Check your Firestore security rules.");
    } else if (error.code === 'unavailable') {
      console.error("Firestore is unavailable. Check your network connection.");
    }
  }
}

addSampleTasks();