import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { colorSchemes } from "../styles/Theme";

const ColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme, changeColorScheme, isDarkMode } = useTheme();
  const menuRef = useRef(null);

  const colorOptions = Object.keys(colorSchemes).map(key => ({
    id: key,
    name: colorSchemes[key].name,
    color: isDarkMode ? colorSchemes[key].dark.primary : colorSchemes[key].light.primary
  }));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ColorPickerWrapper ref={menuRef}>
      <PickerToggle onClick={() => setIsOpen(!isOpen)} aria-label="Toggle color scheme">
        <Palette size={20} />
      </PickerToggle>
      <AnimatePresence>
        {isOpen && (
          <ColorDropdown
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {colorOptions.map(opt => (
              <ColorOptionWrapper 
                  key={opt.id} 
                  onClick={() => { changeColorScheme(opt.id); setIsOpen(false); }}
                  title={`Switch to ${opt.name} theme`}
                  aria-label={`Switch to ${opt.name} theme`}
                  $active={colorScheme === opt.id}
              >
                <ColorDot 
                  $color={opt.color} 
                  $active={colorScheme === opt.id}
                />
                <ColorName $active={colorScheme === opt.id}>
                  {opt.name}
                </ColorName>
              </ColorOptionWrapper>
            ))}
          </ColorDropdown>
        )}
      </AnimatePresence>
    </ColorPickerWrapper>
  );
};

const PickerToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const ColorPickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ColorDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  z-index: 1010;
  min-width: 150px;
`;

const ColorOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  background: ${({ $active, theme }) => $active ? `${theme.colors.primary}1A` : 'transparent'};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.inputBackground};
  }
`;

const ColorName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ $active, theme }) => $active ? theme.typography.fontWeights.semibold : theme.typography.fontWeights.medium};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.text};
`;

const ColorDot = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid ${({ $active, theme }) => $active ? theme.colors.text : 'transparent'};
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s, border-color 0.2s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export default ColorPicker;
