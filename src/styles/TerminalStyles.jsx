import styled, { keyframes } from "styled-components";

const blink = keyframes`
  50% { opacity: 0; }
`;

export const TerminalColumn = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  width: 100%;
  max-width: 55rem;
`;

export const TerminalShell = styled.div`
  width: 100%;
  min-width: 0;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.large};
  overflow: hidden;
  font-family: 'Ubuntu Mono', 'JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', monospace;
  outline: none;
`;

export const TerminalBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => `${theme.colors.text}0D`};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => `${theme.colors.border}80`};
`;

export const TerminalTitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.8;
  user-select: none;
`;

export const TerminalBody = styled.div`
  height: clamp(20rem, 52vh, 30rem);
  padding: clamp(1.2rem, 2.5vw, ${({ theme }) => theme.spacing.xl});
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  cursor: text;
  overflow-wrap: anywhere;
  user-select: text;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.colors.text}1A`};
    border-radius: 0.25rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => `${theme.colors.text}33`};
  }
`;

export const TerminalLine = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TerminalPre = styled.pre`
  margin: 0;
  color: inherit;
  font: inherit;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  user-select: text;
`;

export const InputLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: pre-wrap;
`;

export const HiddenTerminalInput = styled.textarea`
  position: absolute;
  left: 0;
  top: 0;
  width: 0.0625rem;
  height: 0.0625rem;
  opacity: 0;
  border: none;
  padding: 0;
  margin: 0;
  pointer-events: none;
  resize: none;
`;

export const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

export const Path = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

export const KeyText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

export const StringText = styled.span`
  color: ${({ theme }) => theme.colors.success};
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

export const TerminalLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  text-underline-offset: 0.16em;
`;

export const CurrentInput = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const Cursor = styled.span`
  display: inline-block;
  width: 1ch;
  height: 1.2em;
  line-height: 1.2em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  animation: ${blink} 1s step-end infinite;
  white-space: pre;
  vertical-align: text-bottom;
  text-align: center;
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const FastFetch = styled.div`
  display: flex;
  align-items: flex-start;

  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: nowrap;
  overflow-x: auto;
  min-width: 0;
`;

export const FastFetchLogo = styled.pre`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Ubuntu Mono', 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.15;
  white-space: pre;
  overflow-x: auto;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const FastFetchInfo = styled.div`
  min-width: 0;
  flex: 1 1 10rem;
`;

export const FastFetchHeader = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const FastFetchSep = styled.div`
  color: ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const WhoamiPhoto = styled.img`
  display: block;
  width: 4.5rem;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: thin solid ${({ theme }) => theme.colors.border};
`;

export const TerminalHint = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.codeFontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  text-align: center;

  code {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.gradients.primaryTransparent};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    padding: 0 ${({ theme }) => theme.spacing.xs};
  }
`;
