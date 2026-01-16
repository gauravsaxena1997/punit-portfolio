"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  HiOutlineLightningBolt,
  HiOutlineDatabase,
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineTable,
  HiOutlineUserGroup,
  HiOutlineCheck,
  HiOutlineClock,
} from "react-icons/hi";
import { BiGitBranch } from "react-icons/bi";
import { workflowSteps, powerPlatformConnectors } from "@/lib/constants";

// Using HeroIcons as alternatives for Microsoft icons
const connectorIcons: Record<string, React.ElementType> = {
  sharepoint: HiOutlineDocumentText,
  powerbi: HiOutlineLightningBolt,
  sql: HiOutlineDatabase,
  powerapps: HiOutlineTable,
  outlook: HiOutlineMail,
  excel: HiOutlineTable,
  teams: HiOutlineUserGroup,
  dataverse: HiOutlineDatabase,
  condition: BiGitBranch,
};

const connectorColors: Record<string, string> = {
  sharepoint: "#038387",
  powerbi: "#F2C811",
  sql: "#CC2927",
  powerapps: "#742774",
  outlook: "#0078D4",
  excel: "#217346",
  teams: "#6264A7",
  dataverse: "#00A651",
  condition: "#0078D4",
};

type StepStatus = "pending" | "running" | "succeeded";

interface WorkflowStepProps {
  step: (typeof workflowSteps)[0];
  index: number;
  isLast: boolean;
  status: StepStatus;
}

