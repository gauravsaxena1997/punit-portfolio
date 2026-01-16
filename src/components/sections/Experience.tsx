"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { HiOutlineBriefcase, HiOutlineCheckCircle } from "react-icons/hi";
import { experiences } from "@/lib/constants";

interface TimelineItemProps {
  experience: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}

const TimelineItem = ({ experience, index, isLast }: TimelineItemProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-6 top-12 hidden h-full w-px md:left-1/2 md:block md:-translate-x-1/2"
          style={{ background: "var(--color-border)" }}
        />
      )}

      {/* Mobile timeline line */}
      {!isLast && (
        <div
          className="absolute left-6 top-12 h-full w-px md:hidden"
          style={{ background: "var(--color-border)" }}
        />
      )}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative flex flex-col md:flex-row md:items-start ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Timeline dot */}
        <div className="absolute left-6 top-0 z-10 hidden -translate-x-1/2 md:left-1/2 md:block">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border-4"
            style={{
              background: "var(--color-bg-card)",
              borderColor: "var(--color-primary)",
            }}
          >
            <HiOutlineBriefcase
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
          </motion.div>
        </div>

        {/* Mobile timeline dot */}
        <div className="absolute left-0 top-0 z-10 md:hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border-4"
            style={{
              background: "var(--color-bg-card)",
              borderColor: "var(--color-primary)",
            }}
          >
            <HiOutlineBriefcase
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
          </motion.div>
        </div>

        {/* Content card */}
        <div
          className={`ml-16 flex-1 md:ml-0 md:w-5/12 ${
            isEven ? "md:pr-16" : "md:pl-16"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? -20 : 20 }
            }
            transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-lg)]"
          >
            {/* Duration badge */}
            <span
              className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-bg-primary)",
              }}
            >
              {experience.duration}
            </span>

            {/* Role & Company */}
            <h3 className="mb-1 text-xl font-semibold">{experience.role}</h3>
            <p
              className="mb-4 font-medium"
              style={{ color: "var(--color-secondary)" }}
            >
              {experience.company}
            </p>

            {/* Description */}
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {experience.description}
            </p>

            {/* Achievements */}
            <div className="mb-4 space-y-2">
              {experience.achievements.slice(0, 3).map((achievement, i) => (
                <div key={i} className="flex items-start gap-2">
                  <HiOutlineCheckCircle
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {achievement}
                  </span>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: "var(--color-bg-tertiary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Empty space for alternating layout on desktop */}
        <div className="hidden flex-1 md:block md:w-5/12" />
      </motion.div>
    </div>
  );
};

export default function Experience() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="experience"
      className="section relative overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-5 blur-3xl"
          style={{ background: "var(--color-accent)" }}
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-primary)" }}
          >
            Career Journey
          </span>
          <h2 className="mb-6">
            Professional
            <span className="text-gradient"> Experience</span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A timeline of my professional journey, highlighting key roles,
            responsibilities, and achievements across leading organizations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12 md:space-y-16">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
