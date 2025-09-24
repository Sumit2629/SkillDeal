import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const leaderData = [
    { id: 1, name: 'Alex Thompson', level: 'Level 22', coins: '5,200', xp: '6,890', sessions: '167', badges: '🎯 🎓 🔥' },
    { id: 2, name: 'Marcus Johnson', level: 'Level 18', coins: '4,200', xp: '5,680', sessions: '234', badges: '🎯 🎓 🔥' },
    { id: 3, name: 'Elena Rodriguez', level: 'Level 15', coins: '3,650', xp: '4,230', sessions: '189', badges: '🎯 🎓 🔥' },
    { id: 4, name: 'Sarah Chen', level: 'Level 12', coins: '2,850', xp: '3,420', sessions: '156', badges: '🎯 🎓 🔥' },
    { id: 5, name: 'David Kim', level: 'Level 9', coins: '2,100', xp: '2,890', sessions: '123', badges: '🎯 🎓 🔥' },
    { id: 6, name: 'Marcus Johnson', level: 'Level 18', coins: '4,200', xp: '5,680', sessions: '234', badges: '🎯 🎓 🔥' },
  ];

  const filteredData = leaderData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9f9ff', margin: 0, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        // background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        margin: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Link to="/dashboard" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          ← Back to Dashboard
        </Link>
        <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>Leaderboard</h1>
        <div style={{ width: '100px' }}></div>
      </header>
      
      <div style={{ textAlign: 'center', lineHeight: '0.5' }}>
        <h1 style={{ fontSize: '50px', color: 'rgb(255, 128, 54)' }}>Leaderboard</h1>
        <p style={{ fontSize: '25px' }}>See how you rank among the skillSwap community</p>
      </div>
      <div style={{ maxWidth: '1200px', margin: '50px auto', display: 'flex', gap: '60px', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <label htmlFor="timeframe" style={{ fontSize: '17px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Timeframe</label>
          <select id="timeframe" style={{ padding: '14px 20px', fontSize: '16px', borderRadius: '14px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', width: '100%', boxShadow: '0 3px 10px rgba(0,0,0,0.04)' }}>
            <option>This Week</option>
            <option>This Month</option>
            <option>All Time</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <label htmlFor="category" style={{ fontSize: '17px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Category</label>
          <select id="category" style={{ padding: '14px 20px', fontSize: '16px', borderRadius: '14px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', width: '100%', boxShadow: '0 3px 10px rgba(0,0,0,0.04)' }}>
            <option>Coins Earned</option>
            <option>XP Gained</option>
            <option>Sessions Attended</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '40px', margin: '60px auto', maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ height: '140px', background: 'linear-gradient(to top, #757f9a, #d7dde8)', borderRadius: '20px 20px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '22px', fontWeight: 'bold' }}>#2</div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 6px 16px rgba(0,0,0,0.08)', marginTop: '-10px' }}>
            <img src="./images/woman.png" alt="Marcus Johnson" style={{ borderRadius: '50%', marginBottom: '12px', width: '40px' }} />
            <p style={{ fontWeight: '600', fontSize: '18px', margin: '0' }}>Marcus Johnson</p>
            <p style={{ color: '#555', fontSize: '16px', margin: '6px 0' }}>🪙 4,200</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ height: '180px', background: 'linear-gradient(to top, #f7971e, #ffd200)', borderRadius: '20px 20px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '22px', fontWeight: 'bold' }}>#1</div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 6px 16px rgba(0,0,0,0.08)', marginTop: '-10px' }}>
            <img src="./images/woman.png" alt="Alex Thompson" style={{ borderRadius: '50%', marginBottom: '12px', width: '50px' }} />
            <p style={{ fontWeight: '600', fontSize: '18px', margin: '0' }}>Alex Thompson</p>
            <p style={{ color: '#555', fontSize: '16px', margin: '6px 0' }}>🪙 5,200</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ height: '120px', background: 'linear-gradient(to top, #f12711, #f5af19)', borderRadius: '20px 20px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '22px', fontWeight: 'bold' }}>#3</div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 6px 16px rgba(0,0,0,0.08)', marginTop: '-10px' }}>
            <img src="./images/woman.png" alt="Elena Rodriguez" style={{ borderRadius: '50%', marginBottom: '12px', width: '35px' }} />
            <p style={{ fontWeight: '600', fontSize: '18px', margin: '0' }}>Elena Rodriguez</p>
            <p style={{ color: '#555', fontSize: '16px', margin: '6px 0' }}>🪙 3,650</p>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <input id="searchInput" type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '12px 18px', fontSize: '16px', borderRadius: '10px', border: '1px solid #ccc', flex: 1, minWidth: '200px' }} />
          <select style={{ padding: '12px 14px', borderRadius: '10px', fontSize: '15px', border: '1px solid #ccc' }}>
            <option value="">Filter by Level</option>
            <option>Level 20+</option>
            <option>Level 10–19</option>
            <option>Level 1–9</option>
          </select>
          <select style={{ padding: '12px 14px', borderRadius: '10px', fontSize: '15px', border: '1px solid #ccc' }}>
            <option value="">Sort by</option>
            <option>Coins (High to Low)</option>
            <option>XP (High to Low)</option>
            <option>Sessions (High to Low)</option>
          </select>
        </div>
        <div style={{ maxHeight: '450px', overflowY: 'auto', borderRadius: '16px', border: '1px solid #eee' }}>
          {filteredData.map((item) => (
            <div key={item.id} className="leader-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src="./images/woman.png" alt={item.name} style={{ borderRadius: '50%', width: '40px' }} />
                <div>
                  <p className="user-name" style={{ margin: '0', fontWeight: '600' }}>{item.name}</p>
                  <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>{item.level}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '15px' }}>
                <span>🪙 {item.coins}</span>
                <span>⚡ {item.xp}</span>
                <span>⭐ {item.sessions}</span>
                <span>{item.badges}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '30px', background: 'linear-gradient(to right, #6a00f4, #1e88e5)', color: 'white', padding: '20px 30px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '18px' }}>
            🏆 <strong>#12</strong> &nbsp; | 🪙 <strong>2,850 coins</strong> &nbsp; | 📈 <strong>+3 this week</strong>
          </div>
          <div style={{ fontSize: '16px' }}>Next rank in <strong>150 coins</strong></div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
