import { useState } from "react";

export default function Message({ message, personaImages }) {
  const [imageError, setImageError] = useState(false);
  const [userImageError, setUserImageError] = useState(false);
  const isUser = message.role === "user";
  const isError = message.isError;

  // Path to the public user photo; change this if your image file name is different
  const userImagePath = "/images/me.jpg";

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
              className="w-14 h-14 rounded-full object-cover shadow"
              onError={handleImageError}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-base font-bold text-gray-700 dark:text-gray-200">
              {message.persona ? message.persona[0].toUpperCase() : 'A'}
            </div>
          )}
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-6 py-4 rounded-3xl shadow-xl border ${isUser ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white border-primary-200' : 'bg-gradient-to-br from-surface via-primary-50 to-surface dark:from-dark-400 dark:via-dark-350 dark:to-dark-400 text-text dark:text-dark-950 border-border dark:border-dark-350'} backdrop-blur-md transition-all duration-300`}>
          <div className="flex items-center justify-between mb-2">
            {!isUser && (
              <span className="font-bold text-primary-700 dark:text-primary-200 text-base">{message.persona || 'Assistant'}</span>
            )}
            <span className="text-xs text-muted dark:text-muted-dark ml-2">{formatTime(message.timestamp)}</span>
          </div>

          <div className="whitespace-pre-wrap break-words text-base leading-relaxed">
            {message.content}
          </div>

          {isError && (
            <div className="mt-3 text-xs text-red-500 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
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
          {!userImageError ? (
            <img
              src={userImagePath}
              alt="You"
              className="w-14 h-14 rounded-full object-cover"
              onError={() => setUserImageError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-base font-bold text-blue-700">
              You
            </div>
          )}
        </div>
      )}
    </div>
  );
}