const WorkflowStep = ({ step, index, isLast, status }: WorkflowStepProps) => {
  const Icon = connectorIcons[step.icon] || HiOutlineLightningBolt;
  const color = connectorColors[step.icon] || "#0078D4";
  const isTrigger = step.type === "trigger";
  const isCondition = step.type === "condition";

  const getStatusStyles = () => {
    switch (status) {
      case "running":
        return {
          borderColor: "#0078D4",
          boxShadow: "0 0 0 2px rgba(0, 120, 212, 0.2)",
        };
      case "succeeded":
        return {
          borderColor: "#10B981",
        };
      default:
        return {
          borderColor: isTrigger ? color : "var(--color-border)",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Connection Line */}
      {!isLast && (
        <div
          className="absolute left-4 top-full h-3 w-0.5 transition-colors duration-300"
          style={{
            background: status === "succeeded" ? "#10B981" : "var(--color-border)",
          }}
        />
      )}

      {/* Step Card */}
      <div
        className={`
          group relative flex items-center gap-3 rounded-md border p-2.5
          transition-all duration-300
          ${isTrigger ? "border-l-[3px]" : ""}
        `}
        style={{
          background: "var(--color-bg-card)",
          borderLeftColor: status === "succeeded" ? "#10B981" : color,
          ...getStatusStyles(),
        }}
      >
        {/* Status Indicator */}
        <div className="absolute -left-1 -top-1">
          {status === "running" && (
            <div className="h-2.5 w-2.5 rounded-full bg-[#0078D4] animate-pulse" />
          )}
          {status === "succeeded" && (
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#10B981]">
              <HiOutlineCheck className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </div>

        {/* Icon Container */}
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md transition-all duration-300"
          style={{
            background: status === "succeeded" ? "#10B98120" : `${color}20`,
          }}
        >
          {status === "running" ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0078D4] border-t-transparent" />
          ) : (
            <Icon
              className="h-4 w-4"
              style={{ color: status === "succeeded" ? "#10B981" : color }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none transition-colors duration-300"
              style={{
                background: status === "succeeded" ? "#10B981" : (isTrigger ? color : `${color}20`),
                color: status === "succeeded" || isTrigger ? "white" : color,
              }}
            >
              {step.type}
            </span>
            <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
              {step.title}
            </span>
            {status === "running" && (
              <span className="text-[10px] text-[#0078D4] font-medium">Running...</span>
            )}
          </div>

          <p
            className="text-xs leading-tight mt-0.5 line-clamp-1 lg:line-clamp-none"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {step.description}
          </p>

          {isCondition && step.branches && (
            <div className="mt-1.5 flex gap-1.5 flex-wrap">
              {step.branches.map((branch, i) => (
                <span
                  key={i}
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    background: i === 0 ? "#10B98120" : "#EF444420",
                    color: i === 0 ? "#10B981" : "#EF4444",
                  }}
                >
                  {i === 0 ? "Yes" : "No"}: {branch}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Flow Run History Panel
const flowRunHistory = [
  { id: 1, time: "2 min ago", status: "Succeeded", duration: "1.2s" },
  { id: 2, time: "15 min ago", status: "Succeeded", duration: "0.9s" },
  { id: 3, time: "1 hour ago", status: "Succeeded", duration: "1.5s" },
  { id: 4, time: "3 hours ago", status: "Succeeded", duration: "1.1s" },
];

export default function Workflow() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [flowRef, flowInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [connectorsRef, connectorsInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    workflowSteps.map(() => "pending")
  );
  const [isFlowRunning, setIsFlowRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runFlow = useCallback(() => {
    if (isFlowRunning) return;

    setIsFlowRunning(true);
    setStepStatuses(workflowSteps.map(() => "pending"));

    workflowSteps.forEach((_, index) => {
      // Set to running
      setTimeout(() => {
        setStepStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[index] = "running";
          return newStatuses;
        });
      }, index * 800);

      // Set to succeeded
      setTimeout(() => {
        setStepStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[index] = "succeeded";
          return newStatuses;
        });

        if (index === workflowSteps.length - 1) {
          setIsFlowRunning(false);
          setHasRun(true);
        }
      }, index * 800 + 600);
    });
  }, [isFlowRunning]);

  // Auto-run when section comes into view
  useEffect(() => {
    if (flowInView && !hasRun && !isFlowRunning) {
      const timer = setTimeout(() => {
        runFlow();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [flowInView, hasRun, isFlowRunning, runFlow]);

  return (
    <section
      id="workflow"
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-1/4 h-64 w-64 rounded-full opacity-5 blur-3xl"
          style={{ background: "#0078D4" }}
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 15 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="mb-6 md:mb-8"
        >
          <span
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#0078D4" }}
          >
            Power Automate
          </span>
          <h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold">
            Workflow
            <span className="text-gradient"> Automation</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Building intelligent automation flows connecting SharePoint, Power BI,
            SQL Server, and Power Apps to streamline business processes.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
          {/* Left: Workflow Visualization */}
          <div ref={flowRef}>
            {/* Flow Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={flowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="mb-3 flex items-center justify-between rounded-lg border px-3 py-2"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2">
                <HiOutlineLightningBolt className="h-4 w-4" style={{ color: "#0078D4" }} />
                <span className="text-sm font-semibold">Report Automation Flow</span>
              </div>
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all duration-300 ${
                  isFlowRunning ? "animate-pulse" : ""
                }`}
                style={{
                  background: isFlowRunning ? "#0078D420" : "#10B98120",
                  color: isFlowRunning ? "#0078D4" : "#10B981",
                }}
              >
                <span className="h-1 w-1 rounded-full bg-current" />
                {isFlowRunning ? "Running" : "Active"}
              </span>
            </motion.div>

            {/* Workflow Steps */}
            <div className="space-y-3">
              {workflowSteps.map((step, index) => (
                <WorkflowStep
                  key={step.id}
                  step={step}
                  index={index}
                  isLast={index === workflowSteps.length - 1}
                  status={stepStatuses[index]}
                />
              ))}
            </div>
          </div>

          {/* Right: Run History & Connectors */}
          <div ref={connectorsRef} className="flex flex-col gap-4">
            {/* Flow Run History Panel */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={connectorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border p-4"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <HiOutlineClock className="h-4 w-4" style={{ color: "#0078D4" }} />
                  Run History
                </h3>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "var(--color-bg-tertiary)", color: "var(--color-text-tertiary)" }}
                >
                  Last 28 days
                </span>
              </div>

              <div className="space-y-2">
                {flowRunHistory.map((run) => (
                  <div
                    key={run.id}
                    className="flex items-center justify-between py-1.5 px-2 rounded-md transition-colors hover:bg-[var(--color-bg-tertiary)]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B98120]">
                        <HiOutlineCheck className="h-3 w-3 text-[#10B981]" />
                      </div>
                      <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                        {run.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#10B981] font-medium">{run.status}</span>
                      <span className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
                        {run.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Connectors Grid */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={connectorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-lg border p-4 flex-1 flex flex-col"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3 className="mb-3 text-sm font-semibold">Power Platform Connectors</h3>

              <div className="grid grid-cols-4 gap-2 flex-1 content-start">
                {powerPlatformConnectors.map((connector, index) => {
                  const Icon = connectorIcons[connector.icon] || HiOutlineDatabase;
                  return (
                    <motion.div
                      key={connector.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={
                        connectorsInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.95 }
                      }
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="group flex flex-col items-center gap-1 rounded-md border p-2 transition-all duration-200 hover:shadow-md"
                      style={{
                        borderColor: "var(--color-border)",
                        background: "var(--color-bg-tertiary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = connector.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                      }}
                    >
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-md transition-transform duration-200 group-hover:scale-105"
                        style={{ background: `${connector.color}20` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: connector.color }} />
                      </div>
                      <span
                        className="text-center text-[10px] font-medium leading-tight"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {connector.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <div
                className="mt-3 flex justify-around border-t pt-3"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="text-center">
                  <div className="font-mono text-lg font-bold" style={{ color: "#0078D4" }}>
                    25+
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
                    Flows
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-bold" style={{ color: "#10B981" }}>
                    40+
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
                    Hrs Saved/Wk
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg font-bold" style={{ color: "#F2C811" }}>
                    8
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
                    Integrations
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
