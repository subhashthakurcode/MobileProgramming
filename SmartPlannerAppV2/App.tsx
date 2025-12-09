import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, StatusBar, Platform, StyleSheet } from "react-native";

import Header from "./components/Header";
import CalendarWidget from "./components/CalendarWidget";
import AISuggestions from "./components/AISuggestions";
import TaskList from "./components/TaskList";
import LoginScreen from "./components/LoginScreen";
import AddTaskScreen from "./components/AddTaskScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddTaskScreen, setShowAddTaskScreen] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleAddTaskPress = useCallback(() => {
    setShowAddTaskScreen(true);
  }, []);

  const handleTaskAdded = useCallback(() => {
    setShowAddTaskScreen(false);
    // Optionally, refresh task list here if needed
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (showAddTaskScreen) {
    return <AddTaskScreen onTaskAdded={handleTaskAdded} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header onProfilePress={() => {}} onAddTaskPress={handleAddTaskPress} />
        <CalendarWidget />
        <AISuggestions />
        <TaskList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: { padding: 20 },
});
//