// server/routes/chat.js
const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// POST /api/chat/history
// { user1, user2 }  -> returns message history for their room
router.post('/history', async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    if (!user1 || !user2) return res.status(400).json({ msg: 'user1 and user2 required' });

    // compute same logic as client: room id formula must match
    const sorted = [user1.toLowerCase(), user2.toLowerCase()].sort();
    const roomId = `room_${sorted[0]}_${sorted[1]}`;

    const messages = await ChatMessage.find({ roomId }).sort({ timestamp: 1 }).lean();
    return res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
