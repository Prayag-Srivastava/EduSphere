import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Always default to light - no dark mode
    localStorage.setItem("theme", "light");
    return "light";
  });

  useEffect(() => {
    // Always remove dark mode class
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
