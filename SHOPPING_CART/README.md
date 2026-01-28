# Simple E-Commerce Cart 🛒

**Simple E-Commerce Cart** is a lightweight Javascript application that simulates a basic online shopping experience. It allows users to browse products, add them to a shopping cart, and proceed to checkout, with all data persisting across page reloads.

## 🚀 About the Project

This project demonstrates the core logic behind an e-commerce shopping cart without the need for a complex backend. Users can add multiple products, view their cart with a calculated total price, and remove items. It uses LocalStorage to ensure that the cart contents are saved even if the browser is closed.

## ✨ Key Features

-   **Product Listing**: dynamically displays a list of available products with prices.
-   **Add to Cart**: Users can add items to their personal cart.
-   **Cart Management**: View selected items, remove specific products, and see the live total cost.
-   **Persistent Storage**: The cart's state is saved in the browser's **LocalStorage**, so items remain after refreshing.
-   **Checkout Simulation**: A simple checkout process that clears the cart and confirms the order.

## 🛠️ Tech Stack & Tools

-   **HTML5**: Structure for the product grid and cart section.
-   **CSS3**: Styling for the layout and components.
-   **JavaScript (ES6)**: Logic for cart operations (add, remove, calculate total) and DOM updates.
-   **LocalStorage API**: Used to persist cart data on the client side.

## 🏗️ How It Works

1.  **Product Data**: Products are defined as an array of objects in JavaScript.
2.  **Cart Array**: An array maintains the current state of items in the cart.
3.  **Event Handling**:
    -   Clicking "Add to Cart" pushes the product object to the cart array and saves it to LocalStorage.
    -   Clicking "Remove" splices the item from the array and updates LocalStorage.
4.  **Rendering**: The `renderCart()` function clears and rebuilds the cart HTML based on the current array, updating the total price dynamically.

---
*Shop simply.*
