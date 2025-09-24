// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import your components
import Dashboard from './Dashboard.jsx';
import Leaderboard from './Leaderboard.jsx';
import BrowseSkills from './BrowseSkills.jsx';
import Messages from './Messages.jsx';
import Login from './Login.jsx';
import Chatbot from './components/Chatbot';
import Profile from './Profile.jsx';
import NotLogin from './NotLogin.jsx';
import Signup from './Signup.jsx';
import './App.css';
import ForgotPassword from './ForgotPassword.jsx'; 

const App = () => {
  const googleClientId = "835215832616-kes65fj0g53era838h42948tn5tntusb.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <>
        <Routes>
          <Route path="/" element={<NotLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/browse" element={<BrowseSkills />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
        <Chatbot />
      </>
    </GoogleOAuthProvider>
  );
};

export default App;
