import { memo, forwardRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// ─── Styled Components ───

const CardContainer = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  width: 100%;
  max-width: min(100%, 28rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);



  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-4px) !important;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const StyledCardImage = styled.img.attrs({ loading: "lazy", decoding: "async" })`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const CardImage = memo(({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <ImageWrapper>
      <StyledCardImage
        src={src}
        alt={alt}
        $loaded={loaded}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </ImageWrapper>
  );
});

const CardImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes["5xl"]};
  background: ${({ theme }) => theme.colors.background};
  transition: color 0.4s ease-in-out;

  ${CardContainer}:hover & {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CardImagePlaceholderWrapper = memo(({ children, ...props }) => (
  <ImageWrapper>
    <CardImagePlaceholder {...props}>
      {children}
    </CardImagePlaceholder>
  </ImageWrapper>
));

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  margin: 0 auto;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin-top: clamp(1.5rem, 4vw, 3rem);
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-align: center;
  transition: color 0.4s ease-in-out;

  ${CardContainer}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  text-align: center;
`;

const HighlightsList = styled.div`
  margin: ${({ theme }) => theme.spacing.xs} 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: left;
`;

const HighlightItem = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto; /* Push tags to bottom if flex column */
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  background: ${({ theme }) =>
    theme.isDark
      ? "rgba(255, 255, 255, 0.03)"
      : "rgba(0, 0, 0, 0.03)"};
  border: 1px solid ${({ theme }) =>
    theme.isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.isDark
        ? "rgba(255, 107, 107, 0.12)"
        : "linear-gradient(120deg, rgba(231, 76, 60, 0.08), rgba(243, 156, 18, 0.08))"};
    border-color: ${({ theme }) =>
      theme.isDark
        ? "rgba(255, 107, 107, 0.25)"
        : "rgba(231, 76, 60, 0.15)"};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const WorkPeriod = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.gradients.primaryTransparent};
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: -1;
`;

// ─── Main Card Component ───
// Reusable layout component representing a distinct entity (project, experience, etc.).
// Designed as a flexible grid item utilizing compound components (e.g. Card.Title, Card.Image).

const Card = memo(
  forwardRef(({ children, ...props }, ref) => (
    <CardContainer ref={ref} {...props}>
      {children}
    </CardContainer>
  ))
);

Card.displayName = "Card";

// ─── Subcomponents ───
// Compound components attached to the main Card object for semantic structure.

Card.Grid = memo(CardGrid);
Card.Grid.displayName = "Card.Grid";

Card.Title = memo(CardTitle);
Card.Title.displayName = "Card.Title";

Card.Description = memo(CardDescription);
Card.Description.displayName = "Card.Description";

Card.HighlightsList = memo(HighlightsList);
Card.HighlightsList.displayName = "Card.HighlightsList";

Card.HighlightItem = memo(HighlightItem);
Card.HighlightItem.displayName = "Card.HighlightItem";

Card.TagContainer = memo(TagContainer);
Card.TagContainer.displayName = "Card.TagContainer";

Card.Tag = memo(Tag);
Card.Tag.displayName = "Card.Tag";

Card.WorkPeriod = memo(WorkPeriod);
Card.WorkPeriod.displayName = "Card.WorkPeriod";

Card.GradientBackground = memo(GradientBackground);
Card.GradientBackground.displayName = "Card.GradientBackground";

Card.Image = CardImage;
Card.Image.displayName = "Card.Image";

Card.ImagePlaceholder = CardImagePlaceholderWrapper;
Card.ImagePlaceholder.displayName = "Card.ImagePlaceholder";

export default Card;
