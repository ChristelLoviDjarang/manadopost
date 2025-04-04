import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechContainer = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser tidak mendukung Speech Recognition.");
      return;
    }

    const startListening = () => {
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true });
    };

    startListening();

    return () => {
      SpeechRecognition.stopListening();
      resetTranscript();
    };
  }, []);

  return (
    <div className="speech-container">
      <h2>Transkripsi Suara:</h2>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechContainer;