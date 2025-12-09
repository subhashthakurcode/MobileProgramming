// components/TaskItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default React.memo(function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onToggle(task.id)}
      style={styles.taskItem}
    >
      <View
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
      />

      <View style={styles.taskInfo}>
        <Text
          style={[styles.taskTitle, task.completed && styles.taskCompleted]}
        >
          {task.title}
        </Text>
        <Text style={styles.taskTime}>{task.time}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    marginRight: 16,
  },
  checkboxChecked: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, color: "#1E293B" },
  taskCompleted: { textDecorationLine: "line-through", color: "#94A3B8" },
  taskTime: { fontSize: 14, color: "#64748B", marginTop: 4 },
});