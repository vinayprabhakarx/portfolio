import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  gradientAnimation,
  waveAnimation,
} from "./animations";

// Scroll bounce keyframe
const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.4; }
`;

// Orb float keyframe
const orbFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.97); }
`;

// Wrapper for the main content within Hero section
export const ContentWrapper = styled.section`
  max-width: min(100%, 120rem);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(2rem, 5vw, 4rem);
  padding: clamp(2rem, 5vh, 4rem) clamp(1.5rem, 5vw, 4rem);
  min-height: calc(100vh - ${({ theme }) => theme.layout.navbarHeight});
  position: relative;
  overflow: hidden;
`;

// Wrapper for the entire Hero section
export const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vh, 5rem) 0;
  position: relative;
  overflow: hidden;
`;


// Subtle gradient orb behind the left text
export const GlowOrb = styled.div`
  position: absolute;
  top: clamp(5%, 10vh, 10%);
  left: clamp(-10%, -5vw, -5%);
  width: clamp(18.75rem, 40vw, 31.25rem);
  height: clamp(18.75rem, 40vw, 31.25rem);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primary}18 0%,
    ${({ theme }) => theme.colors.secondary}08 50%,
    transparent 70%
  );
  filter: blur(40px);
  animation: ${orbFloat} 12s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

// Left section of the Hero content, animated with Framer Motion
export const LeftSection = styled(motion.div)`
  flex: 1 1 30rem;
  z-index: 1;
  padding: 0 clamp(1rem, 3vw, 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: center;
    text-align: center;
  }
`;

export const WelcomeText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: -0.01em;
  user-select: none;
`;

// Animated gradient name styling
export const GradientName = styled.h1`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeights.extrabold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: -0.02em;
  line-height: 1.1;
  user-select: none;
`;

// Container for typewriter effect text
export const TypewriterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  min-height: 1.5em;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

// Description paragraph styling
export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  max-width: min(100%, 36rem);
  opacity: 0.9;
  user-select: none;
`;

// Row for CTA buttons side by side
export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

// Social icons row
export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

export const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  background: transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'};
    box-shadow: 0 4px 12px ${({ theme }) => theme.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};
    transform: translateY(-2px);
  }
`;

export const RightSection = styled(motion.div)`
  flex: 1.2 1 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  z-index: 1;
`;

// Scroll indicator container at the bottom-center
export const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

// Animated scroll dot
export const ScrollDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${scrollBounce} 1.6s ease-in-out infinite;
  opacity: 0.7;
`;

// Waving hand emoji styling
export const Wave = styled.span`
  display: inline-block;
  animation: ${waveAnimation} 2.5s infinite;
  transform-origin: 70% 70%;
`;
