import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { iconMap } from "../utils/iconMap";
import Terminal from "../components/Terminal";

import {
  ContentWrapper,
  LeftSection,
  WelcomeText,
  OpenForWorkBadge,
  GradientName,
  TypewriterContainer,
  Description,
  RightSection,
  Wave,
  ButtonRow,
  SocialRow,
  SocialIconLink,
  GlowOrb,
} from "../styles/HeroStyles";

import Button from "../components/Button";

const socialLinks = [
  { href: "https://github.com/VinayPrabhakarX", icon: iconMap.FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/VinayPrabhakarX/", icon: iconMap.FaLinkedin, label: "LinkedIn" },
  { href: "https://www.kaggle.com/vinayprabhakarx", icon: iconMap.FaKaggle, label: "Kaggle" },
  { href: "https://x.com/VinayPrabhakarX", icon: iconMap.FaXTwitter, label: "X / Twitter" },
];

import { pageContainerVariants, fadeUpVariants } from "../utils/motion";

const terminalFadeUpVariants = {
  hidden: fadeUpVariants.hidden,
  visible: {
    ...fadeUpVariants.visible,
    transition: {
      ...fadeUpVariants.visible.transition,
      delay: 0.5
    }
  }
};

// The Hero landing page component.
// Serves as the first visual impression, featuring an animated typewriter effect,
// call-to-action buttons, and an interactive terminal showcase.
const Hero = () => {
  return (
    <ContentWrapper role="banner">
    <GlowOrb />

    <LeftSection
      initial="hidden"
      animate="visible"
      variants={pageContainerVariants}
    >
      <motion.div variants={fadeUpVariants}>
        <WelcomeText>
          Hi There! <Wave>👋</Wave> I'm <OpenForWorkBadge>Open to work</OpenForWorkBadge>
        </WelcomeText>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <GradientName>Vinay Kumar</GradientName>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <TypewriterContainer>
          A{" "}
          <Typewriter
            options={{
              strings: [
                "Full-Stack Developer",
                "Problem Solver",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 45,
              delay: 75,
            }}
          />
        </TypewriterContainer>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <Description>
          Welcome to my portfolio. Explore my work, discover my professional
          background and projects, read my{" "}
          <a
            href="https://blog.vinayprabhakar.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            blog
          </a>
          {" "}and{" "}
          <a
            href="https://docs.vinayprabhakar.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            docs
          </a>
          , and feel free to reach out.
        </Description>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <ButtonRow>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button as={motion.button} $size="large">Get in Touch</Button>
          </Link>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <Button as={motion.button} $active={false} $size="large">View Projects</Button>
          </Link>
        </ButtonRow>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <SocialRow>
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <SocialIconLink
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                as={motion.a}
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              >
                <IconComponent size={20} />
              </SocialIconLink>
            );
          })}
        </SocialRow>
      </motion.div>
    </LeftSection>

    <RightSection
      as={motion.div}
      variants={terminalFadeUpVariants}
      initial="hidden"
      animate="visible"
    >
      <Terminal />
    </RightSection>


  </ContentWrapper>
  );
};

export default Hero;
