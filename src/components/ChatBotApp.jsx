import React, { useEffect, useState } from "react";

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

  // create the effect which will follow which chat is clicked and showing the refflected messages with created activeChatObject
  useEffect(() => {
    const activeChatObject = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObject ? activeChatObject.messages : []);
  }, [activeChat, chats]);

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
    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });

    setChats(updatedChats);
  };

  // sending message on click on enter after writing the message in input field
  const sendMessageEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleActiveChat = (id) => {
    setActiveChat(id);
  };

  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat list</h2>
          <i className="bx bx-edit new-chat" onClick={onNewChat}></i>
        </div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-list-item ${
              chat.id === activeChat ? "active" : ""
            }  `}
            onClick={() => handleActiveChat(chat.id)}
          >
            <h4>{chat.displayID}</h4>
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
