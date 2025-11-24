import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';

// --- Types ---
type Task = {
  id: string;
  title: string;
  time: string;
  completed: boolean;
};

type Suggestion = {
  id: string;
  text: string;
  type: 'wellness' | 'productivity' | 'reminder';
};

// --- Mock Data ---
const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Morning Standup', time: '10:00 AM', completed: false },
  { id: '2', title: 'Project Review', time: '11:30 AM', completed: false },
  { id: '3', title: 'Lunch with Sarah', time: '1:00 PM', completed: false },
  { id: '4', title: 'Focus Time', time: '2:00 PM', completed: false },
];

const MOCK_SUGGESTIONS: Suggestion[] = [
  { id: '1', text: 'You have a 2-hour gap after lunch. Good time for deep work.', type: 'productivity' },
  { id: '2', text: 'Drink some water! You haven\'t logged any today.', type: 'wellness' },
];

// --- Components ---

const Header = () => (
  <View style={styles.headerContainer}>
    <View>
      <Text style={styles.greetingText}>Good Morning,</Text>
      <Text style={styles.userNameText}>Alex</Text>
    </View>
    <View style={styles.profileIcon}>
      <Text style={styles.profileInitials}>AL</Text>
    </View>
  </View>
);

const CalendarWidget = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = new Date().getDay();

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>November 2025</Text>
      <View style={styles.calendarRow}>
        {days.map((day, index) => (
          <View key={day} style={[styles.dayContainer, index === currentDay && styles.activeDayContainer]}>
            <Text style={[styles.dayText, index === currentDay && styles.activeDayText]}>{day}</Text>
            <Text style={[styles.dateText, index === currentDay && styles.activeDayText]}>{24 + index - currentDay}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const TaskItem = ({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) => (
  <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.taskItem}>
    <View style={[styles.checkbox, task.completed && styles.checkboxChecked]} />
    <View style={styles.taskInfo}>
      <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>{task.title}</Text>
      <Text style={styles.taskTime}>{task.time}</Text>
    </View>
  </TouchableOpacity>
);

const TaskList = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} />
      ))}
    </View>
  );
};

const AISuggestions = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>AI Insights ✨</Text>
    {MOCK_SUGGESTIONS.map(suggestion => (
      <View key={suggestion.id} style={styles.suggestionCard}>
        <Text style={styles.suggestionText}>{suggestion.text}</Text>
      </View>
    ))}
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <CalendarWidget />
        <AISuggestions />
        <TaskList />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 16,
    color: '#64748B',
  },
  userNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  activeDayContainer: {
    backgroundColor: '#4F46E5',
  },
  dayText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  activeDayText: {
    color: 'white',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 16,
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskTime: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  suggestionCard: {
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  suggestionText: {
    color: '#3730A3',
    fontSize: 14,
    lineHeight: 20,
  },
});
