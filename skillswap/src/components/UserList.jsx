// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import socket from "../socket";

const UserList = ({ currentEmail, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  // -----------------------------------------
  // GET ONLINE USERS ONCE WHEN MOUNTED
  // -----------------------------------------
  useEffect(() => {
    // ask server for the latest list
    socket.emit("get-online-users");

    // listen for updates
    socket.on("online-users", (list) => {
      setOnlineUsers(list);
    });

    return () => {
      socket.off("online-users");
    };
  }, []);

  // -----------------------------------------
  // LOAD USERS FROM BACKEND
  // -----------------------------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/profile/all-users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.filter((u) => u.email !== currentEmail));
      })
      .catch((err) => console.error("User load failed", err));
  }, [currentEmail]);

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>People</h3>

      <div style={styles.list}>
        {users.map((u) => {
          const isOnline = onlineUsers[u.email];

          return (
            <div
              key={u.email}
              style={styles.userItem}
              onClick={() => onSelectUser(u)}
            >
              <div style={styles.avatarBox}>
                <div style={styles.avatar}>
                  {(u.username || u.email).charAt(0).toUpperCase()}
                </div>

                <span
                  style={{
                    ...styles.statusDot,
                    background: isOnline ? "#22c55e" : "#9ca3af",
                  }}
                ></span>
              </div>

              <div>
                <div style={styles.name}>
                  {u.username || u.email.split("@")[0]}
                </div>
                <div style={styles.sub}>
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          );
        })}

        {users.length === 0 && (
          <div style={{ padding: 20, color: "#666" }}>No users found</div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: 260,
    padding: "15px",
    background: "#fff",
    borderRight: "1px solid #eee",
    height: "100%",
    overflowY: "auto",
  },

  header: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 15,
    color: "#6a00f4",
    textAlign: "center",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  userItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px",
    borderRadius: "10px",
    background: "#fafafa",
    cursor: "pointer",
    transition: "0.2s",
  },

  avatarBox: { position: "relative" },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    background: "#6a00f4",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    fontSize: 20,
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    position: "absolute",
    bottom: 0,
    right: 0,
    border: "2px solid white",
  },

  name: {
    fontWeight: 700,
    fontSize: 16,
  },

  sub: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
};

export default UserList;
