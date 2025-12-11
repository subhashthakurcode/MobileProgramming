// components/TaskList.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import { database } from "../firebaseConfig";
import { ref, onValue, update } from "firebase/database";

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

    const tasksRef = ref(database, 'tasks');

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        const tasksList = Object.keys(tasksData).map(key => ({
          id: key,
          ...tasksData[key]
        }));
        setTasks(tasksList);
      } else {
        setTasks([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("TaskList: onValue error:", error);
      setError("Failed to load tasks. Please check your connection.");
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      console.log("TaskList: Unsubscribing from Realtime Database");
      unsubscribe();
    };
  }, []);

  const toggleTask = async (id: string) => {
    try {
      const taskRef = ref(database, `tasks/${id}`);
      const task = tasks.find(t => t.id === id);
      if (task) {
        await update(taskRef, {
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