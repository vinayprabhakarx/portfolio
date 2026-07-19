/**
 * Global Motion Design System for Portfolio App.
 * All animations, transitions, and motion variants are defined in this single file for complete consistency.
 */

// Primary easing curve for simple, clean slide & fade motion
export const smoothEase = [0.25, 0.1, 0.25, 1];

// Default transition configuration
export const defaultTransition = {
  duration: 0.4,
  ease: smoothEase,
};

// Container variants to orchestrate staggered entrance of child elements
export const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 } 
  },
};

// Simple fade-up variant (slides up from y: 20 to y: 0 while fading to normal opacity: 1)
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: defaultTransition,
  },
};

// Horizontal fade variants
export const fadeRightVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: defaultTransition,
  },
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: defaultTransition,
  },
};

/**
 * Generates motion variants for individual cards with staggered delays.
 * Simple bottom-to-top motion (y: 20 -> y: 0) and fade to normal (opacity: 0 -> 1).
 */
export const getCardVariants = (index = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: smoothEase,
      delay: index * 0.06,
    },
  },
});

/**
 * Returns direct motion props (initial, animate, transition) for individual cards.
 */
export const getCardMotionProps = (index = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.4,
    ease: smoothEase,
    delay: index * 0.06,
  },
});

/**
 * Standard subtle hover animation for cards across all pages.
 */
export const cardHoverProps = {
  whileHover: { y: -4 },
  transition: { duration: 0.2, ease: "easeOut" },
};

/**
 * Active tab pill motion transition configuration.
 */
export const activeTabTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

// Backward compatibility export
export const pageItemVariants = fadeUpVariants;
