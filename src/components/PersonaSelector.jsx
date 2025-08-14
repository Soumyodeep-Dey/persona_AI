import { useState } from "react";

export default function PersonaSelector({ persona, setPersona, personaImages, disabled }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const personas = [
    { id: 'hitesh', name: 'Hitesh Choudhary', description: 'Technical educator — practical, motivating', color: '#4F46E5' },
    { id: 'piyush', name: 'Piyush Garg', description: 'Witty & concise software engineer', color: '#059669' }
  ];

  const current = personas.find(p => p.id === persona) || personas[0];

  const select = (id) => {
    if (!disabled) {
      setPersona(id);
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow sm:sticky sm:top-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
          {personaImages[persona] ? (
            <img src={personaImages[persona]} alt={`${current.name} avatar`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200">{current.name[0]}</div>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{current.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{current.description}</div>
        </div>
      </div>

      <div>
        <button
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md border ${isExpanded ? 'border-blue-300' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900`}
          onClick={() => !disabled && setIsExpanded(s => !s)}
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
          disabled={disabled}
        >
          <span className="text-sm text-gray-700 dark:text-gray-200">{current.name}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isExpanded && (
          <div role="listbox" className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm overflow-hidden">
            {personas.map(p => (
              <button
                key={p.id}
                role="option"
                aria-selected={p.id === persona}
                onClick={() => select(p.id)}
                className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${p.id === persona ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  {personaImages[p.id] ? (
                    <img src={personaImages[p.id]} alt={`${p.name} avatar`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200">{p.name[0]}</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{p.description}</div>
                </div>
                {p.id === persona && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}