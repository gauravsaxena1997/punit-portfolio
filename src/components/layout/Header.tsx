"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/cn";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [imageError, setImageError] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      setIsMobileMenuOpen(false);
    },
    []
  );

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "border-[var(--color-border)]"
          : "border-transparent"
      )}
      style={{
        background: isScrolled
          ? "rgba(13, 17, 23, 0.95)"
          : "rgba(13, 17, 23, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav className="container">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo with Profile Picture */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group relative z-10 flex items-center gap-2"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--color-primary)]">
              {!imageError ? (
                <Image
                  src="/avatar.jpg"
                  alt="Punit Gauttam"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient font-bold text-[var(--color-bg-primary)]">
                  PG
                </div>
              )}
            </div>
            <span className="hidden font-semibold text-[var(--color-text-primary)] sm:block">
              Punit Gauttam
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Contact CTA - Desktop */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden rounded-lg bg-gradient px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-primary)] transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-glow)] md:block"
          >
            Get In Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)] md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <HiX className="h-5 w-5" />
            ) : (
              <HiMenuAlt3 className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Solid black */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Fully opaque */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 border-l border-[var(--color-border)] p-6 md:hidden z-50"
              style={{ backgroundColor: "#0d1117", opacity: 1 }}
            >
              {/* Close button inside panel */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)]"
              >
                <HiX className="h-5 w-5" />
              </button>

              <div className="flex h-full flex-col pt-16">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-[var(--color-bg-card)] text-[var(--color-primary)]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text-primary)]"
                        )}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </nav>

                <div className="mt-auto">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="flex w-full items-center justify-center rounded-lg bg-gradient px-5 py-3 text-base font-semibold text-[var(--color-bg-primary)] transition-all duration-200 hover:opacity-90"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
