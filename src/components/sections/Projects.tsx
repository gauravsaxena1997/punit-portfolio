"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  HiOutlineChartBar,
  HiOutlineDatabase,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiArrowRight,
  HiOutlineUserGroup,
  HiOutlineStar,
} from "react-icons/hi";
import { projects } from "@/lib/constants";
import { cn } from "@/lib/cn";

const categoryIcons: Record<string, React.ElementType> = {
  "Power BI": HiOutlineChartBar,
  "Power Automate": HiOutlineLightningBolt,
  "SQL Server": HiOutlineDatabase,
  "Power Apps": HiOutlineShieldCheck,
};

const categoryColors: Record<string, string> = {
  "Power BI": "#F2C811",
  "Power Automate": "#4EA8DE",
  "SQL Server": "#E74856",
  "Power Apps": "#A855F7",
};

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}

const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  const Icon = categoryIcons[project.category] || HiOutlineChartBar;
  const color = categoryColors[project.category] || "var(--color-primary)";
  const isFeatured = project.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-[var(--color-bg-card)] transition-all duration-300 hover:shadow-[var(--shadow-xl)]",
        isFeatured
          ? "border-2 border-[#F2C811] hover:border-[#F2C811]"
          : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
      )}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div
          className="absolute -right-8 top-6 rotate-45 px-10 py-1 text-xs font-bold uppercase tracking-wider"
          style={{ background: "#F2C811", color: "#1a1a2e" }}
        >
          Current
        </div>
      )}

      {/* Top accent bar */}
      <div
        className={cn("w-full", isFeatured ? "h-2" : "h-1")}
        style={{ background: isFeatured ? "linear-gradient(90deg, #F2C811, #0078D4)" : color }}
      />

      <div className={cn("p-6", isFeatured && "md:p-8")}>
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                isFeatured ? "h-14 w-14" : "h-12 w-12"
              )}
              style={{ background: `${color}15` }}
            >
              <Icon className={cn(isFeatured ? "h-7 w-7" : "h-6 w-6")} style={{ color }} />
            </div>
            {isFeatured && (
              <div className="flex items-center gap-1.5 rounded-full bg-[#10B981]/15 px-3 py-1.5">
                <HiOutlineStar className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs font-semibold text-[#10B981]">Featured Project</span>
              </div>
            )}
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: `${color}15`,
              color,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Leadership badge for featured */}
        {isFeatured && project.leadership && (
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}
          >
            <HiOutlineUserGroup className="h-5 w-5 text-[#0078D4]" />
            <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
              {project.leadership}
            </span>
          </div>
        )}

        {/* Title & Description */}
        <h3
          className={cn(
            "mb-2 font-semibold transition-colors duration-300 group-hover:text-[var(--color-primary)]",
            isFeatured ? "text-2xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn("mb-6 leading-relaxed", isFeatured ? "text-base" : "text-sm")}
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Metrics - Power BI KPI Style */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className={cn("rounded-lg text-center", isFeatured ? "p-4" : "p-3")}
              style={{ background: "var(--color-bg-tertiary)" }}
            >
              <div
                className={cn("font-mono font-bold", isFeatured ? "text-xl" : "text-lg")}
                style={{ color }}
              >
                {metric.value}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md px-2.5 py-1 text-xs font-medium"
              style={{
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${color}05 0%, transparent 50%)`,
        }}
      />
    </motion.article>
  );
};

export default function Projects() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });
  const [projectsRef, projectsInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/4 h-80 w-80 rounded-full opacity-5 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <div
          className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full opacity-5 blur-3xl"
          style={{ background: "var(--color-secondary)" }}
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-primary)" }}
          >
            Portfolio
          </span>
          <h2 className="mb-6">
            Featured
            <span className="text-gradient"> Projects</span>
          </h2>
          <p
            className="max-w-2xl text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A showcase of data visualization and analytics projects that
            demonstrate my expertise in Power BI, data engineering, and
            delivering impactful business solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {categories.map((category) => {
            const isActive = activeFilter === category;
            const color =
              category === "all"
                ? "var(--color-primary)"
                : categoryColors[category] || "var(--color-primary)";

            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all duration-200",
                  isActive
                    ? "text-[var(--color-bg-primary)]"
                    : "border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                )}
                style={isActive ? { backgroundColor: color } : undefined}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <div ref={projectsRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={project.featured ? "sm:col-span-2" : ""}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    isInView={projectsInView}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p
            className="mb-4 text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Interested in seeing more of my work?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient px-6 py-3 font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-glow)]"
            style={{ color: "var(--color-bg-primary)" }}
          >
            Let&apos;s Connect
            <HiArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
