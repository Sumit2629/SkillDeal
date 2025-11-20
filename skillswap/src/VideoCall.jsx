// VideoCall.jsx — Robust WebRTC + Socket.io Caller/Receiver
import React, { useEffect, useRef, useState } from "react";
import socket from "./socket";

const rtcConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VideoCall = ({ room }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const pcRef = useRef(null);
  const localStreamRef = useRef(null);

  // buffer incoming ICE candidates until peer connection exists
  const candidateBufferRef = useRef([]);

  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [status, setStatus] = useState(""); // debug status shown in console

  // ------------------------------------------------------------------
  // SIGNALING: join room and register listeners
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!room) return;

    console.log("[VideoCall] mounting, joining room:", room);
    socket.emit("join_room", room);

    const onOffer = async ({ sdp }) => {
      console.log("[VideoCall] Received offer");
      try {
        if (!pcRef.current) await createPeer(false);

        // set remote description and answer
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);

        // flush candidate buffer (if any) after pc created
        flushCandidateBuffer();

        socket.emit("webrtc-answer", { roomId: room, sdp: pcRef.current.localDescription });
        console.log("[VideoCall] Sent answer");
      } catch (err) {
        console.error("[VideoCall] Error handling offer:", err);
      }
    };

    const onAnswer = async ({ sdp }) => {
      console.log("[VideoCall] Received answer");
      try {
        if (pcRef.current) {
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
          // flush candidates
          flushCandidateBuffer();
        } else {
          // buffer (rare): push into candidate buffer so it processed later
          console.warn("[VideoCall] Answer arrived but pc not ready - ignoring");
        }
      } catch (err) {
        console.error("[VideoCall] Error setting remote description (answer):", err);
      }
    };

    const onCandidate = async ({ candidate }) => {
      if (!candidate) return;
      // if pc exists, add it, otherwise buffer it
      if (pcRef.current) {
        try {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          console.log("[VideoCall] Added remote ICE candidate");
        } catch (err) {
          console.warn("[VideoCall] addIceCandidate failed, buffering:", err);
          candidateBufferRef.current.push(candidate);
        }
      } else {
        console.log("[VideoCall] Buffering incoming ICE candidate (pc not ready)");
        candidateBufferRef.current.push(candidate);
      }
    };

    socket.on("webrtc-offer", onOffer);
    socket.on("webrtc-answer", onAnswer);
    socket.on("webrtc-ice-candidate", onCandidate);

    return () => {
      socket.off("webrtc-offer", onOffer);
      socket.off("webrtc-answer", onAnswer);
      socket.off("webrtc-ice-candidate", onCandidate);
      socket.emit("leave_room", room);
      console.log("[VideoCall] unmounted, left room:", room);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // ------------------------------------------------------------------
  // CREATE PEER CONNECTION (adds local tracks and sets handlers)
  // ------------------------------------------------------------------
  async function createPeer(isCaller = true) {
    pcRef.current = new RTCPeerConnection(rtcConfig);

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", { roomId: room, candidate: event.candidate });
        console.log("[VideoCall] Emitted ICE candidate");
      }
    };

    pcRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
      console.log("[VideoCall] Remote track received");
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, stream);
      });

      setInCall(true);
      console.log("[VideoCall] Local media acquired and tracks added");

      // If any ICE candidates were buffered earlier, flush them now
      flushCandidateBuffer();

      return pcRef.current;
    } catch (err) {
      console.error("[VideoCall] getUserMedia failed — check camera/microphone permissions:", err);
      setStatus("Camera / microphone permission denied or unavailable");
      throw err;
    }
  }

  // helper to flush buffered candidates
  const flushCandidateBuffer = async () => {
    if (!pcRef.current) return;
    const buffer = candidateBufferRef.current.splice(0);
    for (const c of buffer) {
      try {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(c));
        console.log("[VideoCall] Flushed buffered ICE candidate");
      } catch (err) {
        console.warn("[VideoCall] Error adding buffered candidate:", err);
      }
    }
  };

  // ------------------------------------------------------------------
  // START CALL (caller)
  // - ensure we joined the room first (emit join_room) then create offer
  // ------------------------------------------------------------------
  const startCall = async () => {
    if (!room) {
      alert("Select a user / room first.");
      return;
    }

    // ensure socket and server know we're in the room
    socket.emit("join_room", room);
    // small delay to avoid race of room-join vs emit -> helps reliability
    await new Promise((r) => setTimeout(r, 180));

    try {
      await createPeer(true);

      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      socket.emit("webrtc-offer", { roomId: room, sdp: offer });
      console.log("[VideoCall] Sent offer");
    } catch (err) {
      console.error("[VideoCall] startCall error:", err);
    }
  };

  // ------------------------------------------------------------------
  // END CALL / CLEANUP
  // ------------------------------------------------------------------
  const endCall = () => {
    if (pcRef.current) {
      try {
        pcRef.current.getSenders().forEach((s) => s.track?.stop());
      } catch (err) {
        console.warn("[VideoCall] stop senders error", err);
      }
      try {
        pcRef.current.close();
      } catch (err) {
        console.warn("[VideoCall] close pc error", err);
      }
    }

    pcRef.current = null;

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    candidateBufferRef.current = [];
    setScreenSharing(false);
    setInCall(false);

    socket.emit("leave_room", room);
    console.log("[VideoCall] Call ended and left room");
  };

  // ------------------------------------------------------------------
  // Controls: mute / camera / screenshare
  // ------------------------------------------------------------------
  const toggleMute = () => {
    localStreamRef.current?.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMuted((m) => !m);
  };

  const toggleCamera = () => {
    localStreamRef.current?.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setCameraOff((c) => !c);
  };

  const startScreenShare = async () => {
    if (!pcRef.current) return alert("Start the call first to share screen.");

    if (screenSharing) {
      // restore camera
      const camTrack = localStreamRef.current?.getVideoTracks()[0];
      const sender = pcRef.current.getSenders().find((s) => s.track?.kind === "video");
      sender && sender.replaceTrack(camTrack);
      setScreenSharing(false);
      return;
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = pcRef.current.getSenders().find((s) => s.track?.kind === "video");
      sender && sender.replaceTrack(screenTrack);

      screenTrack.onended = () => {
        // restore camera when screen share stops
        const camTrack = localStreamRef.current?.getVideoTracks()[0];
        if (sender && camTrack) sender.replaceTrack(camTrack);
        setScreenSharing(false);
      };

      setScreenSharing(true);
    } catch (err) {
      console.error("[VideoCall] Screen share failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.videoArea}>
        <video ref={remoteVideoRef} autoPlay playsInline style={styles.remoteVideo} />
        <video ref={localVideoRef} autoPlay muted playsInline style={styles.localVideo} />
      </div>

      <div style={styles.controls}>
        {!inCall ? (
          <button style={styles.controlBtn} onClick={startCall}>
            Start Call
          </button>
        ) : (
          <button style={{ ...styles.controlBtn, background: "#e63946" }} onClick={endCall}>
            End Call
          </button>
        )}

        <button style={styles.controlBtn} onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </button>

        <button style={styles.controlBtn} onClick={toggleCamera}>
          {cameraOff ? "Camera On" : "Camera Off"}
        </button>

        <button style={styles.controlBtn} onClick={startScreenShare}>
          {screenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
      </div>

      <div style={{ marginTop: 8, fontSize: 13, color: "#666", textAlign: "center" }}>{status}</div>
    </div>
  );
};

// UI Styles (unchanged)
const styles = {
  container: {
    width: 650,
    background: "white",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
  },
  videoArea: {
    position: "relative",
    height: 380,
    background: "black",
    borderRadius: 10,
    overflow: "hidden",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  localVideo: {
    position: "absolute",
    width: 160,
    height: 120,
    bottom: 12,
    right: 12,
    borderRadius: 8,
    border: "2px solid #fff",
  },
  controls: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  controlBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 8,
    background: "#457b9d",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default VideoCall;
