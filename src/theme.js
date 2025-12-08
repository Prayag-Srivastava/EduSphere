export const toggleTheme = () => {
  // Dark mode disabled - always use light theme
  localStorage.setItem("theme", "light");
};

export const loadTheme = () => {
  // Always use light theme - remove dark class
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
};
