import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loading from "./components/Loading.jsx";
import { useRoutePrefetch } from "./utils/routePrefetcher";

// Outer wrapper for the entire application layout.
// Enforces a minimum viewport height and flex-column structure for routing content.
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Main content area wrapper.
// Accounts for fixed navigational elements (Navbar/Footer) via padding.
const MainContent = styled.main`
  padding-top: 4.375rem;
  padding-bottom: 3.75rem; /* Space for Fixed Footer */
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// AppLayout component serves as the root layout wrapper for all routes.
// It handles global UI elements (Navbar, Footer), scroll restoration,
// dynamic SEO titles, and intrinsic root font-size scaling.
const AppLayout = () => {
  const location = useLocation();
  useRoutePrefetch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Dynamically update document title based on the current route for SEO and UX
    const titleMap = {
      "/": "Vinay Prabhakar | Full-Stack Developer",
      "/about": "About | Vinay Prabhakar",
      "/projects": "Projects | Vinay Prabhakar",
      "/resume": "Resume | Vinay Prabhakar",
      "/contact": "Contact | Vinay Prabhakar",
    };
    document.title = titleMap[location.pathname] || "Vinay Prabhakar";
  }, [location.pathname]);

  // Enforce root font-size scaling dynamically via JavaScript.
  // This bypasses known DevTools viewport width (vw) emulation bugs 
  // and guarantees reliable scaling across 4K displays.
  useEffect(() => {
    const handleResize = () => {
      // 120 base rems maps to a standard 1920 desktop width (1920 / 16).
      // Constrained between 16 and 48 base size to prevent severe over/under scaling.
      const scaledFontSize = Math.max(16, Math.min(48, window.innerWidth / 120));
      const percentage = (scaledFontSize / 16) * 100;
      document.documentElement.style.fontSize = `${percentage}%`;
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <AppWrapper>
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
      </AppWrapper>
    </Suspense>
  );
};

export default AppLayout;
