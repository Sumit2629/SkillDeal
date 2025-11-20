// src/utils/createRoomId.js
export default function createRoomId(user1, user2) {
  if (!user1 || !user2) return null;
  const a = user1.toLowerCase();
  const b = user2.toLowerCase();
  const sorted = [a, b].sort();
  return `room_${sorted[0]}_${sorted[1]}`;
}
