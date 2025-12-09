// components/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderProps {
  onProfilePress: () => void;
  onAddTaskPress: () => void;
}

export default function Header({ onProfilePress, onAddTaskPress }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greetingText}>Good Morning,</Text>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.userNameText}>Alex</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.addTaskIcon} onPress={onAddTaskPress}>
          <Text style={styles.addTaskText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIcon} onPress={onProfilePress}>
          <Text style={styles.profileInitials}>AL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rightIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 16,
    color: "#64748B",
  },
  userNameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
  },
  addTaskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addTaskText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});