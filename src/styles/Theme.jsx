import { typography } from "./Typography";

// ---------- Shared Base Tokens ----------
const baseColors = {
  error: "#DC3545",
  success: "#28A745",
  warning: "#FFA500",
  white: "#FFFFFF",
};

// Primary glow based on theme (overridden in theme generator)
const baseShadows = {
  light: "0 0.0625rem 0.1875rem #00000012",
  small: "0 0.0625rem 0.125rem #0000001A",
  medium: "0 0.25rem 0.5rem #00000030",
  large: "0 0.625rem 1.25rem #00000040",
  scrolled: "0 0.125rem 0.625rem #00000020",
  scrolledDark: "0 0.125rem 0.625rem rgba(0, 0, 0, 0.7)",
  errorGlow: "0 0.625rem 1.25rem rgba(220, 53, 69, 0.4)",
  primaryGlow: "0 0.25rem 0.9375rem rgba(231, 76, 60, 0.4)",
};

const darkShadows = {
  ...baseShadows,
  errorGlow: "0 0.625rem 1.25rem rgba(239, 68, 68, 0.5)",
  primaryGlow: "0 0.25rem 0.9375rem rgba(255, 107, 107, 0.4)",
};

const baseGradients = {
  primary: "linear-gradient(120deg, #E74C3C 0%, #F39C12 100%)",
  primaryTransparent: "linear-gradient(120deg, #E74C3C33, #F39C1233)",
  primaryHover: "linear-gradient(120deg, #C0392B 0%, #E74C3C 100%)",
  error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
};

const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
};

const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

const borderRadius = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999rem",
};

const borders = {
  thin: "0.0625rem solid",
};

const transitions = {
  default: "0.2s ease-in-out",
  fast: "0.1s ease-in-out",
  slow: "0.3s ease-in-out",
  smooth: "0.4s ease-in-out",
  spring: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const layout = {
  containerMaxWidth: "75rem",
  sectionPadding: "clamp(2rem, 5vw, 4rem)",
  navbarHeight: "4rem",
};

// ---------- Light Theme Colors ----------
const lightColors = {
  primary: "#E74C3C",
  primaryDark: "#C0392B",
  secondary: "#F1C40F",
  background: "#FAF8F7",
  surface: "#FDF9F8",
  text: "#322D2B",
  textSecondary: "#78696E",
  inputBackground: "#F9F5F4",
  border: "#C8B9BE",
  toastBackground: "#FFF5F3",
  toastBorder: "#E8D5D0",
  toastText: "#322D2B",
  toastProgressBar: "rgba(231, 76, 60, 0.3)",
  disabled: "#D0C4C8",
  sunIcon: "#F5BF41",
  ...baseColors,
};

// ---------- Dark Theme Colors ----------
const darkColors = {
  primary: "#FF6B6B",
  primaryDark: "#E74C3C",
  secondary: "#FFEAA7",
  background: "#1E1E1E",
  surface: "#252526",
  text: "#D4D4D4",
  textSecondary: "#9E9E9E",
  inputBackground: "#3C3C3C",
  border: "#555558",
  toastBackground: "#252526",
  toastBorder: "#555558",
  toastText: "#D4D4D4",
  toastProgressBar: "rgba(255, 107, 107, 0.4)",
  disabled: "#5A5A5A",
  sunIcon: "#F5BF41",
  ...baseColors,
};

// ---------- Base Theme ----------
const baseTheme = {
  spacing,
  typography,
  lineHeights,
  borderRadius,
  transitions,
  breakpoints,
  layout,
  gradients: baseGradients,
  borders,
};

// ---------- Theme Generator ----------
export const Theme = (isDarkMode = false) => ({
  ...baseTheme,
  isDark: isDarkMode,
  colors: isDarkMode ? darkColors : lightColors,
  shadows: isDarkMode ? darkShadows : baseShadows,
});

export default Theme;
