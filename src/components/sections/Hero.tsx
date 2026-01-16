"use client";

import { motion } from "framer-motion";
import { HiArrowDown, HiLocationMarker } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import KPICard from "@/components/ui/KPICard";
import { siteConfig, kpiMetrics } from "@/lib/constants";

export default function Hero() {
  const handleScrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen h-screen overflow-hidden pt-16 md:pt-20"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <div
          className="absolute -right-40 top-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--color-secondary)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--color-accent)" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px),
                             linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container relative">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-8 md:py-12">
          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Column - Text Content */}
            <div className="order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Status Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: "var(--color-secondary)" }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: "var(--color-secondary)" }}
                    />
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Available for opportunities
                  </span>
                </div>

                {/* Name & Title */}
                <h1 className="mb-4">
                  <span style={{ color: "var(--color-text-primary)" }}>
                    {siteConfig.name}
                  </span>
                </h1>

                <h2
                  className="mb-6 text-xl font-medium md:text-2xl"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span className="text-gradient">{siteConfig.role}</span>
                  <span className="mx-2">at</span>
                  <span style={{ color: "var(--color-text-primary)" }}>
                    TCS
                  </span>
                </h2>

                <p
                  className="mb-5 max-w-xl text-lg leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {siteConfig.description}
                </p>

                {/* Location & Contact */}
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <HiLocationMarker className="h-5 w-5" />
                    <span className="text-sm">{siteConfig.location}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient px-6 py-3 text-base font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-glow)]"
                    style={{ color: "var(--color-bg-primary)" }}
                  >
                    Get In Touch
                  </a>
                  <a
                    href={siteConfig.socials[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-base font-semibold transition-all duration-200 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card)]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    <FaLinkedinIn className="h-5 w-5" />
                    LinkedIn
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-base font-semibold transition-all duration-200 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card)]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    <HiOutlineMail className="h-5 w-5" />
                    Email
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column - KPI Cards */}
            <div className="order-2 lg:order-2">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {kpiMetrics.map((metric, index) => (
                  <KPICard key={metric.label} metric={metric} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={handleScrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Scroll to about section"
          >
            <span className="text-xs font-medium uppercase tracking-wider">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HiArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
