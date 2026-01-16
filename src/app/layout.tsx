import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Punit Gauttam | System Engineer & Data Visualization Expert",
  description:
    "Results-driven IT professional with 5+ years of experience specializing in Power BI development, data processing, and visualization. Currently delivering impactful solutions at TCS for Sony Pictures Entertainment.",
  keywords: [
    "Punit Gauttam",
    "System Engineer",
    "Power BI Developer",
    "Data Visualization",
    "Data Analyst",
    "TCS",
    "SQL",
    "Python",
    "Azure Databricks",
    "DAX",
  ],
  authors: [{ name: "Punit Gauttam" }],
  creator: "Punit Gauttam",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Punit Gauttam | System Engineer & Data Visualization Expert",
    description:
      "Results-driven IT professional with 5+ years of experience specializing in Power BI development, data processing, and visualization.",
    siteName: "Punit Gauttam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punit Gauttam | System Engineer & Data Visualization Expert",
    description:
      "Results-driven IT professional with 5+ years of experience specializing in Power BI development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
