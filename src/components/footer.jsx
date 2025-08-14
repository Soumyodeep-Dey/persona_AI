// src/components/Footer.jsx
export default function Footer() {
    return (
        <footer className="mt-10 py-6 border-t text-center text-sm text-gray-500">
            <p>
                Built with ❤️ by{" "}
                <a
                    href="https://soumyodeep-dey.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Soumyodeep Dey
                </a>
            </p>
            <p className="mt-1">
                © {new Date().getFullYear()} Persona AI | Powered by React, Tailwind CSS & OpenAI
            </p>
        </footer>
    );
}
