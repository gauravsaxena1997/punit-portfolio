"use client";

import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail, HiArrowUp } from "react-icons/hi";
import { siteConfig, navLinks } from "@/lib/constants";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [imageError, setImageError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  };

  return (
    <footer
      className="relative border-t"
      style={{
        background: "var(--color-bg-primary)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {/* Brand Column */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="inline-flex items-center gap-2"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--color-primary)]">
                {!imageError ? (
                  <Image
                    src="/profile.jpg"
                    alt="Punit Gauttam"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient font-bold text-[var(--color-bg-primary)]">
                    PG
                  </div>
                )}
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">
                {siteConfig.name}
              </span>
            </a>
            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              System Engineer specializing in Power BI development, data
              processing, and visualization solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm transition-colors duration-200 hover:text-[var(--color-primary)]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--color-primary)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <HiOutlineMail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <a
                href="https://www.linkedin.com/in/gautty97"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--color-primary)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <FaLinkedinIn className="h-4 w-4" />
                LinkedIn Profile
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/in/gautty97"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
                aria-label="Email"
              >
                <HiOutlineMail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--color-primary)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Back to Top
            <HiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
