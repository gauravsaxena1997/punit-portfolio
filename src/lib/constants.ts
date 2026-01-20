import { SiteConfig, Skill, Experience, Project, KPIMetric, NavLink } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Punit Gauttam",
  title: "Senior Data & Power BI Engineer | Power BI & Power Platform",
  description:
    "Delivering enterprise-grade analytics and automation solutions using Power BI and Power Platform. Experienced in building 25+ dashboards and enabling business users through workflow automation across Healthcare, Media & Entertainment, E-commerce and Insurance domains.",
  aboutDescription:
    "Delivering enterprise-grade analytics and automation solutions using Power BI and Power Platform. Experienced in building 25+ dashboards and enabling business users through workflow automation across Healthcare, Media & Entertainment, E-commerce and Insurance domains.",
  role: "Senior Data & Power BI Engineer",
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
  { value: 5, suffix: "+", label: "Professional Experience" },
  { value: 25, suffix: "+", label: "Power BI Dashboards" },
  { value: 50, suffix: "", label: "Process Optimization" },
  { value: 4, suffix: "", label: "Domains" },
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
      "Worked on multiple enterprise analytics initiatives across Insurance and Media & Entertainment domains, delivering Power BI dashboards, API analytics platforms, and governance reporting solutions. Responsibilities included modernizing legacy data platforms, building role-secured analytics, developing regulatory and all-encompassing reports, and leading a small team while collaborating directly with client stakeholders.",
    achievements: [
      "Delivered end-to-end Power BI analytics solutions across multiple business domains",
      "Built API analytics, governance, and regulatory dashboards for enterprise clients",
      "Migrated legacy SQL workloads to modern cloud data platforms",
      "Implemented Row-Level Security (RLS) and role-based reporting",
      "Led a team of 2 and owned delivery from requirement gathering to deployment",
    ],
    technologies: ["Power BI", "DAX", "SQL Server", "Power Automate", "SharePoint", "Power Query"],
  },
  {
    id: "circulants",
    role: "Associate Engineer",
    company: "Circulants Solutions Inc.",
    duration: "Oct 2021 - Jul 2023",
    description:
      "Delivered healthcare analytics and data automation solutions, working on both data processing pipelines and Power BI reporting platforms. Contributed to projects involving automated data ingestion, validation, secure access, and visualization of healthcare and medicine usage data.",
    achievements: [
      "Built Power BI dashboards for healthcare analytics and reporting",
      "Developed automated data processing pipelines using Python and Azure services",
      "Worked with structured and unstructured healthcare data from multiple sources",
      "Supported secure data access and role-based reporting",
    ],
    technologies: ["Power BI", "Power Automate", "Power Apps", "SharePoint", "Azure Databricks", "SQL"],
  },
  {
    id: "circuitloop",
    role: "Graduate Engineer",
    company: "Circuitloop Technologies LLP",
    duration: "Jul 2020 - Oct 2021",
    description:
      "Worked in a startup e-commerce environment, supporting day-to-day business operations, data analysis, and customer engagement. Gained hands-on experience in analyzing sales and operational data using Excel, interacting with customers and organizational leadership, and contributing to data-driven decision-making in a small, fast-paced team.",
    achievements: [
      "Analyzed e-commerce sales, inventory, and operational data using Microsoft Excel",
      "Created and maintained Excel-based reports to track orders, returns, and customer trends",
      "Supported customer follow-ups, including order status, returns, and policy-related queries",
      "Interacted directly with organization leadership to share insights and operational updates",
      "Assisted in managing and expanding product and customer data for the platform",
      "Gained exposure to end-to-end business operations in a startup environment",
      "Developed strong fundamentals in data handling, reporting, and teamwork",
    ],
    technologies: ["Microsoft Excel", "Data Analysis", "E-commerce Operations", "Customer Engagement", "Business Communication"],
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
    id: "insurance-api-analytics",
    title: "Insurance API Analytics, Governance & Automation Platform",
    description:
      "Built an end-to-end analytics and governance solution from scratch for an insurance client by working directly with stakeholders and leading a small team. The platform delivers multi-level visibility into APIs across platforms, supports regulatory (NYDFS) reporting, and enables business users through Power Apps, Power Automate, and SharePoint. Key highlights include platform-level and API-level analytics using Power BI, governance and all-encompassing reporting for enterprise visibility, NYDFS regulatory reporting dashboards, data modeling from PostgreSQL sources, Row-Level Security (RLS) for role-based access, business enablement using Power Apps and SharePoint, automated email notifications using Power Automate, and leading a team of 2 with end-to-end delivery ownership.",
    category: "Power BI",
    featured: true,
    leadership: "Leading a team of 2",
    metrics: [
      { label: "Duration", value: "Feb 2025 - Present" },
      { label: "Team Size", value: "2 Direct Reports" },
      { label: "Reporting Types", value: "API + Governance + Regulatory" },
    ],
    technologies: ["Power BI", "DAX", "PostgreSQL", "Power Apps", "Power Automate", "SharePoint", "API Analytics", "Insurance Analytics", "BI Governance"],
  },
  {
    id: "media-entertainment-analytics",
    title: "Media & Entertainment Consumer Analytics Platform",
    description:
      "Modernized legacy reporting by migrating SQL workloads from Teradata to Snowflake and building Power BI dashboards for consumer and broadcaster analytics. Enabled secure access and long-term trend analysis through role-based reporting and historical data comparisons. Key highlights include migrating SQL queries from Teradata to Snowflake, building Power BI dashboards for consumer and broadcaster analytics, implementing Row-Level Security (RLS) for secure reporting, conducting historical and year-over-year analysis using Excel and Power BI, and collaborating with stakeholders for data validation.",
    category: "Power BI",
    metrics: [
      { label: "Duration", value: "Oct 2023 - Jan 2025" },
      { label: "SQL Migration", value: "Teradata to Snowflake" },
      { label: "Analytics Focus", value: "Consumer + Broadcaster" },
    ],
    technologies: ["Power BI", "Snowflake", "SQL Migration", "DAX", "Media Analytics", "Enterprise BI", "RLS"],
  },
  {
    id: "healthcare-visualization",
    title: "Healthcare Data Visualization & Insights Platform",
    description:
      "Developed Power BI dashboards to analyze healthcare data from multiple hospitals and organizations. The solution provided insights into medicine usage, effectiveness, and geographic distribution using interactive and map-based visualizations. Key highlights include building Power BI dashboards for healthcare analytics, sourcing data from Azure Synapse and flat files, analyzing medicine usage and effectiveness, displaying geographic distribution using map visuals, and implementing role-based access using RLS.",
    category: "Power BI",
    metrics: [
      { label: "Duration", value: "Jan 2023 - Jul 2023" },
      { label: "Data Sources", value: "Azure Synapse + Files" },
      { label: "Analytics", value: "Medicine Usage + Effectiveness" },
    ],
    technologies: ["Power BI", "Healthcare Analytics", "Azure Synapse", "Data Visualization", "DAX", "BI Reporting"],
  },
  {
    id: "healthcare-data-pipeline",
    title: "Automated Healthcare Data Processing Pipeline",
    description:
      "Built an automated data processing solution to ingest healthcare data from SFTP sources in multiple formats, clean and validate it using Python, and store it securely in Azure Blob Storage for controlled access. Key highlights include SFTP-based data ingestion (CSV, Excel, ZIP), data cleaning and validation using Python, utilizing Azure Notebooks and Blob Storage, and implementing secure, role-based data access.",
    category: "Data Engineering",
    metrics: [
      { label: "Duration", value: "Oct 2021 - Jan 2023" },
      { label: "Ingestion", value: "SFTP Multi-format" },
      { label: "Storage", value: "Azure Blob Storage" },
    ],
    technologies: ["Python", "Azure Blob Storage", "Azure Notebooks", "Data Engineering", "Healthcare Data", "ETL Automation"],
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
