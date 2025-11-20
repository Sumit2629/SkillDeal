const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select('-password');
    if (!userProfile) return res.status(404).json({ msg: 'User not found' });
    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/', auth, async (req, res) => {
  const {
    firstName,
    lastName,
    bio,
    location,
    skills,
    experience,
    education,
    interests,
    socialLinks,
    avatar
  } = req.body;

  const profileFields = {};
  if (firstName !== undefined) profileFields.firstName = firstName;
  if (lastName !== undefined) profileFields.lastName = lastName;
  if (bio !== undefined) profileFields.bio = bio;
  if (location !== undefined) profileFields.location = location;
  if (skills !== undefined) profileFields.skills = skills;
  if (experience !== undefined) profileFields.experience = experience;
  if (education !== undefined) profileFields.education = education;
  if (interests !== undefined) profileFields.interests = interests;
  if (socialLinks !== undefined) profileFields.socialLinks = socialLinks;
  if (avatar !== undefined) profileFields.avatar = avatar;

  try {
    let userProfile = await User.findById(req.user.id);
    if (!userProfile) return res.status(404).json({ msg: 'User not found' });

    userProfile = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 🆕 NEW ROUTE — returns all users for chat
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
