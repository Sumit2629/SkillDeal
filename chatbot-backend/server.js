// Load the secret key from your .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Get the Google API Key from the .env file
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// --- Safety Check ---
if (!GOOGLE_API_KEY) {
  console.error("FATAL ERROR: The GOOGLE_API_KEY is not set in the .env file.");
  process.exit(1);
}

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- The API Endpoint for Gemini ---
app.post('/ask', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // The URL for the Gemini API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`;
  
  // The data structure required by the Gemini API
  const requestBody = {
    contents: [{
      parts: [{
        text: message
      }]
    }]
  };

  try {
    // We use 'fetch' to make the API call to Google
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("Error from Google API:", errorData);
      throw new Error('Failed to get a response from the AI.');
    }

    const data = await apiResponse.json();

    // Extract the text reply from Gemini's response structure
    const reply = data.candidates[0].content.parts[0].text;
    
    // Send the reply back to your frontend
    res.json({ reply });

  } catch (error) {
    console.error("Error communicating with Google AI:", error);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Chatbot backend server (using Google Gemini) running at http://localhost:${port}`);
});

