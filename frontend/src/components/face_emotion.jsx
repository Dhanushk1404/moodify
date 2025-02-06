import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceEmotion = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Loading...");

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    loadModels().then(startVideo);
  }, []);

  const detectEmotion = async () => {
    if (videoRef.current) {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections && detections.expressions) {
        const detectedEmotion = Object.entries(detections.expressions).reduce(
          (a, b) => (a[1] > b[1] ? a : b)
        )[0];

        setEmotion(detectedEmotion);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectEmotion();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <video ref={videoRef} autoPlay playsInline className="rounded-lg border shadow-md" />
      <h2 className="mt-4 text-xl font-semibold">
        Detected Emotion: {emotion || "Waiting..."}
      </h2>
    </div>
  );
};

export default FaceEmotion;
