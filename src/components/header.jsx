import DarkModeToggle from "./DarkModeToggle";

export default function Header({ darkMode, setDarkMode, onClearChat, messageCount }) {
    return (
        <header className="w-full border-b border-border dark:border-border-dark bg-light-150 dark:bg-gradient-dark text-gray-900 dark:text-text-dark shadow-lg backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between rounded-b-2xl">
                <h1 className="m-0 text-2xl font-bold tracking-tight text-primary-700 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-primary-700 dark:to-primary-400">Persona AI Chatbot</h1>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-sm text-gray-700 dark:text-muted-dark">Messages: {messageCount}</div>

                    <button
                        onClick={onClearChat}
                        aria-label="Clear chat history"
                        title="Clear chat history"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-error-600 text-white text-sm font-semibold shadow-md hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-300 dark:bg-error-500 dark:hover:bg-error-400 dark:focus:ring-error-200 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
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
