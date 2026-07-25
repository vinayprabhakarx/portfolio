import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.js";

// Main ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    // If the user previously changed and saved a theme, use it
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Otherwise, detect system default theme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return false;
    }

    // Default to dark mode for all other cases
    return true;
  });

  const [colorScheme, setColorScheme] = useState(() => {
    return localStorage.getItem("colorScheme") || "orange";
  });

  // Update document attribute on theme change
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // Update document attribute on color scheme change (optional, for CSS vars if needed)
  useEffect(() => {
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }, [colorScheme]);

  // Listen for system theme changes if user hasn't explicitly set a preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
    localStorage.setItem("colorScheme", scheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colorScheme, changeColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
