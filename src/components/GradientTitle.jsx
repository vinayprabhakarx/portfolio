import styled, { keyframes } from "styled-components";

// CSS keyframes for animating the background gradient position,
// creating a continuous shimmering effect across the text.
const gradientAnimation = keyframes`
  0% { background-position: 0 50%; }   
  50% { background-position: 100% 50%; } 
  100% { background-position: 0 50%; } 
`;

// Reusable animated heading component.
// Uses webkit background clipping to fill the text with a moving primary gradient.
const GradientTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  }
`;

export default GradientTitle;
