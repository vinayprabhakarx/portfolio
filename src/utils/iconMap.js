import React from 'react';
import BrandIcon from '../components/BrandIcon';
import * as si from 'simple-icons';
import { Database, Brain, Coffee, Code, Cloud } from 'lucide-react';

const createIcon = (iconObj) => (props) => React.createElement(BrandIcon, { icon: iconObj, ...props });

import LinkedinIcon from '../assets/linkedin.svg?react';
import AwsIcon from '../assets/aws.svg?react';
import KaggleIcon from '../assets/kaggle.svg?react';

export const iconMap = {
  FaPython: createIcon(si.siPython),
  FaJava: Coffee,
  FaJsSquare: createIcon(si.siJavascript),
  FaHtml5: createIcon(si.siHtml5),
  FaCss3Alt: createIcon(si.siCss),
  FaReact: createIcon(si.siReact),
  FaNodeJs: createIcon(si.siNodedotjs),
  FaGitAlt: createIcon(si.siGit),
  FaGithub: createIcon(si.siGithub),
  FaLinkedin: (props) => React.createElement(LinkedinIcon, { width: props.size || 24, height: props.size || 24, fill: props.color || "currentColor", ...props }),
  FaKaggle: (props) => React.createElement(KaggleIcon, { width: props.size || 24, height: props.size || 24, fill: props.color || "currentColor", ...props }),
  FaXTwitter: createIcon(si.siX),
  FaAws: (props) => React.createElement(AwsIcon, { width: props.size || 24, height: props.size || 24, fill: props.color || "currentColor", ...props }),

  FaDocker: createIcon(si.siDocker),
  FaDatabase: Database,
  FaLinux: createIcon(si.siLinux),
  FaBrain: Brain,
  SiMongodb: createIcon(si.siMongodb),
  SiMysql: createIcon(si.siMysql),
  SiTensorflow: createIcon(si.siTensorflow),
  SiScikitlearn: createIcon(si.siScikitlearn),
  SiPandas: createIcon(si.siPandas),
  SiNumpy: createIcon(si.siNumpy),
  SiStreamlit: createIcon(si.siStreamlit),
  SiExpress: createIcon(si.siExpress),
  SiJupyter: createIcon(si.siJupyter),
  SiPostman: createIcon(si.siPostman),
  SiCloudflare: createIcon(si.siCloudflare),
  SiDigitalocean: createIcon(si.siDigitalocean),
  SiNginx: createIcon(si.siNginx),
  SiTailwindcss: createIcon(si.siTailwindcss),
  SiRedux: createIcon(si.siRedux),
  SiVite: createIcon(si.siVite),
  SiKeras: createIcon(si.siKeras),
  SiJsonwebtokens: createIcon(si.siJsonwebtokens),
  SiNextdotjs: createIcon(si.siNextdotjs),
  SiMdx: createIcon(si.siMdx),
  SiSpringboot: createIcon(si.siSpringboot),
  SiJson: createIcon(si.siJson),
  VscVscode: Code,
};


