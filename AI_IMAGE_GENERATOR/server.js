const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const API_KEY = process.env.HF_API_KEY || "YOUR_HF_API_KEY";

app.post('/api/generate-image', async (req, res) => {
  try {
    const { model, prompt, width, height } = req.body;

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        inputs: prompt,
        parameters: { width, height },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const buffer = Buffer.from(response.data, 'binary');
    const base64 = buffer.toString('base64');

    res.json({
      success: true,
      data: [{ b64_json: base64 }],
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error || error.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
