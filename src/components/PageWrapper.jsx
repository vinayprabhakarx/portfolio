import React from "react";
import { motion } from "framer-motion";
import { pageContainerVariants } from "../utils/motion";

const PageWrapper = ({ children, className }) => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
