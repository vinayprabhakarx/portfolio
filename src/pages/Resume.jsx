import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Download as FaDownload, FileText as FaFileText } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import GradientTitle from "../components/GradientTitle";
import Container from "../components/Container";
import PageWrapper from "../components/PageWrapper";
import { fadeUpVariants } from "../utils/motion";
import Button from "../components/Button";

import resumePdf from "../assets/resume.pdf";

// Use CDN for worker to completely avoid any bundling or Nginx mime-type issues
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ─── Styled Components ───
const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const PdfSkeletonCard = styled.div`
  width: ${({ $width }) => `${$width / 16}rem`};
  max-width: 90vw;
  height: ${({ $width }) => `${Math.round($width * 1.414) / 16}rem`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.text}0A 25%, ${theme.colors.text}1A 50%, ${theme.colors.text}0A 75%)`};
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s ease-in-out infinite;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`;

const ResumeWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  
  /* Hide scrollbar visually but allow scrolling if needed */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  .react-pdf__Document {
    display: flex;
    justify-content: center;
    transition: opacity ${({ theme }) => theme.transitions.smooth};
  }
  
  .react-pdf__Page {
    box-shadow: ${({ theme }) => theme.shadows.large};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
  }
  
  .react-pdf__Page__canvas {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    max-width: 100%;
    height: auto !important;
  }
`;

// ─── Main Component ───
// Resume page component displaying a PDF viewer.
// Includes a direct download fallback and dynamically scales the PDF canvas
// based on the user's viewport width.
const Resume = () => {
  const [width, setWidth] = useState(1200);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate optimal width for the PDF page
  const getPageWidth = () => {
    // Determine the current rem size based on our clamp(1rem, 0.8333vw, 3rem)
    const vw = width / 100;
    let remSize = 16;
    if (vw * 0.8333 > 16) remSize = vw * 0.8333;
    if (remSize > 48) remSize = 48;
    
    // We want the resume to take up about 60rem maximum
    const maxPixelWidth = 60 * remSize;
    
    // Return 90% of screen width, but capped at our max preferred width
    return Math.min(width * 0.9, maxPixelWidth);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(resumePdf);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = "vinay_resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(resumePdf, '_blank');
    }
  };

  const pageWidth = getPageWidth();

  return (
    <PageWrapper>
      <Container>
        <motion.div variants={fadeUpVariants}>
          <GradientTitle>Resume</GradientTitle>
        </motion.div>
        <ResumeContainer>
          <motion.div variants={fadeUpVariants}>
            <ButtonGroup>
              <Button
                as={motion.button}
                onClick={handleDownload}
              >
                <FaDownload size={16} />
                Download
              </Button>
            </ButtonGroup>
          </motion.div>

          {/* PDF Viewer with Skeleton Loading */}
          <ResumeWrapper as={motion.div} variants={fadeUpVariants}>
            {!pageLoaded && (
              <PdfSkeletonCard $width={pageWidth}>
                <FaFileText size={40} style={{ opacity: 0.6 }} />
                <span>Loading Document...</span>
              </PdfSkeletonCard>
            )}
            <div style={{ display: pageLoaded ? "block" : "none" }}>
              <Document
                file={resumePdf}
                loading={null}
              >
                <Page
                  pageNumber={1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onRenderSuccess={() => setPageLoaded(true)}
                />
              </Document>
            </div>
          </ResumeWrapper>
        </ResumeContainer>
      </Container>
    </PageWrapper>
  );
};

export default Resume;
