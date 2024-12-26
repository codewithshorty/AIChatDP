import ChatBotStart from "./components/ChatBotStart";
import ChatBotApp from "./components/ChatBotApp";
import { useState } from "react";

export default function App() {
  const [isChatting, setIsChatting] = useState(false);

  const handleChatStart = () => {
    setIsChatting(true);
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} />
      ) : (
        <ChatBotStart onChatStart={handleChatStart} />
      )}
    </div>
  );
}
