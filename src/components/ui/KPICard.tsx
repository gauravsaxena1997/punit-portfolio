"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import type { KPIMetric } from "@/types";

interface KPICardProps {
  metric: KPIMetric;
  index: number;
}

export default function KPICard({ metric, index }: KPICardProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { count } = useCountUp({
    end: metric.value,
    duration: 2000,
    delay: index * 150,
    enabled: isInView,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-lg)]"
    >
      {/* Gradient accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Background glow effect on hover */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />

      <div className="relative">
        <div className="flex items-baseline gap-1">
          <span
            className="font-mono text-4xl font-bold tracking-tight lg:text-5xl"
            style={{ color: "var(--color-primary)" }}
          >
            {count}
          </span>
          <span
            className="text-2xl font-bold lg:text-3xl"
            style={{ color: "var(--color-primary)" }}
          >
            {metric.suffix}
          </span>
        </div>
        <p
          className="mt-2 text-sm font-medium uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {metric.label}
        </p>
      </div>
    </motion.div>
  );
}
