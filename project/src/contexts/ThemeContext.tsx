import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? JSON.parse(saved) : prefersDark;
  });

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('nav');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#111827'; // dark:bg-gray-900
      if (header) {
        header.classList.remove('bg-white', 'shadow-md');
        header.classList.add('bg-gray-800', 'border-gray-700');
      }
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb'; // bg-gray-50
      if (header) {
        header.classList.add('bg-white', 'shadow-md');
        header.classList.remove('bg-gray-800', 'border-gray-700');
      }
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isDarkMode ? '#111827' : '#ffffff';
      document.head.appendChild(meta);
    } else {
      metaThemeColor.setAttribute('content', isDarkMode ? '#111827' : '#ffffff');
    }

    // Apply transition classes to body
    document.body.classList.add('transition-colors', 'duration-200');
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('darkMode');
      if (!saved) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};