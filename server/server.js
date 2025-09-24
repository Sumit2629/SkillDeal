const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to MongoDB! ✅');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process with failure
});

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import and use auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Import and use profile routes
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

// --- ADD THIS LINE TO USE YOUR NEW SESSION ROUTES ---
const sessionRoutes = require('./routes/session');
app.use('/api/session', sessionRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 🚀`);
});

