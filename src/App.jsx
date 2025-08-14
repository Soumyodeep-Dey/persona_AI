import { useState } from "react";
import { getPersonaResponse } from "./api/openai";
import Footer from "./components/footer";
import Header from "./components/header";

const personaImages = {
  hitesh: "/images/hitesh.png",
  piyush: "/images/piyush.png",
};

export default function App() {
  const [persona, setPersona] = useState("hitesh");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const botReply = await getPersonaResponse(persona, input, messages);
    setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    setLoading(false);
  };

  return (
    <div className={
      `min-h-screen flex flex-col justify-between font-sans ` +
      (darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900')
    }>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto p-6">
          {/* Card Layout */}
          <div className={
            `rounded-2xl shadow-xl border p-8 mb-8 ` +
            (darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100')
          }>
            {/* Persona Image & Switch */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={personaImages[persona]}
                alt={persona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg"}
                className={
                  `w-28 h-28 rounded-full border-4 shadow-lg mb-3 object-cover transition-all duration-300 ` +
                  (darkMode ? 'border-blue-900' : 'border-blue-200')
                }
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setPersona("hitesh")}
                  className={`px-5 py-2 rounded-full font-semibold shadow transition-all duration-200 ` +
                    (persona === "hitesh"
                      ? (darkMode ? "bg-blue-700 text-white scale-105" : "bg-blue-600 text-white scale-105")
                      : (darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-700"))}
                >
                  Hitesh Choudhary
                </button>
                <button
                  onClick={() => setPersona("piyush")}
                  className={`px-5 py-2 rounded-full font-semibold shadow transition-all duration-200 ` +
                    (persona === "piyush"
                      ? (darkMode ? "bg-green-700 text-white scale-105" : "bg-green-600 text-white scale-105")
                      : (darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-700"))}
                >
                  Piyush Garg
                </button>
              </div>
            </div>

            {/* Chat Window */}
            <div className={
              `p-4 h-96 overflow-y-auto border rounded-xl mb-6 shadow-inner ` +
              (darkMode
                ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border-gray-700'
                : 'bg-gradient-to-br from-blue-100 via-white to-green-100 border-gray-200')
            }>
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-3xl mb-2">💬</span>
                  <span>Start a conversation with your favorite creator persona!</span>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow ` +
                      (msg.role === "user"
                        ? (darkMode ? "bg-blue-700 text-white" : "bg-blue-500 text-white")
                        : (darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-800"))}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <p className="text-sm text-gray-500">Typing...</p>}
            </div>

            {/* Input Box */}
            <div className="flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={
                  `flex-1 border p-3 rounded-xl shadow focus:outline-none focus:ring-2 ` +
                  (darkMode
                    ? 'border-gray-700 bg-gray-900 text-gray-100 focus:ring-blue-900'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-300')
                }
                placeholder={`Talk to ${persona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg"}...`}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              />
              <button
                onClick={sendMessage}
                className={
                  `px-6 py-3 rounded-xl font-bold shadow disabled:opacity-50 transition-all duration-200 ` +
                  (darkMode
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white')
                }
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
