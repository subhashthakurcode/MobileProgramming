import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, push } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';

type AddTaskScreenProps = {
  onTaskAdded: () => void;
};

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize with a Date object
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter task title');
      return;
    }

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    setIsLoading(true);
    try {
      const tasksRef = ref(database, 'tasks');
      await push(tasksRef, {
        title,
        description,
        date: formattedDate, // Use the formatted date
        priority,
        createdAt: new Date().toISOString(),
        completed: false
      });
      Alert.alert('Success', 'Task added successfully!');
      setTitle('');
      setDescription('');
      setDate(new Date());
      setPriority('');
      onTaskAdded(); // Notify parent component that a task was added
    } catch (error: any) {
      Alert.alert('Error adding task', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        editable={!isLoading}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: date ? '#000' : '#C7C7CD' }}>
          {`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(Platform.OS === 'ios');
            setDate(currentDate);
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Priority (e.g., High, Medium, Low)"
        value={priority}
        onChangeText={setPriority}
        editable={!isLoading}
      />
      <Button
        title={isLoading ? "Adding Task..." : "Add Task"}
        onPress={handleAddTask}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default AddTaskScreen;