import { useState } from "react";

export default function Message({ message, personaImages }) {
  const [imageError, setImageError] = useState(false);
  const isUser = message.role === "user";
  const isError = message.isError;

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPersonaImage = () => {
    if (isUser || !message.persona || imageError) return null;
    return personaImages[message.persona];
  };

  const handleImageError = () => setImageError(true);

  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mr-3 flex-shrink-0">
          {getPersonaImage() ? (
            <img
              src={getPersonaImage()}
              alt={`${message.persona} avatar`}
              className="w-10 h-10 rounded-full object-cover shadow"
              onError={handleImageError}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              {message.persona ? message.persona[0].toUpperCase() : 'A'}
            </div>
          )}
        </div>
      )}

      <div className={`max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-2 rounded-2xl shadow ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-100 text-gray-900'}`}>
          {!isUser && (
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-semibold text-sm">{message.persona || 'Assistant'}</span>
              <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
            </div>
          )}

          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>

          {isError && (
            <div className="mt-2 text-xs text-red-500 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" stroke="#fff" strokeWidth="1.5" />
                <line x1="9" y1="9" x2="15" y2="15" stroke="#fff" strokeWidth="1.5" />
              </svg>
              Error sending message
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="ml-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700">
            You
          </div>
        </div>
      )}
    </div>
  );
}