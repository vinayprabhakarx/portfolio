import { createGlobalStyle } from "styled-components";
import { typography } from "./Typography";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    transition: background-color ${({ theme }) => theme.transitions.slow}, color ${({ theme }) => theme.transitions.slow}, border-color ${({ theme }) => theme.transitions.slow}, box-shadow ${({ theme }) => theme.transitions.slow};
  }

  html {
    font-size: 1rem; /* Dynamically scaled by JS in AppLayout for 4K support */
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "liga" 0;
    font-variation-settings: "wght" ${typography.fontWeights.regular};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${typography.lineHeights.base};
    font-size: ${typography.fontSizes.base};
    letter-spacing: -0.01em;
    transition: background ${({ theme }) => theme.transitions.slow}, color ${({ theme }) => theme.transitions.slow};
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: ${({ theme }) => theme.typography.codeFontFamily};
  }

  /* React Toastify Custom Styles */
  .Toastify__toast {
    font-family: ${typography.fontFamily};
    border-radius: 0.75rem;
    background: ${({ theme }) => theme.colors.toastBackground} !important;
    border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.toastBorder};
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  .Toastify__toast--success {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  .Toastify__toast--error {
    box-shadow: ${({ theme }) => theme.shadows.errorGlow};
  }

  .Toastify__toast-body {
    color: ${({ theme }) => theme.colors.toastText};
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .Toastify__progress-bar--success {
    background: ${({ theme }) => theme.colors.toastProgressBar};
  }

  .Toastify__progress-bar--error {
    background: ${({ theme }) => theme.colors.toastProgressBar};
  }

  .Toastify__close-button {
    color: ${({ theme }) => theme.colors.toastText};
    opacity: 0.8;
  }

  .Toastify__close-button:hover {
    opacity: 1;
  }

  .Toastify__toast-icon svg {
    fill: ${({ theme }) => theme.colors.success};
  }

  .Toastify__toast--error .Toastify__toast-icon svg {
    fill: ${({ theme }) => theme.colors.error};
  }
`;

export default GlobalStyle;
