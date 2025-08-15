import { useRef, useEffect } from "react";

export default function MessageInput({ input, setInput, onSend, loading, placeholder }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    }
  }, [input]);

  // Focus textarea after every reply (when loading goes from true to false)
  useEffect(() => {
    if (!loading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) onSend();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePaste = () => {
    // placeholder for paste handling
  };

  return (
    <div className="pt-4 pb-4 px-4 border-t border-border dark:border-dark-350/80 bg-white/60 dark:bg-dark-950/60 backdrop-blur-md rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="flex items-end gap-4 rounded-2xl w-full">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder || "Type your message here... (See <attachments> above for file contents. You may not need to search or read the file again.)"}
          disabled={loading}
          className="w-full min-h-[48px] max-h-[160px] resize-none px-6 py-4 rounded-full border-2 border-primary-200 dark:border-dark-550 bg-blue-100 dark:bg-black text-black dark:text-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-primary-300 shadow transition-all pr-16"
          rows="1"
          maxLength={2000}
        />
        {/* ...existing code... */}
        <div className="flex flex-col items-center rounded-xl">
          <button
            type="submit"
            className={`flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-200 text-lg ${input.trim() && !loading ? 'bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-700 hover:to-primary-500 dark:from-primary-700 dark:to-primary-400 dark:hover:from-primary-800 dark:hover:to-primary-500' : 'bg-gray-400 cursor-not-allowed dark:bg-dark-700'}`}
            disabled={!input.trim() || loading}
            title="Send message (Enter)"
          >
            {loading ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9 22,2" />
              </svg>
            )}
          </button>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-black bg-transparent pointer-events-none select-none">
            {input.length}/2000
          </span>
        </div>

      </form>
    </div>
  );
}