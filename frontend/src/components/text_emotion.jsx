import React, { useState } from 'react';
import axios from 'axios';

const EmotionText = () => {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(text);
    try {
      const response = await axios.post("http://localhost:5000/detect-emotion", {
        text: text,
      });

      setEmotion(response.data.emotion);
    } catch (error) {
      console.error("Error detecting emotion:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter text to detect emotion"
        className="p-2 border rounded-md mb-4"
      />
      <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-md">
        Detect Emotion
      </button>
      <h2 className="mt-4 text-xl font-semibold">
        Detected Emotion: {emotion || "None"}
      </h2>
    </div>
  );
};

export default EmotionText;
