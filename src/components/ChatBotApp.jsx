/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import "./ChatBotApp.css";

export default function ChatBotApp({
  onGoBack,
  chats,
  setChats,
  activeChat,
  setActiveChat,
  onNewChat,
}) {
  const apiKey = import.meta.env.VITE_API_KEY;

  // inputValue state for storing the value
  const [inputValue, setInputValue] = useState("");
  // creating of messages state where we will store messages within the chats object
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  // creating the state for indicating the chatAI typing simulation
  const [isTyping, setIsTyping] = useState(false);

  // creating the state for toggle window of emojiPicker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // ref position for end of the chat list
  const endOfChatRef = useRef(null);

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
  const sendMessage = async () => {
    //creating the newMEssage object from input value
    if (inputValue.trim === "") return;
    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    // scenario where there is no activeChat in case all chats are deleted
    if (!activeChat) {
      onNewChat(inputValue);
      setInputValue("");
    } else {
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

      // ChatAI start answering
      setIsTyping(true);

      // making an API call at openAI

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: apiKey,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputValue }],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const chatdpResponse = data.choices[0].message.content.trim();

      // creating propper msgObject
      const msgRespObject = {
        type: "response",
        text: chatdpResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      // updating the message object with proper response object
      const msgOpenAiResponses = [...updatedMessages, msgRespObject];
      setMessages(msgOpenAiResponses);

      // updating the chat object with responded messages from the API
      const chatOpenAiResponses = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: msgOpenAiResponses };
        }
        return msgOpenAiResponses;
      });

      setChats(chatOpenAiResponses);
      setIsTyping(false);
    }
  };

  // sending message on click on enter after writing the message in input field
  const sendMessageEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // handling of selected chat and messages accordingly
  const handleActiveChat = (id) => {
    setActiveChat(id);
  };

  // deleting a chat function
  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);

    // setting of new activeChat after deleting of the active one
    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChat);
    }
  };

  // creating the function for picking inputValue alongside the picked emoji
  const handleSelectEmoji = (emoji) => {
    setInputValue((prevValue) => prevValue + emoji.native);
  };

  //listening to messages to all the time scroll to last one
  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <i
              className="bx bxs-folder-minus"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChat(chat.id);
              }}
            ></i>
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
          <div ref={endOfChatRef}></div>
          {isTyping && <div className="typing">...Typing...</div>}
        </div>
        <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
          <i
            className="bx bx-smile smile"
            onClick={() => setShowEmojiPicker((prevState) => !prevState)}
          ></i>
          {showEmojiPicker && (
            <div className="picker">
              <Picker data={data} onEmojiSelect={handleSelectEmoji} />
            </div>
          )}
          <input
            type="text"
            className="msg-input"
            placeholder="Type the message"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={sendMessageEnter}
            onFocus={() => setShowEmojiPicker(false)}
          />
          <i className="bx bxs-send" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  );
}
