const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   POST api/session
// @desc    Create or update a user session
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, date, time } = req.body;

  // Basic validation
  if (!title || !date || !time) {
    return res.status(400).json({ msg: 'Please provide title, date, and time for the session.' });
  }

  const sessionData = {
    title,
    date,
    time,
  };

  try {
    // Find the user by ID from the token and update their session
    const user = await User.findById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    user.session = sessionData;
    await user.save();

    res.json(user.session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/session
// @desc    Delete a user's session
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Clear the session field
        user.session = undefined;
        await user.save();

        res.json({ msg: 'Session successfully deleted.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

