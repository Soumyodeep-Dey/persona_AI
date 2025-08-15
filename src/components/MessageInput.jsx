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
    <div className="pt-2 border-t border-border dark:border-border-dark/60">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}

          onPaste={handlePaste}
          placeholder={placeholder || "Type your message..."}
          disabled={loading}
          className="flex-1 min-h-[44px] max-h-[160px] resize-none px-4 py-3 rounded-2xl border border-border dark:border-border-dark bg-background dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-400 dark:placeholder-gray-500"
          rows="1"
          maxLength={2000}
        />

        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">{input.length}/2000</div>
          <button
            type="submit"
            className={`px-4 py-2 rounded-full font-semibold text-white ${input.trim() && !loading ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400' : 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'}`}
            disabled={!input.trim() || loading}
            title="Send message (Enter)"
          >
            {loading ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9 22,2" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}