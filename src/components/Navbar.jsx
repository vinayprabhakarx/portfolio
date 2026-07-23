import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as FiMenu, X as FiX, Moon as FiMoon, Sun as FiSun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useTheme as useStyledTheme } from "styled-components";
import { defaultTransition } from "../utils/motion";
import logo from "../assets/logo.svg";

// Global navigation bar component.
// Features responsive routing, theme toggling, and a sliding mobile drawer menu.
// Automatically adapts styling based on vertical scroll position.
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open state
  const [scrolled, setScrolled] = useState(false); // Track scroll for style change
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const styledTheme = useStyledTheme();

  // Update 'scrolled' based on scroll position
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  // Attach a passive scroll listener throttled via requestAnimationFrame
  // This ensures high performance during rapid scrolling events
  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Guarantee the mobile menu closes whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent the mobile menu from getting stuck open if the viewport is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia(`(min-width: ${styledTheme.breakpoints.md})`).matches && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, styledTheme.breakpoints.md]);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Home", internal: true },
      { path: "/about", label: "About", internal: true },
      { path: "/projects", label: "Projects", internal: true },
      { path: "/resume", label: "Resume", internal: true },
      {
        path: "https://blog.vinayprabhakar.dev",
        label: "Blog",
        internal: false,
      },
      { path: "/contact", label: "Contact", internal: true },
    ],
    []
  );

  const toggleMobileMenu = useCallback(() => {
    // Only toggle if we're in mobile view
    if (!window.matchMedia(`(min-width: ${styledTheme.breakpoints.md})`).matches) {
      setIsOpen((prev) => !prev);
    }
  }, [styledTheme.breakpoints.md]);
  const closeMobileMenu = useCallback(() => setIsOpen(false), []);

  // Animation variants for overlay opacity
  const overlayVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    []
  );

  // Animation variants for sliding mobile nav
  const mobileNavVariants = useMemo(
    () => ({
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: defaultTransition,
    }),
    []
  );

  return (
    <>
      <NavContainer $scrolled={scrolled}>
        <NavContent>
          <LogoLink to="/">
            <LogoContainer>
              <StyledLogo src={logo} alt="Logo" $isDark={isDarkMode} />
              <Logo>
                <LogoName>Vinay Kumar</LogoName>
              </Logo>
            </LogoContainer>
          </LogoLink>

          <DesktopNav>
            {navItems.map((item) =>
              item.internal ? (
                <NavLink
                  key={item.path}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  {item.label}
                </NavLink>
              ) : (
                <ExternalNavLink
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </ExternalNavLink>
              )
            )}
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <FiSun size={20} className="sun-icon" />
              ) : (
                <FiMoon size={20} />
              )}
            </ThemeToggle>
          </DesktopNav>

          <MobileControls>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <FiSun size={20} className="sun-icon" />
              ) : (
                <FiMoon size={20} />
              )}
            </ThemeToggle>
            <MobileMenuButton
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MobileMenuButton>
          </MobileControls>
        </NavContent>
      </NavContainer>

      <AnimatePresence mode="wait">
        {isOpen && !window.matchMedia(`(min-width: ${styledTheme.breakpoints.md})`).matches && (
          <>
            <MobileMenuOverlay {...overlayVariants} onClick={closeMobileMenu} />
            <MobileNav {...mobileNavVariants} aria-label="Mobile navigation">
              {navItems.map((item) =>
                item.internal ? (
                  <MobileNavLink
                    key={item.path}
                    to={item.path}
                    $isActive={location.pathname === item.path}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </MobileNavLink>
                ) : (
                  <MobileExternalNavLink
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </MobileExternalNavLink>
                )
              )}
            </MobileNav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: ${({ theme }) => theme.layout.navbarHeight};
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(0.625rem)" : "blur(0.25rem)"};
  box-shadow: ${({ $scrolled, theme }) =>
    $scrolled ? theme.shadows.scrolledDark : "none"};
  transition: background ${({ theme }) => theme.transitions.slow}, box-shadow ${({ theme }) => theme.transitions.slow},
    backdrop-filter ${({ theme }) => theme.transitions.slow};
`;

const NavContent = styled.div`
  max-width: min(100%, 120rem);
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.layout.containerMaxWidth}) {
    max-width: min(100%, 80rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const StyledLogo = styled.img`
  display: block;
  height: ${({ theme }) => theme.spacing.xl};
  width: auto;
  transition: filter ${({ theme }) => theme.transitions.fast};
  filter: ${({ $isDark }) => ($isDark ? "brightness(0) invert(1)" : "none")};
`;

const Logo = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const LogoName = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

const DesktopNav = styled.div`
  display: none;
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  position: relative;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  transition: ${({ theme }) => theme.transitions.default};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 0.125rem;
    background: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    width: 100%;
  }
`;

// External anchor link styling for the desktop navigation bar.
const ExternalNavLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  transition: color ${({ theme }) => theme.transitions.slow};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0.125rem;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.slow};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  transition: ${({ theme }) => theme.transitions.default};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  .sun-icon {
    color: ${({ theme }) => theme.colors.sunIcon};
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: ${({ theme }) => theme.layout.navbarHeight};
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
`;

const MobileNav = styled(motion.nav)`
  position: fixed;
  top: ${({ theme }) => theme.layout.navbarHeight};
  right: 0;
  bottom: flex;
  width: 50%;
  max-width: 25rem;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 999;
  overflow-y: auto;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 40%;
  }
`;

const MobileNavLink = styled(Link)`
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// External anchor link styling tailored for the mobile drawer menu.
const MobileExternalNavLink = styled.a`
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileThemeToggle = styled.button`
  margin-top: auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ToggleTrack = styled.div`
  width: 5rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, $dark }) =>
    $dark ? theme.colors.primaryDark : theme.colors.border};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $dark }) => ($dark ? "flex-end" : "flex-start")};
  transition: background ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const ToggleKnob = styled(motion.div)`
  width: 3.125rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Navbar;
