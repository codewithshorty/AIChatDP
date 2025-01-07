import React, { useState } from "react";
import "./ChatBotApp.css";

export default function ChatBotApp({
  onGoBack,
  chats,
  setChats,
  activeChat,
  setActiveChat,
  onNewChat,
}) {
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
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    // update the messages state with new message object
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");

    // update the chat object on right chat session with updatedMessages
    const updatedChats = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });

    setChats(updatedChats);
  };

  const sendMessageEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat list</h2>
          <i className="bx bx-edit new-chat"></i>
        </div>
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`chat-list-item ${index === 0 ? "active" : ""}  `}
          >
            <h4>{chat.id}</h4>
            <i className="bx bxs-folder-minus"></i>
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Start the conversation</h3>
          <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${message.type === "prompt" ? "prompt" : "response"}`}
            >
              {message.text}
              <span>{message.timestamp}</span>
            </div>
          ))}
          <div className="typing">...Typing...</div>
        </div>
        <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
          <i className="bx bx-smile smile"></i>
          <input
            type="text"
            className="msg-input"
            placeholder="Type the message"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={sendMessageEnter}
          />
          <i className="bx bxs-send" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  );
}
