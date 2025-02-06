
import React from "react";
import FaceEmotion from "./components/face_emotion.jsx";
import EmotionText from "./components/text_emotion.jsx";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-4xl font-bold underline mb-8">Moodify - AI Mood Playlist</h1>
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Discover Your Mood</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Face-based Mood Detection</h3>
          <FaceEmotion />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Text-based Mood Detection</h3>
          <EmotionText />
        </div>
      </div>
    </div>
  );
}

export default App;