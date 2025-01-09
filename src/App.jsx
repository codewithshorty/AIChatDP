import ChatBotStart from "./components/ChatBotStart";
import ChatBotApp from "./components/ChatBotApp";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [isChatting, setIsChatting] = useState(false);

  //Creating the state for storing the chats
  const [chats, setChats] = useState([]);

  // Creating of activeChat state for tracking of active chat and showing messages which are related to that chat
  const [activeChat, setActiveChat] = useState(null);

  const handleChatStart = () => {
    setIsChatting(true);
    // Checking and creating of initial chat object
    if (chats.length === 0) {
      createNewChat();
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  // create function for adding new chat with empty messages property and add it to current chats array
  const createNewChat = (initialMessage = "") => {
    const newChat = {
      id: uuidv4(),
      displayID: `Chat log: ${new Date().toLocaleDateString(
        "en-GB"
      )} ${new Date().toLocaleTimeString()}`,
      // if all chats are deleted, we need initialMessage to be set in order to be added
      messages: initialMessage
        ? [
            {
              type: "prompt",
              text: initialMessage,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]
        : [],
    };
    // create updatedChats component which will be existing chats array spread with the newChat array
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    // setting active chat with one currently created
    setActiveChat(newChat.id);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp
          onGoBack={handleGoBack}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart onChatStart={handleChatStart} />
      )}
    </div>
  );
}
