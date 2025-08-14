export default function LoadingIndicator({ persona }) {
  const initial = persona ? persona[0].toUpperCase() : 'A';
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-100">
        {initial}
      </div>
      <div>
        <div className="text-sm text-gray-700 dark:text-gray-200">{persona || 'Assistant'} is typing</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '.15s' }} />
          <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '.3s' }} />
        </div>
      </div>
    </div>
  );
}