// ----------------------------
//  SERVER.JS — FINAL VERSION
// ----------------------------

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ----------------------------
//  API ROUTES
// ----------------------------
app.use("/api/chat", require("./routes/chat"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/session", require("./routes/session"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ----------------------------
//  MONGODB CONNECTION
// ----------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("MongoDB Error ❌", err);
    process.exit(1);
  });

// ----------------------------
//  SOCKET.IO SERVER
// ----------------------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// STORE email → socketId
const onlineUsers = {}; 
// Example: { "user@gmail.com": "socket123" }

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Send latest status immediately to the new user
  socket.emit("online-users", onlineUsers);

  // ----------------------------
  //  REGISTER USER
  // ----------------------------
  socket.on("register-user", (email) => {
    onlineUsers[email] = socket.id;
    console.log("🟢 Registered:", email);

    // Broadcast updated list
    io.emit("online-users", onlineUsers);
  });
socket.on("get-online-users", () => {
  socket.emit("online-users", onlineUsers);
});

  // ----------------------------
  //  JOIN ROOM
  // ----------------------------
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`➡️ ${socket.id} joined ${roomId}`);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`⬅️ ${socket.id} left ${roomId}`);
  });

  // ----------------------------
  //  SAVE MESSAGE + BROADCAST
  // ----------------------------
  const ChatMessage = require("./models/ChatMessage");

  socket.on("send_message", async (data) => {
    try {
      await ChatMessage.create({
        roomId: data.roomId,
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: data.ts || Date.now(),
      });

      io.to(data.roomId).emit("receive_message", data);
    } catch (err) {
      console.error("Message save error:", err);
    }
  });

  // ----------------------------
  //  TYPING INDICATOR
  // ----------------------------
  socket.on("typing", ({ roomId, username, isTyping }) => {
    socket.to(roomId).emit("typing", { username, isTyping, roomId });
  });

  // ----------------------------
  //  WEBRTC SIGNALING
  // ----------------------------
  socket.on("webrtc-offer", ({ roomId, sdp }) => {
    socket.to(roomId).emit("webrtc-offer", { sdp });
  });

  socket.on("webrtc-answer", ({ roomId, sdp }) => {
    socket.to(roomId).emit("webrtc-answer", { sdp });
  });

  socket.on("webrtc-ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("webrtc-ice-candidate", { candidate });
  });

  // ---------------------------------------------------
  //  CALLING SYSTEM
  // ---------------------------------------------------
  socket.on("call-user", ({ targetEmail, fromEmail, fromName, roomId }) => {
    const targetSocket = onlineUsers[targetEmail];
    if (!targetSocket) return;

    io.to(targetSocket).emit("incoming-call", {
      fromEmail,
      fromName,
      roomId,
    });
  });

  socket.on("answer-call", ({ targetEmail, accepted }) => {
    const targetSocket = onlineUsers[targetEmail];
    if (!targetSocket) return;

    io.to(targetSocket).emit("call-answered", { accepted });
  });

  // ----------------------------
  //  DISCONNECT
  // ----------------------------
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // Remove user from online list
    for (const email in onlineUsers) {
      if (onlineUsers[email] === socket.id) {
        delete onlineUsers[email];
        console.log(`🔴 ${email} removed`);
      }
    }

    // Update all clients
    io.emit("online-users", onlineUsers);
  });
});

// ----------------------------
//  START SERVER
// ----------------------------
server.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket running on port ${PORT}`);
});
