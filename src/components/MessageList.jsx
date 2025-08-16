import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function MessageList({ messages, personaImages, loading }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  // Removed unused isAtBottom state
  const [showNewIndicator, setShowNewIndicator] = useState(false);
  const [lastSeenCount, setLastSeenCount] = useState(() => messages.length);
  const scrollTimeout = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // Auto-scroll logic: always scroll to bottom after new reply
  useEffect(() => {
    scrollToBottom();
    setShowNewIndicator(false);
    setLastSeenCount(messages.length);
  }, [messages, loading]);

  // Track whether user is at bottom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 120; // px from bottom to consider "at bottom"
    const onScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      // debounce frequent scroll events to reduce re-renders
      scrollTimeout.current = setTimeout(() => {
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
        if (atBottom) setShowNewIndicator(false);
      }, 80);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // run once to initialize state
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Keyboard shortcut: press End to jump to newest messages
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'End') {
        scrollToBottom();
        setShowNewIndicator(false);
        setLastSeenCount(messages.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-center text-muted dark:text-muted-dark animate-fadeInLeft">
        <div className="bg-gradient-to-br from-surface via-primary-50 to-surface dark:from-surface-dark dark:via-primary-900 dark:to-surface-dark rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-2xl font-bold mb-3 text-primary-700 dark:text-primary-200">Start a conversation</h3>
          <p className="text-lg dark:text-white">
            Choose a persona and send your first message to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-gradient-to-b from-surface via-surface/70 to-surface dark:from-surface-dark dark:via-surface-dark/80 dark:to-surface-dark shadow-2xl rounded-3xl overflow-hidden">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto pr-4 custom-scrollbar scroll-smooth"
      >
        <div className="flex flex-col gap-5 p-6 xl:p-10 message-list-scroll">
          {messages.map((message, idx) => (
            <Message
              key={message.id || Math.random()}
              message={message}
              personaImages={personaImages}
              className={`max-w-3xl xl:max-w-4xl w-full mx-auto message-item${idx === messages.length - 1 ? ' message-item-latest' : ''}`}
            />
          ))}

          {loading && (
            <div className="mb-6 flex justify-start animate-fadeInLeft">
              <div className="mr-4 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-white/30 dark:bg-dark-700/30 backdrop-blur-md flex items-center justify-center shadow-lg border-2 border-primary-300/30 dark:border-primary-500/30">
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-200">Typing...</span>
                </div>
              </div>

              <div className="max-w-2xl xl:max-w-3xl text-left">
                <div className="inline-block px-6 py-3 rounded-3xl shadow-md border-2 border-border/50 dark:border-border-dark/50 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-primary-400 dark:bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-3 h-3 bg-primary-400 dark:bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '.12s' }} />
                    <span className="w-3 h-3 bg-primary-400 dark:bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '.24s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {showNewIndicator && (
        <div className="absolute bottom-4 right-4 animate-fadeInLeft">
          <button
            onClick={() => {
              scrollToBottom();
              setShowNewIndicator(false);
              setLastSeenCount(messages.length);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 shadow-lg shadow-primary-400/30 text-white text-sm font-semibold hover:scale-105 transition-transform duration-200"
          >
            {Math.max(1, messages.length - lastSeenCount)} new message
            {messages.length - lastSeenCount > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}