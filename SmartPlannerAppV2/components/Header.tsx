// components/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ onProfilePress }: any) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greetingText}>Good Morning,</Text>

        <TouchableOpacity onPress={() => console.log("Name clicked")}>
          <Text style={styles.userNameText}>Alex</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.profileIcon} onPress={onProfilePress}>
        <Text style={styles.profileInitials}>AL</Text>
      </TouchableOpacity>
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
  greetingText: {
    fontSize: 16,
    color: "#64748B",
  },
  userNameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
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