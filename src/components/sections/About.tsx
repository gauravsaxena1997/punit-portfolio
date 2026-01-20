"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  HiOutlineLightningBolt,
  HiOutlineDatabase,
  HiOutlineDocumentText,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import { siteConfig, education } from "@/lib/constants";
import ExpertiseDonut from "@/components/ui/ExpertiseDonut";

const expertise = [
  {
    icon: HiOutlinePresentationChartBar,
    title: "Interactive Dashboards",
    description:
      "Designing and delivering Power BI dashboards with DAX-driven insights, optimized models, and role-based access to support informed business decisions.",
    color: "#F2C811",
  },
  {
    icon: HiOutlineDatabase,
    title: "Data Management",
    description:
      "Modeling, transforming, and validating data using SQL and Power Query to ensure accuracy, performance, and reliable reporting at scale.",
    color: "#CC2927",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Process Automation",
    description:
      "Automating business workflows using Power Automate and Python, including email schedulers and API-enabled processes that reduce manual effort.",
    color: "#0078D4",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Team Collaboration Tools",
    description:
      "Enabling business users through Power Apps and SharePoint solutions that simplify data access, sharing, and operational workflows.",
    color: "#038387",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function About() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });
  const [contentRef, contentInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const [expertiseRef, expertiseInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="section relative overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full opacity-5 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-3xl"
        >
          <span
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-primary)" }}
          >
            About Me
          </span>
          <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold">
            Power Platform &
            <span className="text-gradient"> Data Expert</span>
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {siteConfig.aboutDescription}
          </p>
        </motion.div>

        {/* Main Content Grid - Clean 2 Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column - Bio & Info */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -20 }}
            animate={
              contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Bio Section */}
            <div
              className="text-sm md:text-base leading-relaxed space-y-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p>
                As a data visualization specialist at Tata Consultancy Services, I help
                businesses unlock the power of their data through interactive reports
                and intelligent dashboards that drive decision-making.
              </p>
              <p>
                I create <strong style={{ color: "var(--color-primary)" }}>visual dashboards</strong> with
                advanced DAX queries, design <strong style={{ color: "#0078D4" }}>automated workflows</strong> that
                eliminate manual tasks, and leverage <strong style={{ color: "#CC2927" }}>AI tools</strong> for
                parallel development and building personal productivity dashboards.
              </p>
            </div>

            {/* Education & Core Technologies - Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Education Card */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                <h3 className="mb-4 text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  Education
                </h3>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "var(--color-bg-tertiary)" }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      B.Tech
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {education.degree}
                    </h4>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {education.institution}
                    </p>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {education.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Technologies Card */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                <h3 className="mb-4 text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Power BI", color: "#F2C811" },
                    { name: "DAX", color: "#F2C811" },
                    { name: "Power Automate", color: "#4EA8DE" },
                    { name: "Power Apps", color: "#A855F7" },
                    { name: "SharePoint", color: "#01B8AA" },
                    { name: "SQL", color: "#E74856" },
                    { name: "Python", color: "#3776AB" },
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{
                        background: `${tech.color}20`,
                        color: tech.color,
                        border: `1px solid ${tech.color}40`,
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Donut Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={
              contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ExpertiseDonut />
          </motion.div>
        </div>

        {/* Expertise Cards Row */}
        <motion.div
          ref={expertiseRef}
          variants={containerVariants}
          initial="hidden"
          animate={expertiseInView ? "visible" : "hidden"}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {expertise.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-lg)]"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.color}15` }}
              >
                <item.icon
                  className="h-5 w-5"
                  style={{ color: item.color }}
                />
              </div>
              <h4 className="mb-1.5 text-sm font-semibold">{item.title}</h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
