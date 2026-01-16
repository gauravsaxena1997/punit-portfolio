"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { siteConfig } from "@/lib/constants";
import ContactFlow from "@/components/ui/ContactFlow";

const contactInfo = [
  {
    icon: HiOutlineMail,
    label: "Email",
    value: siteConfig.email,
    href: null,
    color: "var(--color-primary)",
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    color: "var(--color-secondary)",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Location",
    value: siteConfig.location,
    href: null,
    color: "var(--color-accent)",
  },
];

const socialLinks = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gautty97",
    color: "#0A66C2",
  },
];

export default function Contact() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });
  const [contentRef, contentInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      className="section relative overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-80 w-80 translate-y-1/2 rounded-full opacity-5 blur-3xl"
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
          className="mb-8 md:mb-12"
        >
          <span
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#0078D4" }}
          >
            Power Automate
          </span>
          <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold">
            Let&apos;s Work
            <span className="text-gradient"> Together</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Send me a message using this automated workflow. Fill in your details
            and your message will be delivered directly to my inbox.
          </p>
        </motion.div>

        {/* Contact Flow Form */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <ContactFlow />
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={
                contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 text-center transition-all duration-300 hover:border-[var(--color-border-hover)]"
            >
              <div className="flex items-center justify-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${info.color}15` }}
                >
                  <info.icon className="h-5 w-5" style={{ color: info.color }} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold">{info.label}</h4>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-xs transition-colors duration-200 hover:text-[var(--color-primary)]"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links & Alternative Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            Or connect with me directly
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] transition-all duration-200 hover:border-transparent hover:shadow-lg"
                style={
                  {
                    "--hover-bg": social.color,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
