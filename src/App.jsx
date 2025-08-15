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
  const MESSAGE_LIMIT = 5; // Set your desired limit here
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
  const [limitReached, setLimitReached] = useState(false);

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
    if (!input.trim() || limitReached) return;
    // Count only user messages for the limit
    const userMessagesCount = (chats[persona] || []).filter(m => m.role === "user").length;
    if (userMessagesCount >= MESSAGE_LIMIT) {
      setLimitReached(true);
      return;
    }
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
    setLimitReached(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-light dark:bg-gradient-dark transition-colors duration-500">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onClearChat={clearChat}
        messageCount={messages.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <aside className="md:col-span-2">
            <PersonaSelector
              persona={persona}
              setPersona={setPersona}
              personaImages={personaImages}
              disabled={loading}
            />
          </aside>

          <section className="md:col-span-4">
            <div className="bg-surface dark:bg-dark-400 rounded-3xl shadow-xl border border-border dark:border-dark-350 p-8 flex flex-col min-h-0 h-full transition-colors duration-500 animate-fadeInLeft">
              <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                <MessageList
                  messages={messages}
                  personaImages={personaImages}
                  loading={loading}
                />
              </div>

              <div className="mt-6">
                {limitReached && (
                  <div className="mb-4 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl p-3">
                    Message limit reached! Please clear the chat to continue.
                  </div>
                )}
                <MessageInput
                  input={input}
                  setInput={setInput}
                  onSend={sendMessage}
                  loading={loading || limitReached}
                  placeholder={limitReached ? "Message limit reached" : `Chat with ${persona}...`}
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
