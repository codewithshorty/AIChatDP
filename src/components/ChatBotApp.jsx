import React from "react";
import "./ChatBotApp.css";

export default function ChatBotApp() {
  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat list</h2>
          <i className="bx bx-edit new-chat"></i>
        </div>
        <div className="chat-list-item">
          <h4> Chat log 22.12.2024 14:05:2024</h4>
          <i className="bx bxs-folder-minus"></i>
        </div>
        <div className="chat-list-item active">
          <h4> Chat log 22.12.2024 14:05:2024</h4>
          <i className="bx bxs-folder-minus"></i>
        </div>
        <div className="chat-list-item">
          <h4> Chat log 22.12.2024 14:05:2024</h4>
          <i className="bx bxs-folder-minus"></i>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Start the conversation</h3>
          <i className="bx bx-arrow-back arrow"></i>
        </div>
        <div className="chat">
          <div className="prompt">
            Hello, how are you
            <span>14:05:2024</span>
          </div>
          <div className="response">
            Hello, I am just an AI, how can I help you
            <span>14:05:2024</span>
          </div>
          <div className="typing">...Typing...</div>
        </div>
        <form className="msg-form" action="">
          <i className="bx bx-smile smile"></i>
          <input
            type="text"
            className="msg-input"
            placeholder="Type the message"
          />
          <i className="bx bxs-send"></i>
        </form>
      </div>
    </div>
  );
}
