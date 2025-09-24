import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // New state to track password validation criteria for UI feedback
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const navigate = useNavigate();

  // Effect to validate password criteria in real-time
  useEffect(() => {
    setPasswordCriteria({
      minLength: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    });
  }, [password]);

  const validateForm = () => {
    // Email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    // Password validation checks
    if (!passwordCriteria.minLength) return "Password must be at least 6 characters long.";
    if (!passwordCriteria.uppercase) return "Password must contain at least one uppercase letter.";
    if (!passwordCriteria.lowercase) return "Password must contain at least one lowercase letter.";
    if (!passwordCriteria.number) return "Password must contain at least one number.";
    
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Perform validation before submitting
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      setSuccess(response.data.msg);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during registration.');
    }
  };

  // Helper component for displaying password criteria
  const PasswordCriteria = () => (
    <div style={styles.criteriaContainer}>
      <p style={styles.criteriaItem(passwordCriteria.minLength)}>✓ At least 6 characters</p>
      <p style={styles.criteriaItem(passwordCriteria.uppercase)}>✓ One uppercase letter (A-Z)</p>
      <p style={styles.criteriaItem(passwordCriteria.lowercase)}>✓ One lowercase letter (a-z)</p>
      <p style={styles.criteriaItem(passwordCriteria.number)}>✓ One number (0-9)</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.backgroundShapes}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ ...styles.shape, left: `${10 + i * 10}%`, animation: `float 20s infinite linear ${i * 2}s`, width: `${15 + Math.random() * 10}px`, height: `${15 + Math.random() * 10}px` }}></div>
        ))}
      </div>

      <div style={styles.signupCard}>
        <div style={styles.header}>
          <div style={styles.logo}>✦</div>
          <h1 style={styles.title}>Create Your Account</h1>
          <p style={styles.subtitle}>Join SkillSwap to start learning and teaching</p>
        </div>

        {error && <p style={styles.errorMessage}>{error}</p>}
        {success && <p style={styles.successMessage}>{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉️</span>
              <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} placeholder="you@example.com" />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} placeholder="Create a strong password" />
            </div>
          </div>
          
          <PasswordCriteria />

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input type="password" id="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} placeholder="Confirm your password" />
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" style={styles.signinLink}>Sign In</Link>
        </p>
      </div>
      <style>{`
        /* Keyframes remain the same */
        @keyframes float { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100vh) scale(1); opacity: 0; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); } 70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); } }
      `}</style>
    </div>
  );
};

// --- STYLES ---
const styles = {
  page: { margin: 0, padding: '1rem', fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' },
  backgroundShapes: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 },
  shape: { position: 'absolute', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' },
  signupCard: { background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.2)', position: 'relative', zIndex: 1, animation: 'slideUp 0.8s ease-out forwards' },
  header: { textAlign: 'center', marginBottom: '1.5rem' },
  logo: { width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '16px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold', animation: 'pulse 2.5s infinite' },
  title: { color: '#2d3748', fontSize: '28px', fontWeight: '700', margin: '0 0 0.5rem 0' },
  subtitle: { color: '#718096', fontSize: '16px', margin: 0 },
  errorMessage: { color: '#e53e3e', textAlign: 'center', marginBottom: '1rem', background: '#fed7d7', padding: '0.75rem', borderRadius: '8px', fontSize: '14px' },
  successMessage: { color: '#38a169', textAlign: 'center', marginBottom: '1rem', background: '#c6f6d5', padding: '0.75rem', borderRadius: '8px', fontSize: '14px' },
  inputGroup: { marginBottom: '1rem' },
  label: { display: 'block', color: '#4a5568', fontWeight: '600', marginBottom: '0.5rem', fontSize: '14px' },
  inputWrapper: { position: 'relative' },
  inputIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', fontSize: '18px', pointerEvents: 'none' },
  input: { width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '16px', transition: 'all 0.3s ease', background: '#f8fafc', boxSizing: 'border-box', outline: 'none' },
  criteriaContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.25rem 1rem',
    fontSize: '12px',
    marginBottom: '1rem',
    paddingLeft: '0.5rem'
  },
  criteriaItem: (isValid) => ({
    color: isValid ? '#38a169' : '#a0aec0',
    transition: 'color 0.3s ease',
  }),
  submitButton: { width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', marginTop: '0.5rem' },
  signinLink: { color: '#667eea', textDecoration: 'none', fontWeight: '600', transition: 'color 0.3s ease' },
};

export default Signup;

