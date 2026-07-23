import { memo, useMemo } from "react";
import styled from "styled-components";

// Container boundary for the global Footer.
const FooterContainer = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border-top: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  text-align: center;
`;

// Typography styling for the copyright and attribution string.
const CopyrightText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// Global site footer presenting copyright information.
// Memoized to prevent redundant renders during route navigation.
const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <FooterContainer>
      <CopyrightText>
        &copy;{currentYear} <strong>VinayPrabhakarX</strong>. All rights
        reserved.
      </CopyrightText>
    </FooterContainer>
  );
});

Footer.displayName = "Footer";

export default Footer;
