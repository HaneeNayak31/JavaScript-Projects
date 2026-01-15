# Transaction Dashboard

A robust, vanilla JavaScript Transaction Dashboard built to demonstrate core frontend engineering concepts without reliance on external frameworks.

## 📌 Project Overview
The **Transaction Dashboard** is a single-page application (SPA) that allows users to view, filter, sort, and search financial transactions. It simulates a real-world environment with mock API fetching, client-side state management, and local storage persistence.

## ✨ Features

- **Semantic HTML5 Structure**: Accessible layout using `<header>`, `<main>`, `<section>`, and `<nav>`.
- **Mock API Layer**: Simulated `fetch` requests with network latency and randomized failure handling.
- **Dynamic Table Rendering**: Efficient DOM manipulation using `DocumentFragment` (Zero `innerHTML` abuse).
- **Client-Side Filters & Sorting**:
  - Filter by Status (Success, Pending, Failed).
  - Sort by Date (Newest/Oldest) and Amount (High/Low).
- **Pagination**: Client-side pagination logic.
- **Add Transaction Form**: Interactive form with validation to add new records.
- **Persistence**: Transactions are saved to `localStorage`, preserving data across page reloads.
- **Search**: Debounced "Search by ID" functionality for performance.
- **UX States**: Loading spinners and user-friendly error messages for network failures.
- **Responsive Design**: Modern Card-based layout with clean typography.

## 🛠 Tech Stack
- **Languages**: HTML5, CSS3, JavaScript (ES6+).
- **Architecture**: Modular JS (ES Modules) separating Service (API), State, Logic (Main), and View (UI).
- **Storage**: Browser `localStorage`.
- **Tools**: No frameworks or libraries. Pure Vanilla JS.

## 🧠 What I Learned
Through building this project, I demonstrated mastery of:
1.  **State Management**: Centralized state object acting as the single source of truth for UI rendering.
2.  **Asynchronous JavaScript**: Handling `Promise` based APIs, `async/await`, and clean error handling patterns.
3.  **DOM Manipulation**: Creating and updating DOM elements imperatively for maximum performance and security.
4.  **Debouncing**: Optimizing high-frequency events (like search input) to improve performance.
5.  **Browser APIs**: Utilizing `localStorage` for data persistence.

## 🚀 How to Run
1.  Clone the repository or download the files.
2.  Open `index.html` in any modern web browser.
    - *Note*: For ES Modules to work, you may need to serve the file via a local server (e.g., VS Code Live Server extension, or `npx serve`, or `python -m http.server`) to avoid CORS policies on local `file://` protocol.
