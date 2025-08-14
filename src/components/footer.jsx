import { useState, useEffect } from "react";

export default function Footer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-2 px-4 bg-transparent">
            <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="truncate">Made with <span className="text-red-500">♥</span> by <a href="https://your-website.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">your-website.com</a></div>
                <div className="hidden sm:block">Built with React & OpenAI</div>
                <div className="ml-4 monospace">{formatTime(currentTime)}</div>
            </div>
        </footer>
    );
}