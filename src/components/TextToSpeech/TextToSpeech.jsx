import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './TextToSpeech.css';

const TextToSpeech = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = () => {
        if ('speechSynthesis' in window) {
            // Stop any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => {
                setIsSpeaking(false);
                alert('Error occurred while speaking');
            };

            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser');
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="text-to-speech">
            <img
                src={assets.speaker_icon} // You'll need to add this icon to your assets
                alt={isSpeaking ? "Stop speaking" : "Speak text"}
                className={`speak-icon ${isSpeaking ? 'speaking' : ''}`}
                onClick={isSpeaking ? stopSpeaking : speak}
                title={isSpeaking ? "Stop speaking" : "Speak text"}
            />
        </div>
    );
};

export default TextToSpeech; 