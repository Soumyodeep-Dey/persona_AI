import { useState } from "react";
import { getPersonaResponse } from "./api/openai";

const personaImages = {
  hitesh: "/images/hitesh.png",
  piyush: "/images/piyush.png",
};

export default function App() {
  const [persona, setPersona] = useState("hitesh");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="p-6 max-w-2xl mx-auto font-sans">
      {/* Persona Image */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={personaImages[persona]}
          alt={persona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg"}
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2 object-cover"
        />
        <div className="flex gap-4">
          <button
            onClick={() => setPersona("hitesh")}
            className={`px-4 py-2 rounded ${persona === "hitesh" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Hitesh Choudhary
          </button>
          <button
            onClick={() => setPersona("piyush")}
            className={`px-4 py-2 rounded ${persona === "piyush" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            Piyush Garg
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-gray-50 p-4 h-96 overflow-y-auto border rounded mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <p
              className={`inline-block px-3 py-2 rounded-lg ${msg.role === "user" ? "bg-blue-100" : "bg-gray-200"
                }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Typing...</p>}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder={`Talk to ${persona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg"}...`}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
