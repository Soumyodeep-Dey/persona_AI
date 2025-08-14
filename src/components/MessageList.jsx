import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function MessageList({ messages, personaImages, loading }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewIndicator, setShowNewIndicator] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // Auto-scroll logic: only scroll when user is already at (or near) the bottom.
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
      setShowNewIndicator(false);
    } else {
      // if new messages arrive while user is scrolled up, show indicator
      setShowNewIndicator(true);
    }
  }, [messages, loading, isAtBottom]);

  // Track whether user is at bottom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 80; // px from bottom to consider "at bottom"
    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
      setIsAtBottom(atBottom);
      if (atBottom) setShowNewIndicator(false);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // run once to initialize state
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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
    <div className="relative h-full">
      <div ref={containerRef} className="h-full overflow-y-auto pr-2">
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message
              key={message.id || Math.random()}
              message={message}
              personaImages={personaImages}
            />
          ))}

          {/* Typing indicator rendered as a chat bubble when assistant is generating */}
          {loading && (
            <div className="mb-4 flex justify-start">
              <div className="mr-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                  A
                </div>
              </div>

              <div className="max-w-[70%] text-left">
                <div className="inline-block px-4 py-2 rounded-2xl shadow bg-surface dark:bg-surface-dark text-text dark:text-text-dark">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '.12s' }} />
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '.24s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {showNewIndicator && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => {
              scrollToBottom();
              setShowNewIndicator(false);
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary-600 text-white text-sm shadow-lg hover:bg-primary-700 focus:outline-none"
            aria-label="Scroll to newest messages"
            title="Scroll to newest messages"
          >
            New messages
          </button>
        </div>
      )}
    </div>
  );
}