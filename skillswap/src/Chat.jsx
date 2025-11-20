// Chat.jsx — WhatsApp Style Private Chat

import React, { useEffect, useState, useRef } from "react";

import createRoomId from "./utils/createRoomId";
import socket from "./socket";




function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const Chat = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const roomId =
    selectedUser && currentUser
      ? createRoomId(currentUser.email, selectedUser.email)
      : null;

  // ------------------------ SCROLL DOWN ------------------------
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // ---------------------- SOCKET LISTENERS ---------------------
  useEffect(() => {
    socket.on("receive_message", (msg) => {
        if (msg.roomId !== roomId) return;

        // 🔥 IGNORE YOUR OWN MESSAGE
        if (msg.sender === currentUser.email) return;

        setMessages(prev => [...prev, { ...msg, incoming: true }]);
        scrollToBottom();
        });


    socket.on("typing", ({ username, isTyping, roomId: r }) => {
      if (r !== roomId) return;

      setTypingUsers((prev) => {
        const updated = { ...prev };
        if (isTyping) updated[username] = Date.now();
        else delete updated[username];
        return updated;
      });
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
    };
  }, [roomId, currentUser]);

  // ---------------------- LOAD HISTORY + JOIN -------------------
  useEffect(() => {
    if (!selectedUser || !roomId) {
      setMessages([]);
      return;
    }

    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chat/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user1: currentUser.email,
            user2: selectedUser.email,
          }),
        });

        const data = await res.json();

        setMessages(
          data.map((msg) => ({
            ...msg,
            incoming: msg.sender !== currentUser.email,
          }))
        );

        scrollToBottom();
      } catch (err) {
        console.error("History load error:", err);
      }
    })();

    socket.emit("join_room", roomId);

    return () => {
      socket.emit("leave_room", roomId);
    };
  }, [selectedUser, roomId]);

  // --------------------------- SEND -----------------------------
  const send = () => {
    if (!text.trim() || !roomId) return;

    const payload = {
      roomId,
      sender: currentUser.email,
      receiver: selectedUser.email,
      message: text.trim(),
      ts: Date.now(),
    };

    // UI update instantly
    setMessages((prev) => [...prev, { ...payload, incoming: false }]);
    socket.emit("send_message", payload);

    setText("");
    socket.emit("typing", {
      roomId,
      username: currentUser.email,
      isTyping: false,
    });

    scrollToBottom();
  };

  // ---------------------- TYPING INDICATOR ----------------------
  const handleTyping = (value) => {
    setText(value);

    socket.emit("typing", {
      roomId,
      username: currentUser.email,
      isTyping: true,
    });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        roomId,
        username: currentUser.email,
        isTyping: false,
      });
    }, 1000);
  };

  const typingLabel = () => {
    const others = Object.keys(typingUsers).filter(
      (u) => u !== currentUser.email
    );

    if (others.length === 1) return `${others[0]} is typing...`;
    if (others.length > 1) return "Multiple people typing...";
    return null;
  };

  // ---------------------------- UI ------------------------------
  return (
    <div className="chat-window">

      {/* CHAT MESSAGES */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.incoming
                ? "message-row message-incoming"
                : "message-row message-outgoing"
            }
          >
            <div
              className={
                "message-bubble " +
                (msg.incoming ? "incoming" : "outgoing")
              }
            >
              {msg.message}

              <div className="message-time">
                {formatTime(msg.timestamp || msg.ts)}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* TYPING LABEL */}
      {typingLabel() && (
        <div className="typing-label">{typingLabel()}</div>
      )}

      {/* INPUT SECTION */}
      <div className="chat-input-container">
        <input
          className="chat-input"
          placeholder={
            selectedUser
              ? `Message ${selectedUser.username}`
              : "Select a user"
          }
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={!selectedUser}
        />

        <button
          className="send-btn"
          onClick={send}
          disabled={!selectedUser}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;
