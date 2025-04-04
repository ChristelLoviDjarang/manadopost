import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const ChatBox = ({ conversation, onSendMessage, isListening, toggleListening, loading }) => {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="message-container">
        {conversation.length === 0 ? (
          <div className="empty-message">
            <p style={{ color: 'black' }}>Mulai percakapan dengan avatar</p>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content" style={{ color: 'black' }}>{msg.message}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type or use mic..."
          rows={1}
          disabled={isListening || loading}
        />
        
        <button 
          className="send-btn" 
          onClick={handleSend}
          disabled={!message.trim() || isListening || loading}
        >
          <FaPaperPlane size={20} color="white" />
          <a href="https://www.flaticon.com/free-icons/send" title="send icons" style={{ display: 'none' }}>Send icons created by Moon.de - Flaticon</a>
        </button>
        
        <button 
          className={`mic-btn ${isListening ? "active" : ""} ${loading ? "disabled" : ""}`} 
          onClick={toggleListening}
          disabled={loading}
        >
          {isListening ? <FaMicrophoneSlash size={20} color="white" /> : <FaMicrophone size={20} color="white" />}
        </button>
      </div>
      {/* Status indicator */}
      {(isListening || loading) && (
        <div className="status-indicator">
          <div className={`status-dot ${isListening ? "listening" : "loading"}`}></div>
          <span style={{ color: 'black' }}>{isListening ? "Mendengarkan..." : "Memproses..."}</span>
        </div>
      )}
      
      <style jsx>{`
        .chatbox-container {
          width: 500%;
          max-width: 750px; //untuk ukuran chat box
          display: flex;
          flex-direction: column;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          position: relative;
        }
        
        .message-container {
          padding: 12px;
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        
        .message-container::-webkit-scrollbar {
          width: 4px;
        }
        
        .message-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .message-container::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        .empty-message {
          text-align: center;
          color: black; /* Changed to black */
          font-style: italic;
          padding: 20px 0;
        }
        
        .message {
          padding: 8px 12px;
          border-radius: 16px;
          max-width: 85%;
          word-break: break-word;
        }
        
        .user {
          align-self: flex-end;
          background-color: rgba(52, 152, 219, 0.8);
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .assistant {
          align-self: flex-start;
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
          border-bottom-left-radius: 4px;
        }
        
        .message-content {
          font-size: 14px;
          line-height: 1.4;
          color: black; /* Changed to black */
        }
        
        .input-container {
          display: flex;
          padding: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .input-container textarea {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 20px;
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
          resize: none;
          outline: none;
          font-family: inherit;
          font-size: 14px;
        }
        
        .input-container textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .input-container textarea:disabled {
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
        }
        
        .send-btn {
          width: 36px;
          height: 36px;
          margin-left: 8px;
          background-color: rgba(52, 152, 219, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .send-btn:hover {
          background-color: rgba(52, 152, 219, 1);
        }
        
        .send-btn:disabled {
          background-color: rgba(52, 152, 219, 0.4);
          cursor: not-allowed;
        }
        
        .mic-btn {
          width: 36px;
          height: 36px;
          margin-left: 8px;
          background-color: rgba(75, 75, 75, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .mic-btn:hover {
          background-color: rgba(100, 100, 100, 1);
        }
        
        .mic-btn.active {
          background-color: rgba(231, 76, 60, 0.9);
          transform: scale(1.1);
        }
        
        .mic-btn.active:hover {
          background-color: rgba(231, 76, 60, 1);
        }
        
        .mic-btn.disabled {
          background-color: rgba(75, 75, 75, 0.4);
          cursor: not-allowed;
        }
        
        .status-indicator {
          position: absolute;
          bottom: 52px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 12px;
          font-size: 12px;
          color: white;
          animation: fadeIn 0.3s ease-out;
        }
        
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulse 1s infinite;
        }
        
        .status-dot.listening {
          background-color: #e74c3c;
        }
        
        .status-dot.loading {
          background-color: #f1c40f;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        
        /* Media queries for responsive design */
        @media (max-width: 480px) {
          .chatbox-container {
            max-width: 90%;
          }
          
          .message-container {
            max-height: 150px;
          }
          
          .status-indicator {
            font-size: 11px;
            padding: 4px 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBox;