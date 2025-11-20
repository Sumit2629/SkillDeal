import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // CALL BACKEND: Send OTP
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.msg === "OTP sent to your email.") {
        setSuccess("OTP sent! Check your inbox.");

        // Redirect to OTP verification page
        setTimeout(() => {
          window.location.href = `/verify-otp?email=${email}`;
        }, 1000);
      } else {
        setError(data.msg || "Something went wrong.");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundShapes}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            ...styles.shape,
            left: `${10 + i * 10}%`,
            animation: `float 20s infinite linear ${i * 2}s`,
            width: `${15 + Math.random() * 10}px`,
            height: `${15 + Math.random() * 10}px`,
          }}></div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🔑</div>
          <h1 style={styles.title}>Forgot Password?</h1>
          <p style={styles.subtitle}>Enter your email to receive an OTP</p>
        </div>

        {error && <p style={styles.errorMessage}>{error}</p>}
        {success && <p style={styles.successMessage}>{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            Send OTP
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', marginTop: '1.5rem' }}>
          Remembered your password? <Link to="/login" style={styles.link}>Back to Sign In</Link>
        </p>
      </div>
      <style>{`
        @keyframes float { 
          0% { transform: translateY(100vh) scale(0); opacity: 0; } 
          10% { opacity: 1; } 
          90% { opacity: 1; } 
          100% { transform: translateY(-100vh) scale(1); opacity: 0; } 
        }
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes pulse { 
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); } 
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); } 
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); } 
        }
      `}</style>
    </div>
  );
};

// --- STYLES (unchanged, your same visuals) ---

const styles = {
  page: { margin: 0, padding: '1rem', fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' },
  backgroundShapes: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 },
  shape: { position: 'absolute', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' },
  card: { background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.2)', position: 'relative', zIndex: 1, animation: 'slideUp 0.8s ease-out forwards' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  logo: { width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '16px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold', animation: 'pulse 2.5s infinite' },
  title: { color: '#2d3748', fontSize: '28px', fontWeight: '700', margin: '0 0 0.5rem 0' },
  subtitle: { color: '#718096', fontSize: '16px', margin: 0 },
  errorMessage: { color: '#e53e3e', textAlign: 'center', marginBottom: '1rem', background: '#fed7d7', padding: '0.75rem', borderRadius: '8px', fontSize: '14px' },
  successMessage: { color: '#38a169', textAlign: 'center', marginBottom: '1rem', background: '#c6f6d5', padding: '0.75rem', borderRadius: '8px', fontSize: '14px' },
  inputGroup: { marginBottom: '1.5rem' },
  label: { display: 'block', color: '#4a5568', fontWeight: '600', marginBottom: '0.5rem', fontSize: '14px' },
  inputWrapper: { position: 'relative' },
  inputIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', fontSize: '18px', pointerEvents: 'none' },
  input: { width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '16px', background: '#f8fafc', outline: 'none', boxSizing: "border-box" },
  submitButton: { width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  link: { color: '#667eea', textDecoration: 'none', fontWeight: '600' },
};

export default ForgotPassword;
