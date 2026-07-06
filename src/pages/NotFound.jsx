import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { fadeUpVariants } from "../utils/motion";
// Standard 404 Not Found error page.
// Rendered when a user navigates to an undefined route.
const NotFound = () => {
  return (
    <PageWrapper>
    <Wrapper>
      <Title as={motion.h1} variants={fadeUpVariants}>404 | Not Found</Title>
      <Message as={motion.p} variants={fadeUpVariants}>Oops! The page you're looking for doesn't exist.</Message>
      <motion.div variants={fadeUpVariants}>
        <Link
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
          }}
          to="/"
        >
          Go Back Home
        </Link>
      </motion.div>
    </Wrapper>
    </PageWrapper>
  );
};

// Layout wrapper centering the 404 content vertically and horizontally.
const Wrapper = styled.section`
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing["2xl"]};
  box-sizing: border-box;
`;

// Typography styling for the 404 heading.
const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Typography styling for the 404 description message.
const Message = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 37.5rem;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

export default NotFound;
