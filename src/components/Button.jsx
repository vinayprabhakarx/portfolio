import styled from "styled-components";
import { motion } from "framer-motion";
import { activeTabTransition } from "../utils/motion";

// Container component for arranging tab-style buttons in a horizontal, wrapping row.
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

// Base styled motion button utilized for interactions and navigations.
// Adapts its visual appearance based on the `$active` state.
const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ $size, theme }) => ($size === "large" ? `calc(${theme.spacing.md} + 0.0625rem) calc(${theme.spacing.xl} + 0.0625rem)` : `calc(${theme.spacing.sm} + 0.0625rem) calc(${theme.spacing.lg} + 0.0625rem)`)};
  font-size: ${({ $size, theme }) => ($size === "large" ? theme.typography.fontSizes.lg : theme.typography.fontSizes.base)};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $active = true, $hasLayoutId, theme }) =>
    $active ? ($hasLayoutId ? "transparent" : theme.gradients.primary) : theme.colors.surface};
  color: ${({ $active = true, theme }) =>
    $active ? theme.colors.white : theme.colors.textSecondary};
  border: none;
  box-shadow: ${({ $active = true, theme }) => 
    $active ? "none" : `inset 0 0 0 0.0625rem ${theme.colors.border}`};
  text-decoration: none;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.slow}, border-color ${({ theme }) => theme.transitions.slow}, box-shadow ${({ theme }) => theme.transitions.slow}, transform ${({ theme }) => theme.transitions.default};
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;

  /* Subtle glass effect for inactive buttons */
  ${({ $active }) => !$active && `
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(0.5rem);
  `}

  &:hover {
    color: ${({ $active = true, theme }) =>
      $active ? theme.colors.white : theme.colors.primary};
    box-shadow: ${({ $active = true, theme }) => 
      $active ? "none" : `inset 0 0 0 0.0625rem ${theme.colors.primary}`};
    transform: translateY(-0.125rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ $size, theme }) => ($size === "large" ? `calc(${theme.spacing.sm} + 0.0625rem) calc(${theme.spacing.lg} + 0.0625rem)` : `calc(${theme.spacing.sm} + 0.0625rem) calc(${theme.spacing.md} + 0.0625rem)`)};
    font-size: ${({ $size, theme }) => ($size === "large" ? theme.typography.fontSizes.base : theme.typography.fontSizes.sm)};
  }
  
  &:active {
    transform: translateY(-0.0625rem);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ActivePill = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${({ theme }) => theme.gradients.primary};
  z-index: 0;
  box-shadow: ${({ theme }) => theme.shadows.primaryGlow};
`;

const ButtonContent = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Primary Button component integrating Framer Motion capabilities.
// Wraps the StyledButton and passes through children and interaction props.
const Button = ({ children, $active = true, layoutId, ...props }) => {
  return (
    <StyledButton $active={$active} $hasLayoutId={!!layoutId} {...props}>
      {$active && layoutId && (
        <ActivePill
          layoutId={layoutId}
          transition={activeTabTransition}
        />
      )}
      <ButtonContent>{children}</ButtonContent>
    </StyledButton>
  );
};

Button.TabContainer = TabContainer;
export default Button;
