import { keyframes } from "styled-components";

export const createAnimation = (keyframesDef) => keyframes`${keyframesDef}`;

export const floatAnimation = createAnimation`
  0% { transform: translateY(0rem) rotate(0deg); background-position: 0 50%; }
  50% { transform: translateY(-1.25rem) rotate(5deg); background-position: 100% 50%; }
  100% { transform: translateY(0rem) rotate(0deg); background-position: 0 50%; }
`;

export const gradientAnimation = createAnimation`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

export const waveAnimation = createAnimation`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(24deg); }
  20% { transform: rotate(-18deg); }
  30% { transform: rotate(24deg); }
  40% { transform: rotate(-14deg); }
  50% { transform: rotate(20deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;
