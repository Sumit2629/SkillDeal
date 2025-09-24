import React, { useState } from 'react';
import axios from 'axios';

const SessionModal = ({ isOpen, onClose, onSessionCreated }) => {
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [error, setError] = useState('');

  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const body = { 
        title: sessionTitle, 
        date: sessionDate, 
        time: sessionTime 
      };

      const res = await axios.post('http://localhost:5000/api/session', body, config);
      
      onSessionCreated(res.data); // Pass the new session data back to the parent
      onClose(); // Close the modal on success
      
      // Clear form
      setSessionTitle('');
      setSessionDate('');
      setSessionTime('');

    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create session. Please try again.');
      console.error(err);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>&times;</button>
        <h2 style={styles.title}>Create a New Session</h2>
        <p style={styles.subtitle}>Schedule a new session for others to see on your profile.</p>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSessionSubmit}>
          <div style={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Session Title (e.g., React Hooks Mastery)" 
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.dateTimeContainer}>
            <input 
              type="date" 
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              required
              style={styles.input}
            />
            <input 
              type="time"
              value={sessionTime}
              onChange={(e) => setSessionTime(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Save Session
          </button>
        </form>
      </div>
    </div>
  );
};

// --- STYLES ---

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
    fontFamily: "'Inter', sans-serif",
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#aaa',
  },
  title: {
    margin: '0 0 0.5rem 0',
    color: '#2d3748',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 1.5rem 0',
    color: '#718096',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  dateTimeContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  },
  errorText: {
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: '1rem',
    background: '#fed7d7',
    padding: '0.5rem',
    borderRadius: '8px'
  }
};

export default SessionModal;

