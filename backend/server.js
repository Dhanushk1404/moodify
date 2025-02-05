// backend/server.js

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Your Hugging Face API Key (stored in .env file)
const apiKey = process.env.HUGGING_FACE_API_KEY;
console.log(apiKey);


// Emotion detection route
app.post("/detect-emotion", async (req, res) => {
    const text = req.body.text;
    console.log("Received text:", text);
  
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          timeout: 15000, // Set a timeout
        }
      );
  
    //   console.log("API Response Data:", response.data);
      
      if (!response.data || !response.data[0]) {
        console.log("Unexpected API response format:", response.data);
        return res.status(500).json({ error: "Unexpected API response format" });
      }
  
      const emotion = response.data[0][0]?.label; // Access the first object inside the nested array
      console.log("Detected Emotion:", emotion);
  
      res.json({ emotion });
    } catch (error) {
      console.error("Error detecting emotion:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to detect emotion" });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
