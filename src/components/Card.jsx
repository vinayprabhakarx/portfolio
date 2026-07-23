import { memo, forwardRef, useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Code as FaCode } from "lucide-react";

// ─── Styled Components ───

const CardContainer = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.large};
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: box-shadow ${({ theme }) => theme.transitions.slow}, border-color ${({ theme }) => theme.transitions.slow};
  width: 100%;
  max-width: min(100%, 28rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  backdrop-filter: blur(0.625rem);
  -webkit-backdrop-filter: blur(0.625rem);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
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

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ImageSkeleton = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.text}0A 25%, ${theme.colors.text}1A 50%, ${theme.colors.text}0A 75%)`};
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const StyledCardImage = styled.img.attrs({ loading: "lazy", decoding: "async" })`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.smooth};
`;

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
  transition: color ${({ theme }) => theme.transitions.smooth};

  ${CardContainer}:hover & {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CardImage = memo(({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);

    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth !== 0) {
        setLoaded(true);
      } else {
        setError(true);
      }
    }
  }, [src]);

  return (
    <ImageWrapper>
      {!loaded && !error && <ImageSkeleton />}
      {error ? (
        <CardImagePlaceholder>
          <FaCode />
        </CardImagePlaceholder>
      ) : (
        <StyledCardImage
          ref={imgRef}
          src={src}
          alt={alt}
          $loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </ImageWrapper>
  );
});

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
  transition: color ${({ theme }) => theme.transitions.smooth};

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
  background: ${({ theme }) => `${theme.colors.text}0A`};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => `${theme.colors.border}60`};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.transitions.slow};

  &:hover {
    background: ${({ theme }) => theme.gradients.primaryTransparent};
    border-color: ${({ theme }) => `${theme.colors.primary}60`};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.small};
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
