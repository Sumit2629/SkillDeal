const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  // --- PROFILE FIELDS ---
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  skills: { type: [String], default: [] },
  experience: { type: String, default: '' },
  education: { type: String, default: '' },
  interests: { type: [String], default: [] },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  avatar: { type: String, default: '🧑‍💻' },
  
  // --- NEW SESSION FIELD ---
  session: {
    title: { type: String },
    date: { type: String },
    time: { type: String },
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);

