import React from "react";
import "./ChatBotStart.css";

export default function ChatBotStart({ onChatStart }) {
  return (
    <div className="start-page">
      <button className="start-page-btn" onClick={onChatStart}>
        ChatDP AI
      </button>
    </div>
  );
}
