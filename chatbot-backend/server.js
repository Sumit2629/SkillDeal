// Load the secret key from your .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Use axios for better error handling

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

   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

    
    const requestBody = {
        contents: [{
            parts: [{
                text: message
            }]
        }]
    };

    try {
        const apiResponse = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const reply = apiResponse.data.candidates[0].content.parts[0].text;
        
        res.json({ reply });

    } catch (error) {
        if (error.response) {
            console.error("Error from Google API:", error.response.data);
            res.status(500).json({ error: 'Failed to get a response from the AI.', details: error.response.data });
        } else {
            console.error("Error communicating with Google AI:", error.message);
            res.status(500).json({ error: 'Failed to get a response from the AI.' });
        }
    }
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Chatbot backend server (using Google Gemini) running at http://localhost:${port}`);
});

