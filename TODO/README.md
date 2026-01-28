# Task Manager (Todo App) ✅

**Task Manager** is a feature-rich Todo App built with vanilla JavaScript that helps users organize their daily tasks. It allows for adding, editing, deleting, and filtering tasks, all while saving your progress in the browser.

## 🚀 About the Project

This project provides a clean and intuitive interface for managing tasks. Users can create new todos, mark them as completed, update their details, or remove them entirely. It includes tabs to filter between all, pending, and completed tasks, keeping the view organized.

## ✨ Key Features

-   **Add Tasks**: Quickly input new tasks to your list.
-   **Edit Tasks**: Modify existing tasks directly from the list.
-   **Status Updates**: Check off tasks to mark them as completed.
-   **Filtering**: Toggle views between **All**, **Pending**, and **Completed** tasks.
-   **Clear All**: Remove all tasks at once with a single button.
-   **Persistent Data**: All tasks are saved in **LocalStorage**, ensuring data remains available after refreshing.
-   **Responsive Design**: Optimized for different screen sizes.

## 🛠️ Tech Stack & Tools

-   **HTML5**: Structure of the task board.
-   **CSS3**: Custom styling for interactivity and layout.
-   **JavaScript**: Handles all CRUD operations (Create, Read, Update, Delete) and state management.
-   **FontAwesome**: Icons for actions like edit, delete, and menu.

## 🏗️ How It Works

1.  **State**: The app maintains an array of task objects (`{ name, status }`).
2.  **Rendering**: The `showTodo(filter)` function dynamically generates the HTML list items based on the current filter selection.
3.  **Local Storage**: Every change (add, edit, delete, status change) triggers a `saveTaks()` function that syncs the array with LocalStorage.
4.  **Event Listeners**: Attached to buttons and inputs to handle user interactions like typing, clicking, and checking boxes.

---
*Get things done.*
