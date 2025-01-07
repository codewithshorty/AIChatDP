import ChatBotStart from "./components/ChatBotStart";
import ChatBotApp from "./components/ChatBotApp";
import { useState } from "react";

export default function App() {
  const [isChatting, setIsChatting] = useState(false);

  //Creating the state for storing the chats
  const [chats, setChats] = useState([]);

  const handleChatStart = () => {
    setIsChatting(true);
    // Checking and creating of initial chat object
    if (chats.length === 0) {
      const newChat = {
        id: `Chat log: ${new Date().toLocaleDateString(
          "en-GB"
        )} ${new Date().toLocaleTimeString()}`,
        messages: [],
      };

      setChats([newChat]);
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} />
      ) : (
        <ChatBotStart onChatStart={handleChatStart} />
      )}
    </div>
  );
}
