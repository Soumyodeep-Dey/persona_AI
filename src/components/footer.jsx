import { useState, useEffect } from "react";

export default function Footer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <footer className="w-full border-t border-border dark:border-border-dark py-2 px-4 bg-surface dark:bg-surface-dark">
            <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-text dark:text-text-dark">
                <div className="truncate">Made with <span className="text-red-500">♥</span> by <a href="https://your-website.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">your-website.com</a></div>
                <div className="hidden sm:block">Built with React & OpenAI</div>
                <div className="ml-4 monospace">{formatTime(currentTime)}</div>
            </div>
        </footer>
    );
}