// src/components/ChatSidebar.jsx
import React, { useState, useEffect } from "react";
import UserList from "./UserList"; // your existing component
import Chat from "../Chat"; // path relative to components folder
import VideoCall from "../VideoCall";
import createRoomId from "../utils/createRoomId";

const ChatSidebar = ({ isOpen, onClose, currentUserEmail, onSelectUserFromSidebar }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("chat"); // "chat" | "video" | "voice"
  const roomId = selectedUser ? createRoomId(currentUserEmail, selectedUser.email) : "";

  useEffect(() => {
    // inform parent if needed
    onSelectUserFromSidebar?.(selectedUser, roomId);
  }, [selectedUser, roomId]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Messages</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.container}>
          <div style={styles.leftCol}>
            <UserList currentEmail={currentUserEmail} onSelectUser={(u) => setSelectedUser(u)} />
          </div>

          <div style={styles.rightCol}>
            <div style={styles.topBar}>
              <div style={styles.selectedLabel}>
                {selectedUser ? selectedUser.email : "Select a user to chat"}
              </div>

              <div style={styles.modeBtns}>
                <button
                  onClick={() => setMode("chat")}
                  style={{ ...styles.modeBtn, ...(mode === "chat" ? styles.modeActive : {}) }}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => setMode("video")}
                  style={{ ...styles.modeBtn, ...(mode === "video" ? styles.modeActive : {}) }}
                  disabled={!selectedUser}
                >
                  🎥 Video
                </button>
                <button
                  onClick={() => setMode("voice")}
                  style={{ ...styles.modeBtn, ...(mode === "voice" ? styles.modeActive : {}) }}
                  disabled={!selectedUser}
                >
                  🎧 Voice
                </button>
              </div>
            </div>

            <div style={styles.contentArea}>
              {!selectedUser && (
                <div style={styles.emptyMsg}>Pick a user on left to start a private chat or call.</div>
              )}

              {selectedUser && mode === "chat" && (
                <Chat currentUser={{ email: currentUserEmail }} selectedUser={selectedUser} />
              )}

              {selectedUser && mode === "video" && (
                <VideoCall room={roomId} />
              )}

              {selectedUser && mode === "voice" && (
                // reuse VideoCall component but set a prop to start audio-only
                <VideoCall room={roomId} audioOnly={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "stretch",
  },
  sidebar: {
    width: "1100px", // width of combined panel (left + right)
    maxWidth: "calc(100% - 80px)",
    marginLeft: 40,
    marginTop: 40,
    marginBottom: 40,
    background: "transparent",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: 18,
    cursor: "pointer",
  },
  container: {
    display: "flex",
    gap: 20,
    background: "#fff",
    padding: 18,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  leftCol: { width: 260 },
  rightCol: { flex: 1, minHeight: 420, display: "flex", flexDirection: "column" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  selectedLabel: { fontWeight: 700, color: "#1f2937" },
  modeBtns: { display: "flex", gap: 8 },
  modeBtn: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e6edf7",
    background: "white",
    cursor: "pointer",
    fontWeight: 600,
  },
  modeActive: {
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    border: "none",
  },
  contentArea: { flex: 1, minHeight: 360 },
  emptyMsg: { color: "#6b7280", padding: 20, textAlign: "center" },
};

export default ChatSidebar;
