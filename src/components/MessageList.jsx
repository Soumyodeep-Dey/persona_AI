import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageList({ messages, personaImages, loading }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
        <div>
          <div className="text-4xl mb-2">💬</div>
          <h3 className="text-lg font-semibold mb-1">Start a conversation</h3>
          <p className="text-sm">Choose a persona and send your first message to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full overflow-y-auto pr-2">
      <div className="flex flex-col">
        {messages.map((message) => (
          <Message
            key={message.id || Math.random()}
            message={message}
            personaImages={personaImages}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}