import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function MessageList({ messages, personaImages, loading }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewIndicator, setShowNewIndicator] = useState(false);
  const [lastSeenCount, setLastSeenCount] = useState(() => messages.length);
  const scrollTimeout = useRef(null);

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
      setLastSeenCount(messages.length);
    } else {
      // if new messages arrive while user is scrolled up, show indicator
      setShowNewIndicator(true);
    }
  }, [messages, loading, isAtBottom]);

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
        setIsAtBottom((prev) => {
          if (prev !== atBottom) {
            if (atBottom) setShowNewIndicator(false);
            return atBottom;
          }
          return prev;
        });
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
          <p className="text-base">Choose a persona and send your first message to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={containerRef} className="h-full overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <Message
              key={message.id || Math.random()}
              message={message}
              personaImages={personaImages}
            />
          ))}

          {/* Typing indicator rendered as a chat bubble when assistant is generating */}
          {loading && (
            <div className="mb-4 flex justify-start animate-fadeInLeft">
              <div className="mr-3 flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 via-surface to-primary-200 dark:from-primary-900 dark:via-surface-dark dark:to-primary-800 flex items-center justify-center shadow-lg">
                  <span className="text-base font-bold text-primary-700 dark:text-primary-200">Typing...</span>
                </div>
              </div>

              <div className="max-w-[80%] text-left">
                <div className="inline-block px-4 py-2 rounded-2xl shadow-md border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 text-white text-sm font-semibold shadow-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
            aria-label="Scroll to newest messages"
            title="Scroll to newest messages"
          >
            {Math.max(1, messages.length - lastSeenCount)} new message{messages.length - lastSeenCount > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}