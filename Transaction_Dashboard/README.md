# Transaction Dashboard 📊

**Transaction Dashboard** is a comprehensive frontend application for managing and visualizing financial transactions. It features a responsive table with advanced filtering, sorting, pagination, and search capabilities, simulating a real-world banking interface.

## 🚀 About the Project

This project simulates a financial dashboard where users can view a history of transactions, filter them by status (Success, Pending, Failed), sort by date or amount, and even add new transactions manually. It uses a mock API fetching strategy and LocalStorage to maintain state across sessions. The architecture leverages **ES6 Modules** for clean, maintainable code separation.

## ✨ Key Features

-   **Data Table**: Displays transactions with details like Date, Amount, Status, and Type.
-   **Advanced Filtering**: Filter records by status (All, Success, Pending, Failed).
-   **Sorting & Search**: Sort by date or amount, and search transactions by ID.
-   **Pagination**: Navigate through large datasets with page controls.
-   **Add Transaction**: Form to input new expense/income entries.
-   **State Management**: Centralized state with LocalStorage persistence.
-   **Mock API**: Simulates fetching initial data from an external source if no local data exists.

## 🛠️ Tech Stack & Tools

-   **HTML5**: Semantic structure for the dashboard.
-   **CSS3**: Styling for the card-based layout and responsive design.
-   **JavaScript (ES6 Modules)**: Modular architecture separating concerns (API, State, UI, Events).
-   **LocalStorage**: client-side data persistence.

## 🏗️ How It Works

1.  **Modular Structure**:
    -   `main.js`: Entry point that initializes the app.
    -   `state.js`: Manages the global state object (transactions, filters, pagination).
    -   `api.js`: Handles mock data fetching.
    -   `ui.js`: DOM manipulation functions for rendering the table and controls.
    -   `events.js`: Event listeners for user interactions.
2.  **Initialization**: On load, the app checks LocalStorage. If empty, it fetches mock data via `api.js` and saves it.
3.  **Reactivity**: Actions like sorting or filtering update the central state, which then triggers `updateDashboard()` to re-calculate and re-render the view.

---
*Manage your money smarter.*
