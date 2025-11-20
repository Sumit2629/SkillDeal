// src/registerSocketUser.js

import socket from "./socket";

export default function registerSocketUser(email) {
  if (!email) return;

  socket.emit("register-user", email);
  console.log("🔵 Registered globally:", email);
}
