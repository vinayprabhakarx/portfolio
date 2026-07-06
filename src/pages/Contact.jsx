import { motion } from "framer-motion";
import { Send as FaPaperPlane } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLinks from "../components/SocialLinks";
import Container from "../components/Container";
import PageWrapper from "../components/PageWrapper";
import { fadeUpVariants } from "../utils/motion";
import Button from "../components/Button";
import GradientTitle from "../components/GradientTitle";
import { useContactForm } from "../hooks/useContactForm";
import { useTheme } from "styled-components";
import {
  Header,
  ContentWrapper,
  InfoCard,
  InfoTitle,
  InfoText,
  GradientBackground,
  FormSection,
  ContactForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
} from "../styles/ContactStyles";

// Contact page component.
// Provides a form for visitors to send messages and displays social links.
// Incorporates form validation, error handling, and toast notifications.
const Contact = () => {
  const theme = useTheme();
  const {
    formData,
    status,
    validationErrors,
    formFields,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  return (
    <PageWrapper>
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.isDark ? "dark" : "light"}
      />
      <Header>
        <GradientTitle>Get In Touch</GradientTitle>
      </Header>

      <ContentWrapper>
        {/* Left column: Contact information and social links */}
        <InfoCard
          as={motion.div}
          variants={fadeUpVariants}
          style={{
            willChange: "transform",
            isolation: "isolate",
          }}
        >
          <InfoTitle>Contact Information</InfoTitle>
          <InfoText>
            Feel free to reach out for collaborations, questions, or just to say
            hello! I'll try my best to get back to you!
          </InfoText>
          <SocialLinks />
          <GradientBackground />
        </InfoCard>

        {/* Right column: Interactive contact form */}
        <FormSection
          as={motion.div}
          variants={fadeUpVariants}
          style={{
            willChange: "transform",
            isolation: "isolate",
          }}
        >
          <ContactForm onSubmit={handleSubmit}>
            {formFields.map(
              ({ name, type, label, autoComplete, maxLength }) => (
                <FormGroup key={name}>
                  <FormLabel htmlFor={name}>
                    {label} <span style={{ color: theme.colors.error }}>*</span>
                  </FormLabel>
                  <FormInput
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={status.submitting}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    style={{
                      borderColor: validationErrors[name]
                        ? theme.colors.error
                        : undefined,
                    }}
                    aria-invalid={!!validationErrors[name]}
                    aria-describedby={
                      validationErrors[name] ? `${name}-error` : undefined
                    }
                  />
                  {validationErrors[name] && (
                    <div
                      id={`${name}-error`}
                      style={{
                        color: theme.colors.error,
                        fontSize: theme.typography.fontSizes.sm,
                        marginTop: theme.spacing.xs,
                      }}
                    >
                      {validationErrors[name]}
                    </div>
                  )}
                </FormGroup>
              )
            )}

            <FormGroup>
              <FormLabel htmlFor="message">
                Message <span style={{ color: theme.colors.error }}>*</span>
              </FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows="6"
                disabled={status.submitting}
                autoComplete="off"
                maxLength={2000}
                style={{
                  borderColor: validationErrors.message ? theme.colors.error : undefined,
                }}
                aria-invalid={!!validationErrors.message}
                aria-describedby={
                  validationErrors.message ? "message-error" : undefined
                }
              />
              {validationErrors.message && (
                <div
                  id="message-error"
                  style={{
                    color: theme.colors.error,
                    fontSize: theme.typography.fontSizes.sm,
                    marginTop: theme.spacing.xs,
                  }}
                >
                  {validationErrors.message}
                </div>
              )}
              <div
                style={{
                  fontSize: theme.typography.fontSizes.xs,
                  color: theme.colors.textSecondary,
                  marginTop: theme.spacing.xs,
                }}
              >
                {formData.message.length}/2000 characters
              </div>
            </FormGroup>

            <Button
              type="submit"
              disabled={status.submitting}
              style={{
                width: "100%",
                opacity: status.submitting ? 0.7 : 1,
                cursor: status.submitting ? "not-allowed" : "pointer",
              }}
            >
              {status.submitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FaPaperPlane style={{ marginLeft: theme.spacing.sm }} />
                </>
              )}
            </Button>
          </ContactForm>
        </FormSection>
      </ContentWrapper>
    </Container>
    </PageWrapper>
  );
};

export default Contact;
