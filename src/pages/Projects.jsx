import { useState, useMemo, useCallback, memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink as FaExternalLinkAlt, Code as FaCode } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import GradientTitle from "../components/GradientTitle";
import Pagination from "../components/Pagination";
import Container from "../components/Container";
import PageWrapper from "../components/PageWrapper";
import { fadeUpVariants } from "../utils/motion";
import {
  ProjectLinks,
  ProjectLink,
  ProjectCardWrapper,
} from "../styles/ProjectStyles";
import aboutData from "../data/about.json";
import { iconMap } from "../utils/iconMap";
import projectsList from "../data/projects.json";

// Derive categories dynamically from actual projects
const projectCategories = [...new Set(projectsList.map((p) => p.category).filter(Boolean))];
// Only show "all" button if there are multiple categories
const categories = projectCategories.length > 1 ? ["all", ...projectCategories] : projectCategories;

/**
 * Individual project card component.
 * Memorized to prevent unnecessary re-renders during pagination or category filtering.
 * 
 * @param {Object} project - The project data object.
 * @param {number} index - The index for staggered animation delays.
 */
const ProjectCard = memo(({ project, index }) => {
  // Create a flattened map of skill name -> icon
  const projectIconMap = useMemo(() => {
    const map = {
      "Next.js": iconMap.SiNextdotjs,
      "MDX": iconMap.SiMdx,
      "Vanilla JS": iconMap.FaJsSquare,
      "JSON": iconMap.SiJson,
    };
    Object.values(aboutData.skills)
      .flat()
      .forEach((skill) => {
        map[skill.name] = iconMap[skill.icon];
      });
    return map;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ display: "flex", flexDirection: "column", flex: "1 1 clamp(18rem, 25vw, 25rem)", maxWidth: "28rem", minWidth: "18rem" }}
    >
      <ProjectCardWrapper>
        <Card
          key={project.id || index}
          style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}
        >
          {project.image ? (
            <Card.Image src={project.image} alt={project.title} />
          ) : (
            <Card.ImagePlaceholder>
              <FaCode />
            </Card.ImagePlaceholder>
          )}
          <Card.Title>{project.title}</Card.Title>
          <Card.Description>{project.description}</Card.Description>

          {project.highlights?.length > 0 && (
            <Card.HighlightsList>
              {project.highlights.map((highlight, hIndex) => (
                <Card.HighlightItem key={`highlight-${index}-${hIndex}`}>
                  • {highlight}
                </Card.HighlightItem>
              ))}
            </Card.HighlightsList>
          )}

          <Card.TagContainer>
            {project.tags.map((tag, tagIndex) => {
              const Icon = projectIconMap[tag];
              return (
                <Card.Tag key={`tag-${index}-${tagIndex}`}>
                  {Icon && <Icon size={16} />}
                  {tag}
                </Card.Tag>
              );
            })}
          </Card.TagContainer>

          <ProjectLinks>
          {project.github && (
            <ProjectLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <iconMap.FaGithub /> Code
            </ProjectLink>
          )}
          {project.demo && (
            <ProjectLink
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt /> Demo
            </ProjectLink>
          )}
        </ProjectLinks>
      </Card>
    </ProjectCardWrapper>
  </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

// Animated tab button used for filtering projects by category.
const CategoryTab = memo(({ category, isActive, onClick, index }) => {
  const formatted = category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Button
        $active={isActive}
        onClick={onClick}
        aria-pressed={isActive}
        role="tab"
      >
        {formatted}
      </Button>
    </motion.div>
  );
});

CategoryTab.displayName = "CategoryTab";

// The Projects page component.
// Displays a grid of featured projects with category filtering and dynamic pagination.
const Projects = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? "all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProjects, setCurrentProjects] = useState([]);
  const projectsGridRef = useRef(null);

  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 2500) {
        setItemsPerPage(8); // 4K TV screens
      } else if (width > 1024) {
        setItemsPerPage(6); // Laptops
      } else {
        setItemsPerPage(4); // Mobile and Tablets
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize the filtered project list to avoid recalculation unless the category changes
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projectsList;
    return projectsList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Slice the filtered projects array based on the current active page and dynamic screen limits
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentProjects(filteredProjects.slice(start, end));
  }, [filteredProjects, currentPage, itemsPerPage]);

  // Handle category switching, reset pagination to page 1, and scroll back to the grid
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1
    // Scroll to projects grid after a short delay
    setTimeout(() => {
      if (projectsGridRef.current) {
        const navbarHeight = 80; // Account for fixed navbar + padding
        const elementPosition = projectsGridRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to projects grid after a short delay
    setTimeout(() => {
      if (projectsGridRef.current) {
        const navbarHeight = 80;
        const elementPosition = projectsGridRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  }, []);

  const categoryHandlers = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat] = () => handleCategoryChange(cat);
    });
    return map;
  }, [handleCategoryChange]);

  return (
    <PageWrapper>
      <Container>
        <motion.div variants={fadeUpVariants}>
          <GradientTitle>Featured Projects</GradientTitle>
        </motion.div>

        {/* Category Tabs with animation */}
        <motion.div variants={fadeUpVariants}>
          <Button.TabContainer role="tablist" aria-label="Project categories">
            {categories.map((category, index) => (
              <CategoryTab
                key={category}
                category={category}
                isActive={selectedCategory === category}
                onClick={categoryHandlers[category]}
                index={index}
              />
            ))}
          </Button.TabContainer>
        </motion.div>

        {/* Project Cards */}
        <motion.div variants={fadeUpVariants}>
          <Card.Grid ref={projectsGridRef} aria-label="Projects grid">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project.id || `project-${index}`}
                project={project}
                index={index}
              />
            ))}
          </Card.Grid>
        </motion.div>

        {/* Pagination */}
        {filteredProjects.length > itemsPerPage && (
          <Pagination
            data={filteredProjects}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            maxVisiblePages={6}
          />
        )}
      </Container>
    </PageWrapper>
  );
});

Projects.displayName = "Projects";

export default Projects;
