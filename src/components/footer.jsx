import { useState, useEffect } from "react";

export default function Footer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <footer className="w-full border-t border-border dark:border-border-dark bg-light-150 dark:bg-gradient-dark py-4 px-6 shadow-lg rounded-t-2xl">
            <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-900 dark:text-text-dark">
                <div className="truncate">Made by <a href="https://soumyodeep-dey.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary-700 dark:text-primary-200 hover:underline font-semibold">Soumyodeep Dey</a></div>
                <div className="hidden sm:block text-gray-700 dark:text-white">Built with React & OpenAI</div>
                <div className="ml-4 font-mono text-xs bg-light-250 dark:bg-surface-dark px-2 py-1 rounded shadow">{formatTime(currentTime)}</div>
            </div>
        </footer>
    );
}