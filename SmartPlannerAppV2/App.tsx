import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Platform, StyleSheet } from "react-native";

import Header from "./components/Header";
import CalendarWidget from "./components/CalendarWidget";
import AISuggestions from "./components/AISuggestions";
import TaskList from "./components/TaskList";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header onProfilePress={() => console.log("Profile clicked")} />
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