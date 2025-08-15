import { useState, useEffect } from "react";
import { getPersonaResponse } from "./api/openai";
import Footer from "./components/footer";
import Header from "./components/header";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import PersonaSelector from "./components/PersonaSelector";

const personaImages = {
  hitesh: "/images/hitesh.png",
  piyush: "/images/piyush.png",
};

export default function App() {
  const [persona, setPersona] = useState("hitesh");
  // chats is a mapping of persona -> messages[]; persisted to localStorage
  const [chats, setChats] = useState(() => {
    try {
      const raw = localStorage.getItem("persona_chats");
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return { hitesh: [], piyush: [] };
  });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    if (darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // persist chats whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("persona_chats", JSON.stringify(chats));
    } catch {
      // ignore
    }
  }, [chats]);

  // sync visible messages when persona or chats change
  useEffect(() => {
    setMessages(chats[persona] || []);
  }, [persona, chats]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input, timestamp: new Date().toISOString(), id: Date.now() + Math.random() };

    // optimistic update: add user's message to current persona chat
    const current = chats[persona] || [];
    const afterUser = [...current, userMsg];
    setChats((prev) => ({ ...prev, [persona]: afterUser }));
    setInput("");
    setLoading(true);

    try {
      // pass the updated chat (including the new user message) to the persona response
      const botReply = await getPersonaResponse(persona, input, afterUser);
      const assistantMsg = {
        role: "assistant",
        content: botReply,
        timestamp: new Date().toISOString(),
        id: Date.now() + Math.random(),
        persona
      };

      const afterAssistant = [...afterUser, assistantMsg];
      setChats((prev) => ({ ...prev, [persona]: afterAssistant }));
    } catch {
      const errorMsg = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
        id: Date.now() + Math.random(),
        isError: true
      };
      const afterError = [...afterUser, errorMsg];
      setChats((prev) => ({ ...prev, [persona]: afterError }));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setChats((prev) => ({ ...prev, [persona]: [] }));
    setMessages([]);
  };

  return (
    <div className={"min-h-screen flex flex-col " + (darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900')}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onClearChat={clearChat}
        messageCount={messages.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <aside className="md:col-span-2">
            <PersonaSelector
              persona={persona}
              setPersona={setPersona}
              personaImages={personaImages}
              disabled={loading}
            />
          </aside>

          <section className="md:col-span-4">
            <div className={"bg-white dark:bg-gray-800 rounded-2xl shadow p-8 flex flex-col min-h-0 h-full"}>
              <div className="flex-1 overflow-hidden min-h-0">
                <MessageList
                  messages={messages}
                  personaImages={personaImages}
                  loading={loading}
                />
              </div>

              <div className="mt-4">
                <MessageInput
                  input={input}
                  setInput={setInput}
                  onSend={sendMessage}
                  loading={loading}
                  placeholder={`Chat with ${persona}...`}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
