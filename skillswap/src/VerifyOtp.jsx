import React, { useState } from "react";
import { Link } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const email = new URLSearchParams(window.location.search).get("email");

  const handleVerify = async () => {
    setError("");
    setSuccess("");

    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.msg === "OTP verified successfully!") {
      setSuccess("OTP Verified!");

      setTimeout(() => {
        window.location.href = `/reset-password?email=${email}`;
      }, 1000);

    } else {
      setError(data.msg);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verify OTP</h2>
        <p style={styles.subtitle}>Enter the 6-digit code sent to <b>{email}</b></p>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          style={styles.input}
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button style={styles.btn} onClick={handleVerify}>
          Verify OTP
        </button>

        <p style={styles.backText}>
          Go back? <Link to="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "white",
    padding: "2rem",
    width: "380px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  },
  title: { fontSize: "26px", fontWeight: 700, marginBottom: "10px" },
  subtitle: { color: "#555", marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  error: { color: "red", marginBottom: "1rem" },
  success: { color: "green", marginBottom: "1rem" },
  backText: { marginTop: "1rem", fontSize: "14px" },
};

export default VerifyOtp;
