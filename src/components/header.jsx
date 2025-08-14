import DarkModeToggle from "./DarkModeToggle";

export default function Header({ darkMode, setDarkMode, onClearChat, messageCount }) {
    return (
        <header className="w-full border-b bg-background dark:bg-background-dark text-text dark:text-text-dark border-border dark:border-border-dark">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-semibold shadow-sm">AI</div>
                        <div className="leading-tight">
                            <div className="text-sm font-semibold">Persona AI</div>
                            <div className="text-xs text-muted">Chat assistant</div>
                        </div>
                    </div>

                    {messageCount > 0 && (
                        <span className="ml-3 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5">{messageCount} msgs</span>
                    )}
                </div>

                <div className="hidden sm:flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-success">
                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                        <span className="text-xs text-muted">Connected</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {messageCount > 0 && (
                        <button
                            onClick={onClearChat}
                            className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 hover:bg-red-100"
                            title="Clear chat history"
                            aria-label="Clear chat history"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span className="hidden sm:inline">Clear</span>
                        </button>
                    )}

                    <DarkModeToggle isDark={darkMode} toggle={() => setDarkMode(!darkMode)} />

                    <button className="p-2 rounded-md hover:bg-surface/60 dark:hover:bg-surface-dark/60 transition-colors" title="Settings" aria-label="Open settings">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.67 0 1.23-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.1 3.1l.06.06c.43.43 1 .64 1.58.54.5-.09 1-.34 1.48-.68A1.65 1.65 0 0 0 11 2.09V2a2 2 0 1 1 4 0v.09c.19.09.37.2.54.33.46.4 1 .7 1.58.8.59.1 1.2-.1 1.63-.53l.06-.06A2 2 0 1 1 20.9 6.1l-.06.06c-.43.43-.64 1-.54 1.58.09.5.34 1 .68 1.48.25.3.49.6.68.9z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
