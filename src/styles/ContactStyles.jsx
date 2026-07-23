import styled from "styled-components";
import { motion } from "framer-motion";

// Header section styling
export const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["4xl"]};
`;

// Wrapper for contact info and form, uses grid layout
export const ContentWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  align-items: start;
  max-width: 87.5rem;
  margin: 0 auto;
`;

// Styling for the contact info card
export const InfoCard = styled.aside`
  flex: 1 1 20rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  transition: box-shadow ${({ theme }) => theme.transitions.slow}, border-color ${({ theme }) => theme.transitions.slow};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Background gradient for info card (for visual effects)
export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

// Title within the info card
export const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Text content within the info card
export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// Container for the contact form
export const FormSection = styled.section`
  flex: 1.5 1 30rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  transition: box-shadow ${({ theme }) => theme.transitions.slow}, border-color ${({ theme }) => theme.transitions.slow};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Styling for the contact form element
export const ContactForm = styled.form`
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Wrapper for form input groups
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Styling for form labels
export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

// Styling for text input fields
export const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  transition: ${({ theme }) => theme.transitions.default};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.inputBackground};
  }

  /* Autofill styles for WebKit browsers */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text} !important;
    -webkit-box-shadow: 0 0 0 62.5rem
      ${({ theme }) => theme.colors.inputBackground} inset !important;
  }

  &:-moz-autofill {
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Styling for textarea input fields
export const FormTextarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  border-radius: 0.625rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  resize: vertical;
  min-height: 7.5rem;
  transition: ${({ theme }) => theme.transitions.default};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.inputBackground};
  }
`;



// Reusable styles for status messages
const messageStyles = `
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;

// Styling for a success message
export const SuccessMessage = styled(motion.div)`
  ${messageStyles}
  background: ${({ theme }) => theme.colors.success};
`;

// Styling for an error message
export const ErrorMessage = styled(motion.div)`
  ${messageStyles}
  background: ${({ theme }) => theme.colors.warning};
`;
