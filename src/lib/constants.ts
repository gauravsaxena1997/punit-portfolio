import { SiteConfig, Skill, Experience, Project, KPIMetric, NavLink } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Punit Gauttam",
  title: "System Engineer | Power Platform & Data Visualization Expert",
  description:
    "Transforming complex data into actionable insights through interactive dashboards, automated workflows, and enterprise-grade analytics solutions.",
  aboutDescription:
    "With 5+ years of hands-on experience, I specialize in Power BI development, Power Automate workflows, and SQL optimization. I leverage AI tools for parallel development and building personal productivity dashboards while continuously expanding my expertise in advanced DAX queries.",
  role: "System Engineer",
  email: "gautty97@gmail.com",
  phone: "+91 8503087806",
  location: "Jaipur, Rajasthan, India",
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/gautty97",
      icon: "linkedin",
    },
    {
      platform: "Email",
      url: "mailto:gautty97@gmail.com",
      icon: "mail",
    },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Workflow", href: "#workflow" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const kpiMetrics: KPIMetric[] = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Power BI Reports" },
  { value: 25, suffix: "+", label: "Automated Flows" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export const skills: Skill[] = [
  // Visualization - Power BI Focus
  { name: "Power BI", percentage: 95, category: "visualization" },
  { name: "DAX", percentage: 92, category: "visualization" },
  { name: "Power Query (M)", percentage: 90, category: "visualization" },
  { name: "Data Modeling", percentage: 88, category: "visualization" },

  // Database - SQL Focus
  { name: "SQL Server", percentage: 90, category: "database" },
  { name: "Teradata", percentage: 85, category: "database" },
  { name: "Snowflake", percentage: 80, category: "database" },
  { name: "Query Optimization", percentage: 85, category: "database" },

  // Automation - Power Platform Focus
  { name: "Power Automate", percentage: 88, category: "automation" },
  { name: "Power Apps", percentage: 82, category: "automation" },
  { name: "SharePoint", percentage: 85, category: "automation" },
  { name: "Dataverse", percentage: 78, category: "automation" },

  // Cloud
  { name: "Azure Databricks", percentage: 80, category: "cloud" },
  { name: "Azure Data Factory", percentage: 78, category: "cloud" },
  { name: "AWS S3", percentage: 75, category: "cloud" },
  { name: "Power BI Service", percentage: 90, category: "cloud" },
];

// SQL Table Data for Skills Display
export const sqlSkillsData = [
  { id: 1, skill_name: "Power BI", category: "Visualization", proficiency: 95, years_exp: 4.5, certifications: 2 },
  { id: 2, skill_name: "DAX", category: "Visualization", proficiency: 92, years_exp: 4.0, certifications: 1 },
  { id: 3, skill_name: "SQL Server", category: "Database", proficiency: 90, years_exp: 5.0, certifications: 1 },
  { id: 4, skill_name: "Power Automate", category: "Automation", proficiency: 88, years_exp: 3.5, certifications: 1 },
  { id: 5, skill_name: "Power Query", category: "ETL", proficiency: 90, years_exp: 4.0, certifications: 0 },
  { id: 6, skill_name: "SharePoint", category: "Collaboration", proficiency: 85, years_exp: 3.0, certifications: 0 },
  { id: 7, skill_name: "Power Apps", category: "Development", proficiency: 82, years_exp: 2.5, certifications: 0 },
  { id: 8, skill_name: "Azure Databricks", category: "Cloud", proficiency: 80, years_exp: 2.0, certifications: 0 },
];

// Power Automate Workflow Steps
export const workflowSteps = [
  {
    id: "trigger",
    type: "trigger",
    title: "When a new request is submitted",
    connector: "SharePoint",
    icon: "sharepoint",
    description: "Triggers when a new item is created in SharePoint list",
  },
  {
    id: "condition",
    type: "condition",
    title: "Check Request Type",
    connector: "Control",
    icon: "condition",
    description: "Route based on request category",
    branches: ["Data Report", "Dashboard Update"],
  },
  {
    id: "powerbi",
    type: "action",
    title: "Refresh Power BI Dataset",
    connector: "Power BI",
    icon: "powerbi",
    description: "Trigger dataset refresh for latest data",
  },
  {
    id: "sql",
    type: "action",
    title: "Execute SQL Query",
    connector: "SQL Server",
    icon: "sql",
    description: "Run stored procedure for data extraction",
  },
  {
    id: "powerapps",
    type: "action",
    title: "Update Power Apps",
    connector: "Power Apps",
    icon: "powerapps",
    description: "Notify users via Power Apps notification",
  },
  {
    id: "email",
    type: "action",
    title: "Send Email Notification",
    connector: "Outlook",
    icon: "outlook",
    description: "Email stakeholders with report link",
  },
];

export const experiences: Experience[] = [
  {
    id: "tcs",
    role: "System Engineer",
    company: "Tata Consultancy Services",
    duration: "Sep 2023 - Present",
    description:
      "Delivering enterprise Power BI solutions and automated workflows for a global entertainment studio, transforming complex data into actionable business intelligence.",
    achievements: [
      "Developed 25+ interactive Power BI dashboards using advanced DAX and SQL queries",
      "Implemented Power Automate flows reducing manual reporting effort by 60%",
      "Migrated legacy reports to Power BI Service with Row-Level Security (RLS)",
      "Created SharePoint-integrated solutions for centralized data management",
      "Optimized SQL queries improving report refresh times by 40%",
    ],
    technologies: ["Power BI", "DAX", "SQL Server", "Power Automate", "SharePoint", "Power Query"],
  },
  {
    id: "circulants",
    role: "Associate Engineer",
    company: "Circulants Solutions Inc.",
    duration: "Oct 2021 - Jul 2023",
    description:
      "Delivered end-to-end Power Platform solutions for healthcare and enterprise clients, specializing in Power BI development and process automation.",
    achievements: [
      "Designed Power BI reports with drill-through, bookmarks, and custom DAX measures",
      "Built Power Automate workflows integrating SharePoint, SQL, and Power Apps",
      "Implemented Row-Level Security for multi-tenant Power BI solutions",
      "Developed Power Apps for data entry connected to Dataverse",
      "Managed data pipelines using Azure Databricks and sFTP servers",
    ],
    technologies: ["Power BI", "Power Automate", "Power Apps", "SharePoint", "Azure Databricks", "SQL"],
  },
  {
    id: "circuitloop",
    role: "Graduate Engineer",
    company: "Circuitloop Technologies",
    duration: "Jun 2020 - Oct 2021",
    description:
      "Managed e-commerce operations and developed data solutions using Excel and SQL for business analytics.",
    achievements: [
      "Built advanced Excel reports with pivot tables and macros for business analytics",
      "Managed SQL databases for e-commerce inventory tracking",
      "Led team operations ensuring timely delivery of client solutions",
    ],
    technologies: ["MS Excel", "SQL", "Data Analysis", "Team Leadership"],
  },
  {
    id: "lnt",
    role: "Summer Intern",
    company: "Larsen & Toubro (L&T)",
    duration: "Jun 2018 - 2 Months",
    description:
      "Contributed to quality assurance and smart panel development for Rajasthan Government IoT projects.",
    achievements: [
      "Supported QA testing for government smart panel solutions",
      "Assisted in data synchronization and connectivity testing",
    ],
    technologies: ["Quality Assurance", "IoT", "Testing"],
  },
];

export const projects: Project[] = [
  {
    id: "insurance-analytics",
    title: "API Analytics & Deployment Platform",
    description:
      "Leading the development of comprehensive Power BI analytics solution for a major US-based insurance company, focusing on API call collection, monitoring, and deployment metrics. Built end-to-end dashboards tracking API performance, usage patterns, and deployment pipelines for enterprise stakeholders.",
    category: "Power BI",
    featured: true,
    leadership: "Leading a team of 2 analysts",
    metrics: [
      { label: "Team Size", value: "2 Direct Reports" },
      { label: "API Metrics Tracked", value: "50+" },
      { label: "Automated Workflows", value: "15+" },
    ],
    technologies: ["Power BI", "Power Automate", "DAX", "SQL Server", "API Analytics"],
  },
  {
    id: "entertainment-dashboard",
    title: "Enterprise Power BI Dashboard Suite",
    description:
      "Comprehensive Power BI solution for a global entertainment studio featuring real-time KPIs, interactive drill-throughs, and DAX-powered calculations for executive decision making across multiple business units.",
    category: "Power BI",
    metrics: [
      { label: "Dashboards", value: "25+" },
      { label: "DAX Measures", value: "150+" },
      { label: "Data Sources", value: "12" },
    ],
    technologies: ["Power BI", "DAX", "SQL Server", "Power Query"],
  },
  {
    id: "automation-suite",
    title: "Power Automate Workflow Suite",
    description:
      "End-to-end automation solution integrating SharePoint, Power BI, and SQL Server for automated report generation, email triggers for scheduled reports, and distribution with approval workflows.",
    category: "Power Automate",
    metrics: [
      { label: "Flows Created", value: "25+" },
      { label: "Hours Saved/Week", value: "40+" },
      { label: "Integrations", value: "8" },
    ],
    technologies: ["Power Automate", "SharePoint", "Power BI", "Outlook"],
  },
  {
    id: "sql-optimization",
    title: "SQL Performance Optimization",
    description:
      "Database optimization project involving query tuning, indexing strategies, and stored procedure development for high-performance Power BI DirectQuery connections.",
    category: "SQL Server",
    metrics: [
      { label: "Query Speed", value: "+70%" },
      { label: "Procedures", value: "50+" },
      { label: "Tables Optimized", value: "100+" },
    ],
    technologies: ["SQL Server", "T-SQL", "Query Optimization", "Indexing"],
  },
  {
    id: "powerapps-portal",
    title: "Power Apps Data Entry Portal",
    description:
      "Custom Power Apps solution connected to Dataverse and SharePoint for streamlined data collection with real-time validation and Power Automate integration.",
    category: "Power Apps",
    metrics: [
      { label: "Forms Built", value: "15+" },
      { label: "Users", value: "200+" },
      { label: "Accuracy", value: "99.9%" },
    ],
    technologies: ["Power Apps", "Dataverse", "SharePoint", "Power Automate"],
  },
];

export const education = {
  degree: "Bachelor of Technology (B.Tech)",
  institution: "Swami Keshwanand Institute of Technology",
  duration: "Aug 2015 - Jun 2019",
  location: "Jaipur, Rajasthan, India",
};

export const skillCategories = [
  { id: "visualization", label: "Power BI & Visualization", color: "#F2C811" },
  { id: "database", label: "SQL & Databases", color: "#01B8AA" },
  { id: "automation", label: "Power Platform", color: "#FD625E" },
  { id: "cloud", label: "Cloud & Services", color: "#8AD4EB" },
] as const;

// Power Platform Connectors for Workflow Visual
export const powerPlatformConnectors = [
  { name: "SharePoint", icon: "sharepoint", color: "#01B8AA" },
  { name: "Power BI", icon: "powerbi", color: "#F2C811" },
  { name: "SQL Server", icon: "sql", color: "#E74856" },
  { name: "Power Apps", icon: "powerapps", color: "#A855F7" },
  { name: "Outlook", icon: "outlook", color: "#4EA8DE" },
  { name: "Dataverse", icon: "dataverse", color: "#10B981" },
  { name: "Excel", icon: "excel", color: "#22C55E" },
  { name: "Teams", icon: "teams", color: "#818CF8" },
];
