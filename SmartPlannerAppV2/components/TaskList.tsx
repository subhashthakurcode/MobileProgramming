// components/TaskList.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

const initialTasks = [
  { id: "1", title: "Morning Standup", time: "10:00 AM", completed: false },
  { id: "2", title: "Project Review", time: "11:30 AM", completed: false },
  { id: "3", title: "Lunch with Sarah", time: "1:00 PM", completed: false },
  { id: "4", title: "Focus Time", time: "2:00 PM", completed: false },
];

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Today's Schedule</Text>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
});