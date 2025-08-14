import { useEffect } from "react";

export default function Header({ darkMode, setDarkMode }) {
    // Add/remove dark class from html tag
    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <header className={
            `w-full flex items-center justify-between px-8 py-4 mb-4 border-b shadow ` +
            (darkMode
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gradient-to-r from-blue-100 via-white to-green-100 border-gray-100')
        }>
            <h1 className={
                `text-2xl font-bold tracking-tight ` +
                (darkMode ? 'text-blue-300' : 'text-blue-700')
            }>Persona AI</h1>
            {/* Modern Toggle Switch */}
            <button
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle theme"
                className="relative w-16 h-8 focus:outline-none"
            >
                <span className="absolute left-0 top-0 w-full h-full flex items-center px-2">
                    <span className={`transition-colors duration-200 text-lg ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`}>{darkMode ? '🌙' : '☀️'}</span>
                </span>
                <span
                    className={
                        `block w-full h-full rounded-full transition-colors duration-300 ` +
                        (darkMode ? 'bg-gray-700' : 'bg-gray-300')
                    }
                ></span>
                <span
                    className={
                        `absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transition-transform duration-300 ` +
                        (darkMode ? 'bg-blue-700 translate-x-8' : 'bg-white translate-x-0')
                    }
                ></span>
            </button>
        </header>
    );
}
