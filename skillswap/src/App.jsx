// src/App.jsx

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import Dashboard from './Dashboard.jsx';
import Leaderboard from './Leaderboard.jsx';
import BrowseSkills from './BrowseSkills.jsx';
import registerSocketUser from "./registerSocketUser";
import Login from './Login.jsx';
import Chatbot from './components/Chatbot';
import Profile from './Profile.jsx';
import NotLogin from './NotLogin.jsx';
import Signup from './Signup.jsx';
import ForgotPassword from './ForgotPassword.jsx'; 
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";
import Messages from './Messages.jsx';

import './App.css';

const App = () => {
  const googleClientId = "835215832616-kes65fj0g53era838h42948tn5tntusb.apps.googleusercontent.com";

  // ⭐ REGISTER CURRENT USER FOR SOCKET.IO
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const email = decoded.user.email;

      // IMPORTANT: send email here
      registerSocketUser(email);

    } catch (err) {
      console.log("Token decode failed:", err);
    }
  }, []);

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
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>

        <Chatbot />
      </>
    </GoogleOAuthProvider>
  );
};

export default App;
