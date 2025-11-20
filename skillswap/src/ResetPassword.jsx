import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const email = new URLSearchParams(window.location.search).get("email");

  const handleReset = async () => {
    setMsg("");
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword: password }),
    });

    const data = await res.json();

    if (data.msg === "Password updated successfully!") {
      setMsg("Password successfully updated! Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setError(data.msg);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>For: <b>{email}</b></p>

        {error && <p style={styles.error}>{error}</p>}
        {msg && <p style={styles.success}>{msg}</p>}

        <input
          style={styles.input}
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button style={styles.btn} onClick={handleReset}>
          Update Password
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg,#667eea,#764ba2)",
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
};

export default ResetPassword;
