import styled from "styled-components";

// Container for project category buttons, with flexible layout.
export const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  flex-wrap: wrap;
`;

// Grid layout for displaying project cards.
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(18rem, 25vw, 25rem), 1fr));
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: clamp(1.5rem, 4vw, 3rem);
  grid-auto-rows: 1fr;
`;

export const ProjectCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

// Container for project links (e.g., GitHub, live demo).
export const ProjectLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

// Styling for an individual project link.
export const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

// Memoized version of ProjectsGrid for performance.
export const MemoizedProjectsGrid = styled(ProjectsGrid).withConfig({
  shouldForwardProp: (prop) => !["customProp"].includes(prop),
})``;

// Memoized version of ProjectLink with active and disabled states.
export const MemoizedProjectLink = styled(ProjectLink).withConfig({
  shouldForwardProp: (prop) => !["isActive", "disabled"].includes(prop),
})`
  ${({ isActive, theme }) =>
    isActive &&
    `
    color: ${theme.colors.secondary};
    font-weight: ${theme.typography.fontWeights.semibold};
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  `}
`;

// Section wrapper for projects, ensuring minimum height.
export const ProjectsSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing["4xl"]} 0;
`;

// Styling for an individual project card, with hover effects.
export const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.smooth};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.large};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Responsive grid variant for projects.
export const ResponsiveGrid = styled(ProjectsGrid)`
  grid-template-columns: repeat(auto-fit, minmax(clamp(15rem, 20vw, 20rem), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
`;

// Compact grid variant for projects.
export const CompactGrid = styled(ProjectsGrid)`
  grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

// Animated project card with a fade-in-up effect.
export const AnimatedProjectCard = styled(ProjectCard)`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:nth-child(even) {
    animation-delay: 0.1s;
  }

  &:nth-child(odd) {
    animation-delay: 0.2s;
  }
`;

// Loading card with a shimmer effect.
export const LoadingCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.border}40,
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// Styling for empty state or no projects found message.
export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["4xl"]};
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    max-width: 25rem;
    margin: 0 auto;
    line-height: 1.6;
  }
`;
