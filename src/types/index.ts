export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  percentage: number;
  category: "visualization" | "database" | "automation" | "cloud";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  metrics: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  image?: string;
  featured?: boolean;
  leadership?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  aboutDescription: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
}

export interface KPIMetric {
  value: number;
  suffix: string;
  label: string;
}
