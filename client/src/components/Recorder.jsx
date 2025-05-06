import React, { useRef, useState } from "react";

const Recorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      setMediaStream(stream);
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const startRecording = () => {
    if (!mediaStream) return;
    const options = { mimeType: "video/webm" };
    const recorder = new MediaRecorder(mediaStream, options);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    };

    recorder.onstop = () => {
      console.log("Recording stopped");
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md mb-4 rounded shadow"
      />
      <div className="flex gap-4">
        <button
          onClick={startCamera}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Start Camera
        </button>
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Stop Recording
          </button>
        )}
        {recordedChunks.length > 0 && (
          <button
            onClick={downloadRecording}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default Recorder;
