"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
import SQLTable from "@/components/ui/SQLTable";
import SkillsRadar from "@/components/ui/SkillsRadar";
import CareerTimeline from "@/components/ui/CareerTimeline";

// Categories matching the SQL data
const categories = [
  { id: "all", label: "All Skills" },
  { id: "Visualization", label: "Visualization" },
  { id: "Database", label: "Database" },
  { id: "Automation", label: "Automation" },
  { id: "ETL", label: "ETL" },
  { id: "Cloud", label: "Cloud" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [chartsRef, chartsInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 bottom-0 h-80 w-80 rounded-full opacity-5 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <div
          className="absolute right-0 top-1/4 h-64 w-64 rounded-full opacity-5 blur-3xl"
          style={{ background: "#0078D4" }}
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-primary)" }}
          >
            Technical Expertise
          </span>
          <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold">
            Skills &<span className="text-gradient"> Proficiency</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A comprehensive overview of my technical skills and expertise levels.
            I specialize in turning complex data into clear, actionable insights
            using industry-leading tools.
          </p>
        </motion.div>

        {/* Charts Row */}
        <motion.div
          ref={chartsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={chartsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8 grid gap-6 lg:grid-cols-3 items-stretch"
        >
          {/* Radar Chart */}
          <div className="lg:col-span-1">
            <SkillsRadar />
          </div>

          {/* Career Timeline */}
          <div className="lg:col-span-2">
            <CareerTimeline />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={chartsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                activeCategory === category.id
                  ? "bg-[var(--color-primary)] text-[var(--color-bg-primary)]"
                  : "border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* SQL Table - Database Style Display */}
        <SQLTable categoryFilter={activeCategory} />
      </div>
    </section>
  );
}
