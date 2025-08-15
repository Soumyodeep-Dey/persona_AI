import { useState } from "react";
import { getPersonaSocialLinks, formatSocialLinks } from "../data/personas";

export default function PersonaSelector({ persona, setPersona, personaImages, disabled }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const personas = [
    { id: 'hitesh', name: 'Hitesh Choudhary', description: 'Technical educator — practical, motivating', color: '#4F46E5' },
    { id: 'piyush', name: 'Piyush Garg', description: 'Witty & concise software engineer', color: '#059669' }
  ];

  const current = personas.find(p => p.id === persona) || personas[0];

  // Prepare social links for the current persona (if available)
  const socials = formatSocialLinks(getPersonaSocialLinks(current.id));

  const platformIcon = (platform) => {
    const p = platform.toLowerCase();
    switch (p) {
      case 'twitter':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M22 5.92c-.64.28-1.33.47-2.05.56.74-.44 1.3-1.13 1.56-1.96-.7.41-1.48.71-2.31.87A3.6 3.6 0 0016.5 4c-1.98 0-3.59 1.6-3.59 3.58 0 .28.03.55.09.81-2.99-.15-5.64-1.58-7.42-3.76-.31.54-.49 1.17-.49 1.84 0 1.27.65 2.39 1.64 3.05-.6-.02-1.17-.18-1.67-.46v.05c0 1.77 1.26 3.24 2.94 3.58-.31.08-.64.12-.98.12-.24 0-.47-.02-.7-.06.47 1.47 1.83 2.54 3.44 2.57A7.22 7.22 0 012 19.54 10.2 10.2 0 008.29 21c6.35 0 9.84-5.26 9.84-9.84v-.45c.67-.48 1.25-1.08 1.72-1.76-.61.27-1.25.46-1.92.54z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5s.88 2 1.98 2A1.99 1.99 0 006 5.5c0-1.1-.88-2-1.02-2zM3 8.98h4v11.02H3zM9 8.98h3.84v1.5h.05c.54-1 1.86-2.05 3.82-2.05C20.9 8.43 21 10.3 21 13.06V20H17v-6.2c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.34V20H9z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M10 15l5.19-3L10 9v6zm12-3.5s-.12-2.03-.48-2.92c-.29-.76-.93-1.37-1.69-1.66C18.03 6.5 12 6.5 12 6.5s-6.03 0-7.83.42c-.76.29-1.4.9-1.69 1.66C2.12 9.47 2 11.5 2 11.5s.12 2.03.48 2.92c.29.76.93 1.37 1.69 1.66C5.97 16.5 12 16.5 12 16.5s6.03 0 7.83-.42c.76-.29 1.4-.9 1.69-1.66.36-.89.48-2.92.48-2.92z" />
          </svg>
        );
      case 'github':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.04 11.04 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.8 1.19 1.83 1.19 3.09 0 4.43-2.71 5.4-5.29 5.69.42.36.8 1.07.8 2.15 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        );
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  const select = (id) => {
    if (!disabled) {
      setPersona(id);
      setIsExpanded(false);
    }
  };

  return (
    <div className="w-full md:w-72 lg:w-80 bg-gradient-to-br from-primary-50 via-surface to-primary-100 dark:from-background-dark dark:via-surface-dark dark:to-primary-900 rounded-2xl shadow-xl p-5 sm:sticky sm:top-6 border border-border dark:border-border-dark transition-colors duration-300 animate-fadeInLeft">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-primary-200 dark:border-primary-700 bg-white dark:bg-background-dark">
          {personaImages[persona] ? (
            <img src={personaImages[persona]} alt={`${current.name} avatar`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-lg font-semibold text-gray-700 dark:text-gray-200">{current.name[0]}</div>
          )}
        </div>
        <div>
          <div className="text-base font-bold text-primary-700 dark:text-primary-200">{current.name}</div>
          <div className="text-xs text-muted dark:text-muted-dark">{current.description}</div>
          {socials && socials.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {socials.map(s => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-primary-700 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-300 px-2 py-1 rounded-lg bg-gradient-to-r from-surface via-primary-50 to-surface dark:from-surface-dark dark:via-primary-900 dark:to-surface-dark border border-primary-100 dark:border-primary-800 shadow-sm transition-colors"
                  title={`${current.name} on ${s.platform}`}
                >
                  <span className="w-4 h-4 text-current">{platformIcon(s.platform)}</span>
                  <span className="font-medium">{s.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          className={`w-full flex items-center justify-between px-4 py-2 rounded-xl border-2 ${isExpanded ? 'border-primary-400 dark:border-primary-700' : 'border-border dark:border-border-dark'} bg-gradient-to-r from-surface via-primary-50 to-surface dark:from-surface-dark dark:via-primary-900 dark:to-surface-dark shadow focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 transition-all duration-200 font-semibold text-primary-700 dark:text-primary-200`}
          onClick={() => !disabled && setIsExpanded(s => !s)}
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
          disabled={disabled}
          aria-label="Select persona"
        >
          <span className="text-sm">{current.name}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isExpanded && (
          <div role="listbox" className="mt-2 bg-gradient-to-br from-surface via-primary-50 to-surface dark:from-surface-dark dark:via-primary-900 dark:to-surface-dark border-2 border-primary-100 dark:border-primary-800 rounded-xl shadow-lg overflow-hidden animate-fadeInLeft">
            {personas.map(p => (
              <button
                key={p.id}
                role="option"
                aria-selected={p.id === persona}
                onClick={() => select(p.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-150 ${p.id === persona ? 'bg-primary-100 dark:bg-primary-800' : ''} rounded-lg`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-200 dark:border-primary-700 bg-white dark:bg-background-dark">
                  {personaImages[p.id] ? (
                    <img src={personaImages[p.id]} alt={`${p.name} avatar`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200">{p.name[0]}</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-primary-700 dark:text-primary-200">{p.name}</div>
                  <div className="text-xs text-muted dark:text-muted-dark">{p.description}</div>
                </div>
                {p.id === persona && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600 dark:text-primary-300">
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