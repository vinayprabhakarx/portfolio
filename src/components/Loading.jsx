import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SimpleSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.25rem solid ${({ theme }) => theme.colors.primary}40;
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Full-screen loading overlay component.
// Utilizes a simple CSS spinning border animation. Rendered during Suspense boundaries.
const Loading = () => (
  <LoadingContainer role="status" aria-live="polite" aria-label="Loading content">
    <SimpleSpinner />
  </LoadingContainer>
);

export default Loading;
