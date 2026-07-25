import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as CustomThemeProvider } from "../contexts/ThemeProvider.jsx";
import { useTheme } from "../hooks/useTheme";
import GlobalStyle from "./GlobalStyles.jsx";
import Theme from "./Theme";

const ThemeProviderWrapper = ({ children }) => {
  const { isDarkMode, colorScheme } = useTheme();
  const themeObject = Theme(isDarkMode, colorScheme);

  return (
    <StyledThemeProvider theme={themeObject}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

const ThemeProvider = ({ children }) => (
  <CustomThemeProvider>
    <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
  </CustomThemeProvider>
);

export default ThemeProvider;
