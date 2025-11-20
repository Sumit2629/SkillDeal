// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require("nodemailer");
const otpStore = {}; 
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
    res.status(500).send('Server Error'); 
  }
});

// === SIGNIN (LOGIN) ROUTE ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    
    const payload = {
      user: {
        id: user.id,
        email: user.email 
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); 
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// === SEND OTP TO EMAIL (FORGOT PASSWORD) ===
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'Email is required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP temporarily
    otpStore[email] = {
      code: otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // Configure email sender
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password!
      },
    });

    // Send OTP to user email
    await transporter.sendMail({
      from: "SkillSwap <no-reply@skillswap.com>",
      to: email,
      subject: "Your SkillSwap OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ msg: "OTP sent to your email." });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// === VERIFY OTP ===
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ msg: "No OTP found for this email." });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ msg: "OTP expired." });
  }

  if (otp !== record.code) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  res.json({ msg: "OTP verified successfully!" });
});


// === RESET PASSWORD AFTER OTP VERIFIED ===
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ msg: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;

