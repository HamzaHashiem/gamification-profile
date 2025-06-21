import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, toggleTheme, isThemeLoaded } = useTheme();

  // Don't render anything until client-side hydration is complete
  if (!isThemeLoaded) {
    return null;
  }

  return (
    <div className="theme-switcher">
      <button 
        onClick={toggleTheme}
        className="px-4 py-2 rounded-md"
        style={{ 
          backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
          color: isDarkMode ? '#fff' : '#333',
          border: isDarkMode ? '1px solid #555' : '1px solid #ddd',
        }}
      >
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <p className="mt-2">
        Current theme: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong>
      </p>
    </div>
  );
};

export default ThemeSwitcher;
