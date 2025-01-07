import React, { useState } from "react";
import "./ChatBotApp.css";

export default function ChatBotApp({ onGoBack, chats, setChats }) {
  // inputValue state for storing the value
  const [inputValue, setInputValue] = useState("");
  // creating of messages state where we will store messages within the chats object
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  // creating the function for updating the state with the change on input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // creating the function for updating the chat.messages field with the input value
  const sendMessage = () => {
    //creating the newMEssage object from input value
    if (inputValue.trim === "") return;
    const newMessage = {
      type: "prompt",
      message: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    // update the messages state with new message object
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");

    // update the chat object on right chat session with updatedMessages
    const updatedChat = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });

    setChats(updatedChat);
  };
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
          <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
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
