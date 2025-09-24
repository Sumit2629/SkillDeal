// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// === SIGNUP (CREATE ACCOUNT) ROUTE ===
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists.' });
    }

    // 2. Create a new user instance
    user = new User({ email, password });

    // 3. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save the user to the database
    await user.save();

    res.status(201).json({ msg: 'User registered successfully! You can now log in.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Generic server error
  }
});

// === SIGNIN (LOGIN) ROUTE ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password.' });
  }

  try {
    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // 2. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // --- THIS IS THE KEY CHANGE ---
    // 3. If credentials are correct, create a JWT token with the user's email
    const payload = {
      user: {
        id: user.id,
        email: user.email // <-- ADDED THIS LINE
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

