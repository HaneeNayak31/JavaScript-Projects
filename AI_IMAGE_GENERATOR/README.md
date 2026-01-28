# AI Image Generator 🎨

**AI Image Generator** is a web-based tool that transforms text descriptions into stunning visual art using advanced AI models. It features a modern, dark-themed interface where users can customize their image generation settings.

## 🚀 About the Project

This project provides a user-friendly interface to interact with AI image generation APIs. Users can input creative prompts, select from different AI models (like Stable Diffusion or OpenJourney), and generate multiple images in various aspect ratios. It includes features like random prompt generation and direct image downloads.

## ✨ Key Features

-   **Text-to-Image Generation**: Convert text prompts into high-quality images.
-   **Model Selection**: Choose between different AI models (e.g., SD v1.5, OpenJourney) to suit the desired art style.
-   **Customization Options**:
    -   **Image Count**: Generate up to 4 images at once.
    -   **Aspect Ratio**: Support for Square (1:1), Wide (16:9), and Portrait (9:16) formats.
-   **Random Prompts**: "Surprise me" style button to auto-fill creative prompts.
-   **Gallery View**: Display generated images in a grid layout with loading states.
-   **Download Support**: Easily download generated images to your device.
-   **Dark/Light Theme**: Built-in theme toggle for comfortable viewing.

## 🛠️ Tech Stack & Tools

-   **HTML5**: Structure and semantic markup.
-   **CSS3**: Custom styling with variables for theming and responsive layouts.
-   **JavaScript (ES6+)**: Handles form logic, API requests, and DOM manipulation.
-   **FontAwesome**: Icons for UI elements.
-   **API Integration**: Connects to a backend service (or directly to Hugging Face API) to fetch generated images.

## 🏗️ How It Works

1.  **Input**: The user provides a text description and selects configuration options (model, count, ratio).
2.  **Request**: The app sends a POST request to the configured API endpoint (`/api/generate-image`) with the parameters.
3.  **Processing**: The backend processes the request using the selected AI model and returns the images in Base64 format.
4.  **Display**: The frontend receives the data and dynamically creates image cards to display the results.
5.  **Interaction**: Users can view the images and click the download button to save them locally.

---
*Turn your imagination into reality.*
