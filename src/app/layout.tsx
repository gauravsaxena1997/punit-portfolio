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
  title: "Punit Gauttam | Senior Data & Power BI Engineer | Power BI & Power Platform",
  description:
    "Delivering enterprise-grade analytics and automation solutions using Power BI and Power Platform. Experienced in building 25+ dashboards and enabling business users through workflow automation across Healthcare, Media & Entertainment, E-commerce and Insurance domains.",
  keywords: [
    "Punit Gauttam",
    "Senior Data Engineer",
    "BI Engineer",
    "Power BI Developer",
    "Power Platform",
    "Data Visualization",
    "Data Analyst",
    "TCS",
    "SQL",
    "Python",
    "Power Automate",
    "Power Apps",
    "SharePoint",
    "DAX",
  ],
  authors: [{ name: "Punit Gauttam" }],
  creator: "Punit Gauttam",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Punit Gauttam | Senior Data & Power BI Engineer | Power BI & Power Platform",
    description:
      "Delivering enterprise-grade analytics and automation solutions using Power BI and Power Platform. Experienced in building 25+ dashboards across Healthcare, Media & Entertainment, E-commerce and Insurance domains.",
    siteName: "Punit Gauttam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punit Gauttam | Senior Data & Power BI Engineer | Power BI & Power Platform",
    description:
      "Delivering enterprise-grade analytics and automation solutions using Power BI and Power Platform. Experienced in building 25+ dashboards across multiple domains.",
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
