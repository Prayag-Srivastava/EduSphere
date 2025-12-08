import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always use light theme
  const getInitialTheme = () => {
    localStorage.setItem('theme', 'light');
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    
    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#1877F2');
    }
  }, [theme]);

  const toggleTheme = () => {
    // Dark mode disabled - always light
    setTheme('light');
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('light'); // Always light

  return (
    <ThemeContext.Provider value={{ 
      theme: 'light', 
      toggleTheme, 
      setLightTheme, 
      setDarkTheme,
      isDark: false,
      isLight: true
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;