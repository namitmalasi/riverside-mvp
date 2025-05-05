import React from "react";
import { useParams } from "react-router-dom";

const Studio = () => {
  const { roomId } = useParams();

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold">Studio – Room: {roomId}</h2>
      {/* Recording UI will go here */}
    </div>
  );
};

export default Studio;
