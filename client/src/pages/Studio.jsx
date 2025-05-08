import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Recorder from "../components/Recorder";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Studio = () => {
  const { roomId } = useParams();
  console.log("roomId", roomId);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("user-joined", (userId) => {
      console.log(`New user joined: ${userId}`);
      // You could show a popup, add them to a participant list, etc.
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold">Studio – Room: {roomId}</h2>
      <Recorder />{" "}
    </div>
  );
};

export default Studio;
