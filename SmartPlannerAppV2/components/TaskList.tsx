// components/TaskList.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, doc, updateDoc, query, where } from "firebase/firestore";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  description?: string;
  date?: string;
  priority?: string;
}

export default React.memo(function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Temporary text to check for rendering issues
  // return <Text>Debugging TaskList</Text>;

  useEffect(() => {
    console.log("TaskList: useEffect triggered");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const todayDateString = `${year}-${month}-${day}`;

    // Set loading timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("TaskList: Loading timeout reached");
        setLoading(false);
        setError("Connection timeout. Please check your network.");
      }
    }, 10000); // 10 second timeout

    console.log("TaskList: Subscribing to Firestore 'tasks' collection, filtering for today: ", todayDateString);
    // Subscribe to tasks collection with debouncing
    let timeoutId: NodeJS.Timeout;
    
    const tasksQuery = query(collection(db, "tasks"), where("date", "==", todayDateString));

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        console.log("TaskList: onSnapshot success callback triggered");
        // Debounce updates to prevent excessive re-renders
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          console.log("TaskList: Processing snapshot data");
          const tasksData = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || 'Untitled Task',
              time: data.time || '12:00 PM',
              completed: data.completed || false,
              description: data.description,
              date: data.date,
              priority: data.priority
            };
          });
          console.log("TaskList: Setting tasks, loading to false, error to null");
          setTasks(tasksData);
          setLoading(false);
          setError(null);
        }, 100); // 100ms debounce
      },
      (error) => {
        console.error("TaskList: onSnapshot error:", error);
        // Remove console.error in production to reduce noise
        setError("Failed to load tasks. Please check your connection.");
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      console.log("TaskList: Unsubscribing from Firestore");
      unsubscribe();
      clearTimeout(timeoutId);
      clearTimeout(loadingTimeout);
    };
  }, []);

  const toggleTask = async (id: string) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      const task = tasks.find(t => t.id === id);
      if (task) {
        await updateDoc(taskDoc, {
          completed: !task.completed
        });
      }
    } catch (error) {
      console.error("TaskList: toggleTask error:", error);
      // Silent error handling to reduce console noise
    }
  };

  // if (loading) {
  //   console.log("TaskList: Rendering loading state");
  //   return (
  //     <View style={styles.section}>
  //       <Text style={styles.title}>Today's Schedule</Text>
  //       <Text style={styles.message}>Loading tasks...</Text>      </View>
  //   );
  // }
  // if (error) {
  //   console.log("TaskList: Rendering error state");
  //   return (
  //     <View style={styles.section}>
  //       <Text style={styles.title}>Today's Schedule</Text>
  //       <Text style={styles.error}>{error}</Text>
  //     </View>
  //   );
  // }

  console.log("TaskList: Rendering task list");
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Today's Schedule</Text>

      {tasks.length === 0 ? (
        <Text style={styles.message}>No tasks scheduled for today.</Text>
      ) : (
        tasks.map((task) => {
          try {
            return <TaskItem key={task.id} task={task} onToggle={toggleTask} />;
          } catch (e: any) {
            console.error("Error rendering TaskItem for task:", task, e);
            return <Text style={styles.error}>Error displaying task: {task.title || 'Unknown'}</Text>;
          }
        })
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    padding: 20,
  },
  error: {
    fontSize: 14,
    color: "#EF4444",
    textAlign: "center",
    padding: 20,
  },
});