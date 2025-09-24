import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Skills = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const applyFilters = () => {
    alert("✅ Filters applied!");
    setShowFilterDropdown(false);
  };

  const browseSkills = () => {
    alert("📘 You clicked on 'Browse Skills' — loading skill library...");
  };

  const findPeople = () => {
    alert("🧑‍🤝‍🧑 You clicked on 'Find People' — fetching peer list...");
  };

  const search = () => {
    alert("🔍 Searching...");
  };

  const skillsData = [
    { id: 1, category: 'Programming', title: 'Solidity', level: 'Advanced', mentor: 'Alex Thompson', rating: '4.7', students: '67', color: '#3d5afe', levelColor: '#ffe0b2', textColor: '#ff6f00' },
    { id: 2, category: 'Programming', title: 'Solidity', level: 'Advanced', mentor: 'Alex Thompson', rating: '4.7', students: '67', color: '#3d5afe', levelColor: '#ffe0b2', textColor: '#ff6f00' },
    { id: 3, category: 'Data Science', title: 'Machine Learning', level: 'Expert', mentor: 'Marcus Johnson', rating: '4.9', students: '203', color: '#f44336', levelColor: '#fde2e4', textColor: '#c2185b' },
    { id: 4, category: 'Programming', title: 'Python', level: 'Expert', mentor: 'Marcus Johnson', rating: '4.8', students: '156', color: '#3d5afe', levelColor: '#fde2e4', textColor: '#c2185b' },
    { id: 5, category: 'Design', title: 'UI/UX Design', level: 'Expert', mentor: 'Elena Rodriguez', rating: '4.9', students: '178', color: '#9c27b0', levelColor: '#fde2e4', textColor: '#c2185b' },
    { id: 6, category: 'Design Tools', title: 'Figma', level: 'Advanced', mentor: 'Elena Rodriguez', rating: '4.7', students: '92', color: '#e91e63', levelColor: '#ffe0b2', textColor: '#ff6f00' },
    { id: 7, category: 'Frontend', title: 'React', level: 'Expert', mentor: 'Sarah Chen', rating: '4.9', students: '127', color: '#3d5afe', levelColor: '#fde2e4', textColor: '#c2185b' },
    { id: 8, category: 'Backend', title: 'Node.js', level: 'Advanced', mentor: 'Sarah Chen', rating: '4.8', students: '89', color: '#4caf50', levelColor: '#ffe0b2', textColor: '#ff6f00' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9f9ff', margin: 0, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        margin: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <Link to="/dashboard" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          ← Back to Dashboard
        </Link>
        <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>Browse Skills</h1>
        <div style={{ width: '100px' }}></div>
      </header>
      
      <div style={{ textAlign: 'center', lineHeight: '0.9' }}>
        <h1 style={{ fontSize: '50px' }}>Discover & Connect</h1>
        <p style={{ fontSize: '25px' }}>Find the perfect skills and mentors for your learning platform</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px', textAlign: 'center', alignItems: 'center', padding: '40px', borderRadius: '20px', background: '#fff', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)' }}>
          <button onClick={browseSkills} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 28px', background: '#f3edff', color: '#8b3dff', fontWeight: '700', border: 'none', borderRadius: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '20px', width: '100%' }}>
            📖 Browse Skills
          </button>
          <button onClick={findPeople} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 28px', background: '#f5f5f5', color: '#555', fontWeight: '600', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '20px', width: '100%' }}>
            👥 Find People
          </button>
        </div>
      </div>
      <div style={{ maxWidth: '1100px', margin: '60px auto 40px', display: 'flex', gap: '14px', alignItems: 'center', padding: '0 20px', position: 'relative' }}>
        <input type="text" placeholder="Search for skills, mentors, or categories..." style={{ flex: 1, padding: '16px 20px', fontSize: '16px', borderRadius: '14px', border: '1px solid #ccc', boxShadow: '0 3px 12px rgba(0,0,0,0.05)', outline: 'none' }} />
        <button onClick={search} style={{ padding: '16px 24px', fontSize: '16px', fontWeight: 'bold', background: 'linear-gradient(to right, #6a00f4, #1e88e5)', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer' }}>
          🔍 Search
        </button>
        <button onClick={toggleFilterDropdown} style={{ padding: '16px 24px', fontSize: '16px', fontWeight: '600', background: '#f5f5f5', color: '#333', border: 'none', borderRadius: '14px', cursor: 'pointer', boxShadow: '0 3px 8px rgba(0,0,0,0.05)' }}>
          ⚙️ Filter
        </button>
        {showFilterDropdown && (
          <div style={{ display: 'block', position: 'absolute', top: '70px', right: '20px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', padding: '20px', zIndex: '10', width: '300px' }}>
            <h4 style={{ marginTop: '0', fontSize: '18px', marginBottom: '12px', color: '#333' }}>Filter Options</h4>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} /> Expert Level
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} /> Advanced Level
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} /> Design Tools
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} /> Backend
            </label>
            <button onClick={applyFilters} style={{ marginTop: '14px', padding: '10px 16px', background: 'linear-gradient(to right, #6a00f4, #1e88e5)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
              ✅ Apply Filters
            </button>
          </div>
        )}
      </div>
      <div style={{ maxWidth: '1300px', margin: '50px auto', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {skillsData.map((skill) => (
          <div key={skill.id} style={{ width: '260px', background: 'white', borderRadius: '16px', boxShadow: '0 6px 16px rgba(0,0,0,0.05)', padding: '20px' }}>
            <p style={{ fontSize: '14px', color: '#555' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: skill.color, borderRadius: '50%', marginRight: '6px' }}></span>
              {skill.category}
            </p>
            <h3 style={{ fontSize: '20px' }}>{skill.title}</h3>
            <span style={{ fontSize: '13px', background: skill.levelColor, color: skill.textColor, padding: '4px 10px', borderRadius: '10px' }}>
              {skill.level === 'Expert' ? '🚀 Expert' : '⚡ Advanced'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
              <img src="https://via.placeholder.com/36" alt={skill.mentor} style={{ borderRadius: '50%' }} />
              <div>
                <p style={{ margin: '0', fontWeight: '600' }}>{skill.mentor}</p>
                <p style={{ margin: '0', fontSize: '13px' }}>⭐ {skill.rating}</p>
              </div>
            </div>
            <p style={{ margin: '12px 0' }}>👥 {skill.students} students</p>
            <a href="#" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(to right, #8e2de2, #4a00e0)', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none' }}>
              Connect & Learn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
