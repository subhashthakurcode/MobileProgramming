// components/AISuggestions.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const suggestions = [
  { id: "1", text: "You have a 2-hour gap after lunch. Good time for deep work." },
  { id: "2", text: "Drink some water! You haven't logged any today." },
];

export default function AISuggestions() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>AI Insights ✨</Text>

      {suggestions.map((s) => (
        <TouchableOpacity
          key={s.id}
          onPress={() => console.log("Clicked insight:", s.text)}
        >
          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionText}>{s.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: "#EEF2FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4F46E5",
  },
  suggestionText: { color: "#3730A3", fontSize: 14 },
});