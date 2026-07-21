/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap as FaGraduationCap, Briefcase as FaBriefcase, Code as FaCode } from "lucide-react";
import profilePhoto from "../assets/photo.png";
import bsebLogo from "../assets/bseb.png";
import iibmLogo from "../assets/iibm.png";
import Container from "../components/Container";
import PageWrapper from "../components/PageWrapper";
import { fadeUpVariants } from "../utils/motion";
import Card from "../components/Card";
import Button from "../components/Button";
import GradientTitle from "../components/GradientTitle";
import Profile from "../components/Profile";
import TimelineComponent from "../components/TimelineComponent";
import aboutData from "../data/about.json";
import { iconMap } from "../utils/iconMap";
import { useTheme } from "styled-components";

const { experience, education, skills, bioText } = aboutData;

// Dynamically build tabs based on what data exists
const hasExperience = experience && experience.length > 0;
const hasEducation = education && education.length > 0;
const hasSkills = skills && Object.keys(skills).length > 0;
import {
  ProfileSection,
  BioSection,
  BioText,
  TabContent,
  CourseList,
  CourseItem,
  SkillsContainer,
  SkillCategoryTitle,
  SkillCategoryCard,
  SkillTag,
  SkillTags,
} from "../styles/AboutStyles";

// The About page component.
// Renders the author's biography alongside a tabbed interface
// detailing experience, education, and technical skills.
const About = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(
    hasExperience || hasEducation ? "journey" : hasSkills ? "skills" : ""
  );
  const tabContentRef = useRef(null);

  // Scroll the viewport down to the tab content area when a new tab is selected,
  // compensating for the fixed navbar height so content isn't obscured.
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      if (tabContentRef.current) {
        const navbarHeight = 80; // Account for fixed navbar + some padding
        const elementPosition = tabContentRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  const allTabs = [
    ...(hasExperience || hasEducation ? [{ id: "journey", icon: FaBriefcase, label: "Journey" }] : []),
    ...(hasSkills ? [{ id: "skills", icon: FaCode, label: "Skills" }] : []),
  ];
  const tabs = allTabs;

  // Map for image-based logos (non-icon)
  const logoImages = { bseb: bsebLogo, iibm: iibmLogo };

  const renderTimelineItems = (items, type) =>
    items.map((item) => {
      let logoEl = null;
      if (item.logo) {
        if (iconMap[item.logo]) {
          logoEl = React.createElement(iconMap[item.logo], { size: 20 });
        } else if (logoImages[item.logo]) {
          logoEl = <img src={logoImages[item.logo]} alt="" />;
        }
      }
      return {
        title: item.title,
        duration: item.period,
        isActive: item.isActive || (item.period && item.period.toLowerCase().includes("present")),
        organization: type === "experience" ? item.company : item.institution,
        logo: logoEl,
        extra: (
        <>
          <Card.HighlightItem>{item.description}</Card.HighlightItem>
          {type === "education" && item.courses && item.courses.length > 0 && (
            <CourseList>
              {item.courses.map((course, idx) => (
                <CourseItem key={idx}>{course}</CourseItem>
              ))}
            </CourseList>
          )}
        </>
      ),
    };
    });

  const renderTabContent = () => {
    switch (activeTab) {
      case "journey":
        return (
          <TimelineComponent
            items={[
              ...renderTimelineItems(experience, "experience"),
              ...renderTimelineItems(education, "education")
            ]}
          />
        );
      case "skills":
        return (
          <SkillsContainer>
            {Object.entries(skills).map(([category, skillList]) => (
              <SkillCategoryCard key={category}>
                <SkillCategoryTitle>{category}</SkillCategoryTitle>
                <SkillTags>
                  {skillList.map((skill, index) => {
                    const IconComponent = iconMap[skill.icon];
                    return (
                      <SkillTag key={`${category}-${index}`}>
                        {IconComponent && <IconComponent />}
                        {skill.name}
                      </SkillTag>
                    );
                  })}
                </SkillTags>
              </SkillCategoryCard>
            ))}
          </SkillsContainer>
        );
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <Container>
        <motion.div variants={fadeUpVariants}>
          <GradientTitle>About Me</GradientTitle>
        </motion.div>

        <ProfileSection>
          <motion.div variants={fadeUpVariants}>
            <Profile src={profilePhoto} alt="Vinay Prabhakar" />
          </motion.div>
          <BioSection as={motion.div} variants={fadeUpVariants}>
            <BioText>{bioText}</BioText>
          </BioSection>
        </ProfileSection>

        {/* Animated tab navigation row */}
        <Button.TabContainer as={motion.div} variants={fadeUpVariants}>
          {tabs.map(({ id, icon: Icon, label }, index) => (
              <Button
                $active={activeTab === id}
                onClick={() => handleTabClick(id)}
              >
                <Icon /> {label}
              </Button>
          ))}
        </Button.TabContainer>

        <motion.div variants={fadeUpVariants}>
          <TabContent ref={tabContentRef}>{renderTabContent()}</TabContent>
        </motion.div>
      </Container>
    </PageWrapper>
  );
};

export default About;
