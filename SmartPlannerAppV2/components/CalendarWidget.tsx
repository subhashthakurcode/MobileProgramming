// components/CalendarWidget.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CalendarWidget() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedIndex, setSelectedIndex] = useState(new Date().getDay());

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>November 2025</Text>

      <View style={styles.calendarRow}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedIndex(index);
              console.log("Clicked day:", day);
            }}
          >
            <View
              style={[
                styles.dayContainer,
                selectedIndex === index && styles.activeDayContainer,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedIndex === index && styles.activeDayText,
                ]}
              >
                {day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedIndex === index && styles.activeDayText,
                ]}
              >
                {24 + (index - selectedIndex)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  dayContainer: {
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  activeDayContainer: { backgroundColor: "#4F46E5" },
  dayText: { fontSize: 12, color: "#64748B" },
  dateText: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  activeDayText: { color: "white" },
});