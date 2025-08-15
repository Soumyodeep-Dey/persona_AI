import { useState, useEffect } from "react";

export default function Footer() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <footer className="w-full site-shell-footer border-t border-border bg-primary-50 dark:border-border-dark py-2 px-4 dark:bg-background-dark">
            <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-text dark:text-white">
                <div className="truncate">Made by <a href="https://soumyodeep-dey.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-200 hover:underline">Soumyodeep Dey</a></div>
                <div className="hidden sm:block">Built with React & OpenAI</div>
                <div className="ml-4 monospace">{formatTime(currentTime)}</div>
            </div>
        </footer>
    );
}