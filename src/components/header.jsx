import DarkModeToggle from "./DarkModeToggle";

export default function Header({ darkMode, setDarkMode, onClearChat, messageCount }) {
    return (
        <header className="w-full site-shell-header border-b border-border bg-primary-50 dark:border-border-dark dark:bg-background-dark text-text dark:text-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="m-0 text-xl font-semibold">Persona AI Chatbot</h1>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-sm text-muted">Messages: {messageCount}</div>

                    <button
                        onClick={onClearChat}
                        aria-label="Clear chat history"
                        title="Clear chat history"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-error-600 text-white text-sm font-medium shadow-sm hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-300 dark:bg-error-500 dark:hover:bg-error-400 dark:focus:ring-error-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v9a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm2 4a.5.5 0 011 0v7a.5.5 0 11-1 0V6zm4 0a.5.5 0 011 0v7a.5.5 0 11-1 0V6z" clipRule="evenodd" />
                        </svg>
                        <span>Clear Chat</span>
                    </button>

                    <DarkModeToggle isDark={darkMode} toggle={() => setDarkMode(!darkMode)} />
                </div>
            </div>
        </header>
    );
}
