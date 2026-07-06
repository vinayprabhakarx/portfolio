export const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
  },
};

const springTransition = {
  type: "spring",
  stiffness: 70,
  damping: 15,
  mass: 1 
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: springTransition 
  },
};

export const fadeRightVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: springTransition 
  },
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: springTransition 
  },
};

// Aliased for backward compatibility if still used somewhere
export const pageItemVariants = fadeUpVariants;
