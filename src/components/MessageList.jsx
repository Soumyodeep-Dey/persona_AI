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
        <div className="bg-gradient-to-br from-surface via-primary-50 to-surface dark:from-surface-dark dark:via-primary-900 dark:to-surface-dark rounded-2xl shadow-lg p-8">
          <div className="text-5xl mb-3">💬</div>
          <h3 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-200">Start a conversation</h3>
          <p className="text-base dark:text-white">
            Choose a persona and send your first message to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-gradient-to-b from-surface via-surface/70 to-surface dark:from-surface-dark dark:via-surface-dark/80 dark:to-surface-dark shadow-inner rounded-xl overflow-hidden">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto pr-2 custom-scrollbar scroll-smooth"
      >
        <div className="flex flex-col gap-3 p-2">
          {messages.map((message) => (
            <Message
              key={message.id || Math.random()}
              message={message}
              personaImages={personaImages}
            />
          ))}

          {loading && (
            <div className="mb-4 flex justify-start animate-fadeInLeft">
              <div className="mr-3 flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-white/30 dark:bg-dark-700/30 backdrop-blur-md flex items-center justify-center shadow-md border border-primary-300/30 dark:border-primary-500/30">
                  <span className="text-xs font-semibold text-primary-700 dark:text-primary-200">Typing...</span>
                </div>
              </div>

              <div className="max-w-[80%] text-left">
                <div className="inline-block px-4 py-2 rounded-2xl shadow-sm border border-border/50 dark:border-border-dark/50 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-400 dark:bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-primary-400 dark:bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '.12s' }} />
                    <span className="w-2 h-2 bg-primary-400 dark:bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '.24s' }} />
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