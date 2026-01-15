require('dotenv').config();
const axios = require('axios');

const API_KEY = (process.env.GEMINI_API_KEY || "").replace(/;$/, "").trim();

async function listModels() {
  try {
    console.log("Using API Key:", API_KEY ? "Yes (..." + API_KEY.slice(-4) + ")" : "No");
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    console.log("\nAvailable Models:");
    const models = response.data.models;
    models.forEach(model => {
      if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes("predict")) {
         console.log(`- ${model.name} (${model.supportedGenerationMethods.join(", ")})`);
      }
    });

    // Specifically filter for image generation candidates if any
    console.log("\nImage Generation Candidates:");
    models.forEach(model => {
        if (model.name.includes("imagen") || model.name.includes("image")) {
            console.log(`- ${model.name}`);
        }
    });

  } catch (error) {
    console.error("Error listing models:", error.response?.data || error.message);
  }
}

listModels();
