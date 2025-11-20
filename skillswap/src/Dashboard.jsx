import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';
import ChatSidebar from "./components/ChatSidebar";
import SessionModal from './components/SessionModal';
import Chat from "./Chat";
import VideoCall from "./VideoCall";
import UserList from "./components/UserList";
import createRoomId from "./utils/createRoomId";

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);



  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      const email = decoded.user.email;
      setUserEmail(email);

      const formattedName = email.split("@")[0];
      setUserName(formattedName.charAt(0).toUpperCase() + formattedName.slice(1));
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);


  const handleSessionCreated = (newSession) => {
    alert(`Session "${newSession.title}" created successfully! It will now appear on your profile.`);
  };

  return (
    <>
      <div className="dashboard">
        <header className="dashboard-header">
          <nav className="dashboard-nav">
            <Link to="/browse" className="nav-link">🔍 Skills</Link>
            <Link to="/leaderboard" className="nav-link">🏆 Leaderboard</Link>
            <Link to="/profile" className="nav-link">🪪 Profile</Link>
            <Link to="/messages" className="nav-link">💬 Messages</Link>
          </nav>
        </header>

        <hr className="divider" />

        <div className="welcome-section">
          <h1>Welcome back, {userName}! 👋</h1>
          <p>Ready to learn something new today?</p>
        </div>

        <div className="action-cards-container">
          <Link to="/browse" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="action-card">
              <div className="action-card-icon">🪙</div>
              <p className="action-card-title">Find Skills to Learn</p>
              <p className="action-card-description">Discover new skills from expert peers</p>
            </div>
          </Link>

          <Link to="/browse" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="action-card">
              <div className="action-card-icon">⚡️</div>
              <p className="action-card-title">Share Your Skills</p>
              <p className="action-card-description">Teach others and earn coins</p>
            </div>
          </Link>

          <Link to="/leaderboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="action-card">
              <div className="action-card-icon">🏆</div>
              <p className="action-card-title">View Leaderboards</p>
              <p className="action-card-description">See your ranking and compete</p>
            </div>
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="action-card">
              <div className="action-card-icon">🪪</div>
              <p className="action-card-title">Manage Profile</p>
              <p className="action-card-description">Update your details and preferences</p>
            </div>
          </Link>
          
          <div onClick={() => setIsModalOpen(true)} className="action-card" style={{cursor: 'pointer'}}>
              <div className="action-card-icon">🗓️</div>
              <p className="action-card-title">Create Session</p>
              <p className="action-card-description">Fix a Date and help Peers to Learn.</p>
          </div>
        </div>

        <div className="achievements-section">
          <div className="achievements-header">
            <h2>Your Achievements</h2>
            <a href="#" className="view-all-link">View All</a>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-header">
                <div className="achievement-icon">🎯</div>
                <span className="achievement-title">First Session Complete</span>
                <span className="achievement-progress">100%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-header">
                <div className="achievement-icon">💰</div>
                <span className="achievement-title">Coin Collector (850/1000)</span>
                <span className="achievement-progress">85%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-header">
                <div className="achievement-icon">🎓</div>
                <span className="achievement-title">Teaching Master (3/10)</span>
                <span className="achievement-progress">30%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-header">
                <div className="achievement-icon">🦋</div>
                <span className="achievement-title">Social Butterfly (23/50)</span>
                <span className="achievement-progress">46%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '46%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '20px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '50px' }}>Today's <span style={{ color: 'rgb(19, 172, 19)' }}>Live
            Modules</span></h1>
          <p style={{ textAlign: 'center', fontSize: '25px' }}>Join engaging daily sessions and start earning coins while
            learning from passionate<br />peers.</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '40px 0', flexWrap: 'wrap' }}>

            <div style={{ borderRadius: '15px', padding: '30px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)', width: '280px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            >

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div
                  style={{ fontSize: '13px', backgroundColor: 'rgb(249, 164, 181)', color: 'red', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  Advanced
                </div>
                <div
                  style={{ fontSize: '13px', backgroundColor: 'gold', color: '#333', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  🪙 150 Coins
                </div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: '15px 0 8px', fontSize: '22px', fontWeight: 'bold', color: '#222' }}>React Hooks Mastery
                </p>
                <p style={{ margin: '0 0 20px', fontSize: '16px', color: '#555' }}>with Sarah Chen</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{ backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', height: '10px', width: '100%' }}>
                  <div style={{ height: '100%', width: '70%', backgroundColor: '#4caf50' }}></div>
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#777' }}>
                  Progress: 70% • 14 June 2025 • 4:00 PM
                </div>
              </div>

              <button
                style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
                Join Session
              </button>
            </div>


            <div style={{ borderRadius: '15px', padding: '30px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)', width: '280px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div
                  style={{ fontSize: '13px', backgroundColor: 'rgb(241, 238, 87)', color: 'rgb(142, 139, 4)', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  Intermediate
                </div>
                <div
                  style={{ fontSize: '13px', backgroundColor: 'gold', color: '#333', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  🪙 120 Coins
                </div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: '15px 0 8px', fontSize: '22px', fontWeight: 'bold', color: '#222' }}>React Hooks Mastery
                </p>
                <p style={{ margin: '0 0 20px', fontSize: '16px', color: '#555' }}>with Sarah Chen</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{ backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', height: '10px', width: '100%' }}>
                  <div style={{ height: '100%', width: '70%', backgroundColor: '#4caf50' }}></div>
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#777' }}>
                  Progress: 70% • 14 June 2025 • 4:00 PM
                </div>
              </div>

              <button
                style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
                Join Session
              </button>
            </div>

            <div style={{ borderRadius: '15px', padding: '30px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)', width: '280px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div
                  style={{ fontSize: '13px', backgroundColor: 'rgb(170, 255, 170)', color: 'green', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  Beginner
                </div>
                <div
                  style={{ fontSize: '13px', backgroundColor: 'gold', color: '#333', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  🪙 100 Coins
                </div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: '15px 0 8px', fontSize: '22px', fontWeight: 'bold', color: '#222' }}>React Hooks Mastery
                </p>
                <p style={{ margin: '0 0 20px', fontSize: '16px', color: '#555' }}>with Sarah Chen</p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{ backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', height: '10px', width: '100%' }}>
                  <div style={{ height: '100%', width: '70%', backgroundColor: '#4caf50' }}></div>
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#777' }}>
                  Progress: 70% • 14 June 2025 • 4:00 PM
                </div>
              </div>

              <button
                style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', transition: 'background-color 0.3s ease' }}>
                Join Session
              </button>
            </div>
          </div>
        </div>

        <div className="daily-challenge-section">
          <h1>🎯 Daily Challenge</h1>
          <p>Complete 2 learning sessions today</p>
          <div className="daily-challenge-actions">
            <div className="daily-challenge-badge">1/2</div>
            <a href="#" className="daily-challenge-button">+100 coins</a>
          </div>
        </div>

      </div>
        <SessionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSessionCreated={handleSessionCreated}
      />

      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentUserEmail={userEmail}
      />
    </>
  );
};

export default Dashboard;

