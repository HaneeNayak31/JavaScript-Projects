# Expense Tracker 💸

**Expense Tracker** is a lightweight web application that helps users manage their personal finances by tracking daily expenses. It uses the browser's local storage to persist data, ensuring that your expense list remains available even after refreshing the page.

## 🚀 About the Project

This project acts as a digital ledger where users can add new expenses with a name and amount, view a list of all recorded items, and see the total expenditure in real-time. It's designed to be simple, fast, and easy to use without requiring any backend setup.

## ✨ Key Features

-   **Add Expenses**: Input expense name and cost to add to the list.
-   **Live Totals**: Automatically calculates and displays the total sum of all expenses.
-   **Data Persistence**: Uses **LocalStorage** to save expenses, so data isn't lost on page reload.
-   **Delete Expenses**: Remove specific items from the list with a single click.
-   **Input Validation**: Prevents adding empty or invalid entries.

## 🛠️ Tech Stack & Tools

-   **HTML5**: Structure of the application.
-   **CSS3**: Basic styling for a clean interface.
-   **JavaScript (ES6)**: Logic for adding, deleting, and calculating expenses.
-   **LocalStorage API**: Browser-native database for persisting user data on the client side.

## 🏗️ How It Works

1.  **State Management**: The app maintains an array of expense objects in JavaScript.
2.  **Storage**: On every addition or deletion, the updated array is stringified and saved to `localStorage` under the key "expenses".
3.  **Initialization**: When the app loads, it retrieves and parses the stored data to repopulate the list.
4.  **DOM Manipulation**: JavaScript dynamically creates and removes list items (`<li>`) based on the current state.

---
*Track every penny.*
