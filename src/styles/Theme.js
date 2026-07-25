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
};

const darkShadows = {
  ...baseShadows,
  errorGlow: "0 0.625rem 1.25rem rgba(239, 68, 68, 0.5)",
};

const baseGradients = {
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

// ---------- Color Schemes ----------
export const colorSchemes = {
  orange: {
    name: "Fiery Orange",
    light: {
      primary: "#E74C3C",
      primaryDark: "#C0392B",
      secondary: "#F1C40F",
      gradientPrimary: "#E74C3C",
      gradientSecondary: "#F39C12",
      background: "#FAF8F7",
      surface: "#FDF9F8",
      text: "#322D2B",
      textSecondary: "#78696E",
      inputBackground: "#F9F5F4",
      border: "#C8B9BE",
      toastBackground: "#FFF5F3",
      toastBorder: "#E8D5D0",
      toastText: "#322D2B",
      disabled: "#D0C4C8",
      sunIcon: "#F5BF41",
    },
    dark: {
      primary: "#FF6B6B",
      primaryDark: "#E74C3C",
      secondary: "#FFEAA7",
      gradientPrimary: "#E74C3C",
      gradientSecondary: "#F39C12",
      background: "#1E1E1E",
      surface: "#252526",
      text: "#D4D4D4",
      textSecondary: "#9E9E9E",
      inputBackground: "#3C3C3C",
      border: "#555558",
      toastBackground: "#252526",
      toastBorder: "#555558",
      toastText: "#D4D4D4",
      disabled: "#5A5A5A",
      sunIcon: "#F5BF41",
    }
  },
  blue: {
    name: "Ocean Blue",
    light: {
      primary: "#3B82F6",
      primaryDark: "#2563EB",
      secondary: "#06B6D4",
      background: "#F5F8FA",
      surface: "#F8FAFC",
      text: "#1E293B",
      textSecondary: "#64748B",
      inputBackground: "#F1F5F9",
      border: "#CBD5E1",
      toastBackground: "#F0F9FF",
      toastBorder: "#BAE6FD",
      toastText: "#0F172A",
      disabled: "#CBD5E1",
      sunIcon: "#F5BF41",
    },
    dark: {
      primary: "#60A5FA",
      primaryDark: "#3B82F6",
      secondary: "#22D3EE",
      background: "#0F172A",
      surface: "#1E293B",
      text: "#F8FAFC",
      textSecondary: "#94A3B8",
      inputBackground: "#0F172A",
      border: "#334155",
      toastBackground: "#1E293B",
      toastBorder: "#334155",
      toastText: "#F8FAFC",
      disabled: "#475569",
      sunIcon: "#F5BF41",
    }
  },
  emerald: {
    name: "Emerald Green",
    light: {
      primary: "#10B981",
      primaryDark: "#059669",
      secondary: "#34D399",
      background: "#F6FBF9",
      surface: "#F9FCFB",
      text: "#134E4A",
      textSecondary: "#0F766E",
      inputBackground: "#F0FDF4",
      border: "#99F6E4",
      toastBackground: "#ECFDF5",
      toastBorder: "#A7F3D0",
      toastText: "#064E3B",
      disabled: "#A7F3D0",
      sunIcon: "#F5BF41",
    },
    dark: {
      primary: "#34D399",
      primaryDark: "#10B981",
      secondary: "#6EE7B7",
      background: "#131C18",
      surface: "#1A2621",
      text: "#ECFDF5",
      textSecondary: "#A7F3D0",
      inputBackground: "#131C18",
      border: "#065F46",
      toastBackground: "#1A2621",
      toastBorder: "#065F46",
      toastText: "#ECFDF5",
      disabled: "#064E3B",
      sunIcon: "#F5BF41",
    }
  },
  purple: {
    name: "Royal Purple",
    light: {
      primary: "#8B5CF6",
      primaryDark: "#7C3AED",
      secondary: "#D946EF",
      background: "#FAF5FF",
      surface: "#FCFAFF",
      text: "#4C1D95",
      textSecondary: "#6D28D9",
      inputBackground: "#F3E8FF",
      border: "#DDD6FE",
      toastBackground: "#F5F3FF",
      toastBorder: "#C4B5FD",
      toastText: "#2E1065",
      disabled: "#C4B5FD",
      sunIcon: "#F5BF41",
    },
    dark: {
      primary: "#A78BFA",
      primaryDark: "#8B5CF6",
      secondary: "#F0ABFC",
      background: "#1C1429",
      surface: "#261A38",
      text: "#F5F3FF",
      textSecondary: "#C4B5FD",
      inputBackground: "#1C1429",
      border: "#4C1D95",
      toastBackground: "#261A38",
      toastBorder: "#4C1D95",
      toastText: "#F5F3FF",
      disabled: "#4C1D95",
      sunIcon: "#F5BF41",
    }
  },
  sunset: {
    name: "Golden Sunset",
    light: {
      primary: "#F59E0B",
      primaryDark: "#D97706",
      secondary: "#F43F5E",
      background: "#FFFBEB",
      surface: "#FEF3C7",
      text: "#451A03",
      textSecondary: "#78350F",
      inputBackground: "#FFFBEB",
      border: "#FDE68A",
      toastBackground: "#FFFBEB",
      toastBorder: "#FDE68A",
      toastText: "#451A03",
      disabled: "#FDE68A",
      sunIcon: "#F59E0B",
    },
    dark: {
      primary: "#FBBF24",
      primaryDark: "#F59E0B",
      secondary: "#FB7185",
      background: "#1E110A",
      surface: "#2D1A11",
      text: "#FEF3C7",
      textSecondary: "#FDE68A",
      inputBackground: "#1E110A",
      border: "#451A03",
      toastBackground: "#2D1A11",
      toastBorder: "#451A03",
      toastText: "#FEF3C7",
      disabled: "#451A03",
      sunIcon: "#FBBF24",
    }
  },
  rose: {
    name: "Crimson Rose",
    light: {
      primary: "#E11D48",
      primaryDark: "#BE123C",
      secondary: "#4F46E5",
      background: "#FFF1F2",
      surface: "#FFE4E6",
      text: "#4C0519",
      textSecondary: "#881337",
      inputBackground: "#FFF1F2",
      border: "#FECDD3",
      toastBackground: "#FFF1F2",
      toastBorder: "#FECDD3",
      toastText: "#4C0519",
      disabled: "#FECDD3",
      sunIcon: "#F5BF41",
    },
    dark: {
      primary: "#FB7185",
      primaryDark: "#E11D48",
      secondary: "#818CF8",
      background: "#2A0914",
      surface: "#3F0D1E",
      text: "#FFE4E6",
      textSecondary: "#FECDD3",
      inputBackground: "#2A0914",
      border: "#881337",
      toastBackground: "#3F0D1E",
      toastBorder: "#881337",
      toastText: "#FFE4E6",
      disabled: "#881337",
      sunIcon: "#F5BF41",
    }
  },
  teal: {
    name: "Mint Teal",
    light: {
      primary: "#0D9488",
      primaryDark: "#0F766E",
      secondary: "#3B82F6",
      background: "#F0FDFA",
      surface: "#CCFBF1",
      text: "#134E4A",
      textSecondary: "#115E59",
      inputBackground: "#F0FDFA",
      border: "#99F6E4",
      toastBackground: "#F0FDFA",
      toastBorder: "#99F6E4",
      toastText: "#134E4A",
      disabled: "#99F6E4",
      sunIcon: "#F5BF41",
    },
    dark: {
      primary: "#2DD4BF",
      primaryDark: "#14B8A6",
      secondary: "#60A5FA",
      background: "#042F2E",
      surface: "#134E4A",
      text: "#CCFBF1",
      textSecondary: "#99F6E4",
      inputBackground: "#042F2E",
      border: "#115E59",
      toastBackground: "#134E4A",
      toastBorder: "#115E59",
      toastText: "#CCFBF1",
      disabled: "#115E59",
      sunIcon: "#F5BF41",
    }
  },
  vivid: {
    name: "Vivid Contrast",
    light: {
      primary: "#0000EE",
      primaryDark: "#0000BB",
      secondary: "#0000EE",
      background: "#FFFFFF",
      surface: "#FFFFFF",
      text: "#000000",
      textSecondary: "#000000",
      inputBackground: "#FFFFFF",
      border: "#000000",
      toastBackground: "#FFFFFF",
      toastBorder: "#000000",
      toastText: "#000000",
      disabled: "#767676",
      sunIcon: "#000000",
      activeButtonText: "#FFFFFF",
    },
    dark: {
      primary: "#FFFF00",
      primaryDark: "#CCCC00",
      secondary: "#FFFF00",
      background: "#000000",
      surface: "#000000",
      text: "#FFFFFF",
      textSecondary: "#FFFFFF",
      inputBackground: "#000000",
      border: "#FFFFFF",
      toastBackground: "#000000",
      toastBorder: "#FFFFFF",
      toastText: "#FFFFFF",
      disabled: "#767676",
      sunIcon: "#FFFF00",
      activeButtonText: "#000000",
    }
  }
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
  borders,
};

// ---------- Theme Generator ----------
export const Theme = (isDarkMode = false, schemeName = "orange") => {
  const scheme = colorSchemes[schemeName] || colorSchemes.orange;
  const activeScheme = isDarkMode ? scheme.dark : scheme.light;
  
  const colors = {
    ...activeScheme,
    toastProgressBar: `${activeScheme.primary}66`,
    activeButtonText: activeScheme.activeButtonText || baseColors.white,
    ...baseColors,
  };

  const shadows = {
    ...(isDarkMode ? darkShadows : baseShadows),
    primaryGlow: `0 0.25rem 0.9375rem ${activeScheme.primary}66`,
  };

  const gradients = {
    ...baseGradients,
    primary: `linear-gradient(120deg, ${activeScheme.gradientPrimary || activeScheme.primary} 0%, ${activeScheme.gradientSecondary || activeScheme.secondary} 100%)`,
    primaryTransparent: `linear-gradient(120deg, ${activeScheme.gradientPrimary || activeScheme.primary}33, ${activeScheme.gradientSecondary || activeScheme.secondary}33)`,
    primaryHover: `linear-gradient(120deg, ${activeScheme.primaryDark} 0%, ${activeScheme.gradientPrimary || activeScheme.primary} 100%)`,
  };

  return {
    ...baseTheme,
    isDark: isDarkMode,
    colors,
    shadows,
    gradients,
  };
};

export default Theme;
