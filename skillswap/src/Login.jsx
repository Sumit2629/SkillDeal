import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- VALIDATION ADDED HERE ---
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return; // Stop the function if validation fails
    }
    // --- END OF VALIDATION ---

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  // Dummy handlers for social logins for now
  const handleGoogleLogin = () => alert('Google login clicked!');
  const handleFacebookLogin = () => alert('Facebook login clicked!');
  const handleAppleLogin = () => alert('Apple login clicked!');

  return (
    <div style={styles.page}>
      {/* Animated background shapes */}
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

      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.logo}>✦</div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your SkillSwap account to continue</p>
        </div>

        {error && <p style={styles.errorMessage}>{error}</p>}
        
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

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
          </div>

          <button type="submit" style={styles.submitButton}>
            Sign In
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>Or continue with</span>
        </div>

        <div style={styles.socialLogins}>
          <button onClick={handleGoogleLogin} style={{ ...styles.socialButton, ...styles.googleButton }}>
            <svg style={{ width: '20px', height: '20px', marginRight: '10px' }} viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.141,44,30.637,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
            Google
          </button>
          <button onClick={handleAppleLogin} style={{ ...styles.socialButton, ...styles.appleButton }}>
             <svg style={{ width: '20px', height: '20px', marginRight: '10px' }} viewBox="0 0 24 24"><path fill="currentColor" d="M19.3,4.71a6.1,6.1,0,0,0-4.82-2.11,5.86,5.86,0,0,0-5.32,3.42,3.58,3.58,0,0,1-2.4-1.35,1.16,1.16,0,0,0-1.54,0,1.18,1.18,0,0,0,0,1.63,3.7,3.7,0,0,1,2,2.1,5.88,5.88,0,0,0,1.74,8.5,4,4,0,0,1-2.52.85,1.2,1.2,0,0,0-.81,2.06,10.87,10.87,0,0,0,6.1,3.4,10.23,10.23,0,0,0,6.61-3.11,5.65,5.65,0,0,0,1.86-4.44,4.28,4.28,0,0,1-3.31-1.45,4.36,4.36,0,0,1,3.22-1.59,1.19,1.19,0,0,0,1.16-1.18,5.77,5.77,0,0,0-4.14-5.14Zm-1.42,1.35a4.43,4.43,0,0,1,2.4,4,1.19,1.19,0,0,0-.12,1.51,1.16,1.16,0,0,0,1.54.1,4.31,4.31,0,0,0-2.4-3.95,1.17,1.17,0,0,0-1.42-.17A1.21,1.21,0,0,0,17.88,6.06Z"/></svg>
            Apple
          </button>
        </div>

        <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px' }}>
          Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up</Link>
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

// --- STYLES ---

const styles = {
  page: {
    margin: 0,
    padding: '1rem',
    fontFamily: "'Inter', sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  },
  shape: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 1,
    animation: 'slideUp 0.8s ease-out forwards',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logo: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '16px',
    margin: '0 auto 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    animation: 'pulse 2.5s infinite',
  },
  title: {
    color: '#2d3748',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    color: '#718096',
    fontSize: '16px',
    margin: 0,
  },
  errorMessage: {
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: '1rem',
    background: '#fed7d7',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '14px'
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: '#4a5568',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontSize: '14px',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
    fontSize: '18px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    background: '#f8fafc',
    boxSizing: 'border-box',
    outline: 'none',
  },
  forgotLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  divider: {
    textAlign: 'center',
    margin: '2rem 0',
    position: 'relative',
    height: '1px',
    background: '#e2e8f0',
  },
  dividerText: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '0 1rem',
    color: '#718096',
    fontSize: '14px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  socialLogins: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  socialButton: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
  },
  signupLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.3s ease',
  },
};

export default Login;

