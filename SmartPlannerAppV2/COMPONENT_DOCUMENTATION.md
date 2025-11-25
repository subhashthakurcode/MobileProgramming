# Smart AI-Powered Personal Calendar & Planner App - Component Documentation

This document explains the components used in the dashboard implementation.

## 1. Header Component
- **Purpose**: Displays the user's greeting, name, and profile picture/initials.
- **Implementation**: A simple `View` containing `Text` elements for the greeting and name, and a circular `View` for the profile icon.
- **Styling**: Uses flexbox to align the text and profile icon horizontally.

## 2. CalendarWidget Component
- **Purpose**: Provides a visual representation of the current week.
- **Implementation**: 
  - Uses a `View` styled as a card.
  - Displays the current month/year as a title.
  - Renders a row of days (Sun-Sat) using `map`.
  - Highlights the current day (mocked logic for demonstration) with a different background color.
- **Styling**: Uses a white background with shadow for a card effect.

## 3. TaskList Component
- **Purpose**: Displays a list of tasks for the day.
- **Implementation**:
  - Manages state using `useState` for the list of tasks.
  - Renders a list of `TaskItem` components.
  - **TaskItem**: A `TouchableOpacity` that allows the user to toggle the completion status of a task. It shows a custom checkbox, task title, and time.
- **Interaction**: Tapping a task toggles its "completed" state, updating the visual style (strikethrough and filled checkbox).

## 4. AISuggestions Component
- **Purpose**: Shows AI-generated insights or suggestions (mocked).
- **Implementation**:
  - Renders a list of suggestions from a mock data array.
  - Each suggestion is displayed in a styled card with a distinctive border color to signify "AI" or "Insight".
- **Styling**: Uses a light indigo background to differentiate it from regular tasks.

## 5. Main App Component
- **Purpose**: The root component that assembles the dashboard.
- **Implementation**:
  - Uses `SafeAreaView` to handle device notches.
  - Uses `ScrollView` to allow the content to be scrollable.
  - Renders `Header`, `CalendarWidget`, `AISuggestions`, and `TaskList` in order.
