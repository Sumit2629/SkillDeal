import React from 'react';
import { Link } from 'react-router-dom'
import './App.css'; 

const NotLogin = () => {
  return (
  <>
    <div className="app">
      <div className="hero-section">
        <h1>Learn. Teach.<br />Earn. Rise.</h1>
        <p>
          Join the most engaging peer-to-peer learning platform where knowledge meets<br />
          gamification. <span style={{ color: 'purple' }}>Earn coins,</span> <span style={{ color: 'blue' }}>climb leaderboards,</span> and
          <span> grow together</span> through daily skill-sharing modules.
        </p>
        <div className="buttons">
          <Link to="/login"
             style={{textDecoration: 'none', padding: '25px', backgroundImage: 'linear-gradient(to right, #572e89, #3d36a4)', color: 'white', borderRadius: '13px', margin: '0 10px', display: 'inline-block', fontSize: '20px'}}>
            Start Learning Today ➡️
          </Link>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="watch-demo-button">
            Watch Demo
          </a>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">👩‍🎓</div>
          <p className="stat-number">12,500+</p>
          <p className="stat-label">Active Learners</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <p className="stat-number">850</p>
          <p className="stat-label">Skills Shared</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🕒</div>
          <p className="stat-number">340</p>
          <p className="stat-label">Daily Sessions</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <p className="stat-number">95,000</p>
          <p className="stat-label">Coins Exchanged</p>
        </div>
      </div>

      <div className="why-choose-section">
        <h1>Why choose <span style={{ color: '#3d36a4' }}>SkillSwap</span>?</h1>
        <p>
          Experience the future of peer-to-peer learning with gamification that makes
          skill<br />
          development addictive and rewarding.
        </p>
        <div className="choose-cards">
          <div className="choose-card">
            <div className="choose-card-icon">📆</div>
            <p className="choose-card-title">Daily Learning Modules</p>
            <p className="choose-card-description">Join structured sessions every day with your chosen passionate peer.</p>
          </div>
          <div className="choose-card">
            <div className="choose-card-icon">💰</div>
            <p className="choose-card-title">Earn & Spend Coins</p>
            <p className="choose-card-description">Get rewarded for teaching, learning, and participating. Use coins to unlock premium content.</p>
          </div>
          <div className="choose-card">
            <div className="choose-card-icon">🏆</div>
            <p className="choose-card-title">Climb the Leaderboards</p>
            <p className="choose-card-description">Compete with peers, showcase your expertise, and earn recognition in your skill domains.</p>
          </div>
          <div className="choose-card">
            <div className="choose-card-icon">🪙</div>
            <p className="choose-card-title">Vibrant Community</p>
            <p className="choose-card-description">Connect with like-minded learners, form study groups, and build lasting professional relationships.</p>
          </div>
        </div>
      </div>

      <div className="live-modules-section">
        <h1>Today's <span style={{ color: 'rgb(19, 172, 19)' }}>Live Modules</span></h1>
        <p>
          Join engaging daily sessions and start earning coins while learning from passionate<br />
          peers.
        </p>
        <div className="module-cards">
          <div className="module-card">
            <div className="module-badges">
              <div className="module-badge advanced">Advanced</div>
              <div className="module-badge coins">🪙 150 Coins</div>
            </div>
            <div className="module-details">
              <p className="module-title">React Hooks Mastery</p>
              <p className="module-author">with Sarah Chen</p>
            </div>
            <div className="module-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: '70%' }}></div>
              </div>
              <div className="progress-text">Progress: 70% • 14 June 2025 • 4:00 PM</div>
            </div>
            <button className="join-button">Join Session</button>
          </div>
          <div className="module-card">
            <div className="module-badges">
              <div className="module-badge intermediate">Intermediate</div>
              <div className="module-badge coins">🪙 120 Coins</div>
            </div>
            <div className="module-details">
              <p className="module-title">React Hooks Mastery</p>
              <p className="module-author">with Sarah Chen</p>
            </div>
            <div className="module-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: '70%' }}></div>
              </div>
              <div className="progress-text">Progress: 70% • 14 June 2025 • 4:00 PM</div>
            </div>
            <button className="join-button">Join Session</button>
          </div>
          <div className="module-card">
            <div className="module-badges">
              <div className="module-badge beginner">Beginner</div>
              <div className="module-badge coins">🪙 100 Coins</div>
            </div>
            <div className="module-details">
              <p className="module-title">React Hooks Mastery</p>
              <p className="module-author">with Sarah Chen</p>
            </div>
            <div className="module-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: '70%' }}></div>
              </div>
              <div className="progress-text">Progress: 70% • 14 June 2025 • 4:00 PM</div>
            </div>
            <button className="join-button">Join Session</button>
          </div>
        </div>
      </div>

      <div className="success-stories-section">
        <h1><span style={{ color: '#3d36a4' }}>Success </span><span style={{ color: '#ed8c25' }}>Stories</span></h1>
        <p>
          See how our community members are transforming their careers through peer learning <br />
          and gamified rewards
        </p>
        <div className="reviews">
          <div className="review-card">
            <div className="review-header">
              <img src="./images/woman.png" alt="Anjali Verma" className="review-avatar" />
              <div>
                <h3>Anjali Verma</h3>
                <p>🪙 180 Coins • 🏆 Rank #12</p>
              </div>
            </div>
            <p>"SkillSwap gave me the confidence to teach others while learning from them too. It’s more than a platform — it’s a real community."</p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <img src="./images/woman.png" alt="Rahul Mehta" className="review-avatar" />
              <div>
                <h3>Rahul Mehta</h3>
                <p>🪙 220 Coins • 🏆 Rank #4</p>
              </div>
            </div>
            <p>"The daily tasks are so intuitive and fun. I never knew learning could be gamified this well. Love it!"</p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <img src="./images/woman.png" alt="Priya Nanda" className="review-avatar" />
              <div>
                <h3>Priya Nanda</h3>
                <p>🪙 300 Coins • 🏆 Rank #1</p>
              </div>
            </div>
            <p>"I found my learning tribe here. The gamification, badges, and community vibe make this platform stand out!"</p>
          </div>
        </div>
        <div className="swipe-indicator">Swipe → to explore more success stories</div>
      </div>

      <div className="cta-section">
        <h1>Ready to Start Your<br /><span style={{ color: 'rgb(251, 251, 73)' }}>Learning Journey?</span></h1>
        <p>
          Join thousands of learners who are already earning coins, climbing leaderboards, and<br />
          mastering new skills every day.
        </p>
        <Link to="/signup" className="cta-button">Get Started Free</Link>
        <p>No Credit Card Required.</p>
      </div>
    </div>
  </>
  );
};

export default NotLogin;
