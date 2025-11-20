// Messages.jsx — WhatsApp Style Messaging Page

import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import Chat from "./Chat";
import VideoCall from "./VideoCall";
import createRoomId from "./utils/createRoomId";
import { jwtDecode } from "jwt-decode";
import "./Messages.css";
import socket from "./socket";

import { FaVideo } from "react-icons/fa";

const Messages = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const currentEmail = decoded.user.email;
  const currentName = currentEmail.split("@")[0];

  const [selectedUser, setSelectedUser] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  // ---------------------------------------------------------
  // LISTEN FOR INCOMING CALLS
  // ---------------------------------------------------------
  useEffect(() => {
    socket.on("incoming-call", (data) => {
      setIncomingCall(data);
    });

    socket.on("call-answered", ({ accepted }) => {
      if (!accepted) {
        alert("❌ Call Declined");
        setShowVideo(false);
      } else {
        setShowVideo(true);
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-answered");
    };
  }, []);

  // ---------------------------------------------------------
  // SELECT USER → CREATE PRIVATE ROOM
  // ---------------------------------------------------------
  const handleSelectUser = (user) => {
    setSelectedUser(user);

    const newRoom = createRoomId(currentEmail, user.email);
    setRoomId(newRoom);

    setShowVideo(false);
  };

  // ---------------------------------------------------------
  // USER PRESSES 🎥 BUTTON
  // ---------------------------------------------------------
  const startCallRequest = () => {
    if (!selectedUser) return;

    socket.emit("call-user", {
      targetEmail: selectedUser.email,
      fromEmail: currentEmail,
      fromName: currentName,
      roomId,
    });

    setShowVideo(true);
  };

  return (
    <div className="messages-container">

      {/* LEFT SIDEBAR */}
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h2>Chats</h2>
        </div>

        <UserList currentEmail={currentEmail} onSelectUser={handleSelectUser} />
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="messages-chatarea">
        {!selectedUser ? (
          <div className="empty-chat">
            <h2>Select a user to start chatting 💬</h2>
          </div>
        ) : (
          <>
            {/* CHAT HEADER */}
            <div className="chat-header">
              <button 
                className="back-btn" 
                onClick={() => window.location.href = "/dashboard"}
              >
                ←
              </button>

              <div className="chat-header-left">
                <div className="chat-avatar">
                  {selectedUser.username 
                    ? selectedUser.username.charAt(0).toUpperCase()
                    : selectedUser.email.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{selectedUser.username}</h3>
                  <p style={{ color: "#c5c5c5", fontSize: "14px" }}>
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="chat-header-right">
                <button className="header-btn" onClick={startCallRequest}>
                  <FaVideo size={20} />
                </button>
              </div>
            </div>

            {/* CHAT BODY */}
            <div className="chat-body">
              <Chat
                currentUser={{ email: currentEmail }}
                selectedUser={selectedUser}
              />
            </div>

            {/* INCOMING CALL POPUP */}
            {incomingCall && (
              <div className="incoming-call-popup">
                <div className="incoming-box">
                  <h2>📞 {incomingCall.fromName} is calling...</h2>

                  <div className="incoming-buttons">
                    <button
                      className="accept-btn"
                      onClick={() => {
                        socket.emit("answer-call", {
                          targetEmail: incomingCall.fromEmail,
                          accepted: true,
                        });
                        setRoomId(incomingCall.roomId);
                        setShowVideo(true);
                        setIncomingCall(null);
                      }}
                    >
                      Accept
                    </button>

                    <button
                      className="decline-btn"
                      onClick={() => {
                        socket.emit("answer-call", {
                          targetEmail: incomingCall.fromEmail,
                          accepted: false,
                        });
                        setIncomingCall(null);
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIDEO CALL POPUP */}
            {showVideo && (
              <div className="video-popup">
                <div className="video-popup-content">
                  <button
                    className="video-close"
                    onClick={() => setShowVideo(false)}
                  >
                    ✖
                  </button>

                  <VideoCall room={roomId} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
