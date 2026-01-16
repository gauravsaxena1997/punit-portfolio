"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineCheck,
  HiOutlinePaperAirplane,
} from "react-icons/hi";

type StepStatus = "pending" | "active" | "completed" | "running";

interface FlowStep {
  id: string;
  type: "trigger" | "action";
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const flowSteps: FlowStep[] = [
  {
    id: "trigger",
    type: "trigger",
    title: "When contact form is submitted",
    description: "Trigger: Form submission detected",
    icon: HiOutlineLightningBolt,
    color: "#0078D4",
  },
  {
    id: "user-info",
    type: "action",
    title: "Get user information",
    description: "Collect name and email address",
    icon: HiOutlineUser,
    color: "#0078D4",
  },
  {
    id: "message",
    type: "action",
    title: "Compose message",
    description: "Capture message content",
    icon: HiOutlineDocumentText,
    color: "#0078D4",
  },
  {
    id: "send",
    type: "action",
    title: "Send email notification",
    description: "Deliver message via Outlook",
    icon: HiOutlineMail,
    color: "#0078D4",
  },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactFlow() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    flowSteps.map(() => "pending")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Update step statuses based on form completion
  useEffect(() => {
    const newStatuses: StepStatus[] = [...stepStatuses];

    // Step 0: Trigger - active when form has any input
    const hasAnyInput = formData.name || formData.email || formData.message;
    newStatuses[0] = hasAnyInput ? "completed" : "pending";

    // Step 1: User info - completed when name and email are filled
    const hasUserInfo = formData.name.length >= 2 && formData.email.includes("@");
    if (activeField === "name" || activeField === "email") {
      newStatuses[1] = "active";
    } else if (hasUserInfo) {
      newStatuses[1] = "completed";
    } else if (hasAnyInput) {
      newStatuses[1] = "active";
    } else {
      newStatuses[1] = "pending";
    }

    // Step 2: Message - completed when message has content
    const hasMessage = formData.message.length >= 10;
    if (activeField === "message") {
      newStatuses[2] = "active";
    } else if (hasMessage) {
      newStatuses[2] = "completed";
    } else if (hasUserInfo) {
      newStatuses[2] = "active";
    } else {
      newStatuses[2] = "pending";
    }

    // Step 3: Send - ready when all fields are complete
    const isReady = hasUserInfo && hasMessage;
    if (isSubmitting) {
      newStatuses[3] = "running";
    } else if (submitResult?.success) {
      newStatuses[3] = "completed";
    } else if (isReady) {
      newStatuses[3] = "active";
    } else {
      newStatuses[3] = "pending";
    }

    setStepStatuses(newStatuses);
  }, [formData, activeField, isSubmitting, submitResult]);

  const handleSubmit = useCallback(async () => {
    // Validate
    if (formData.name.length < 2) {
      setSubmitResult({ success: false, message: "Please enter your name" });
      return;
    }
    if (!formData.email.includes("@")) {
      setSubmitResult({ success: false, message: "Please enter a valid email" });
      return;
    }
    if (formData.message.length < 10) {
      setSubmitResult({ success: false, message: "Please enter a message (min 10 characters)" });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({ success: true, message: "Message sent successfully!" });
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setSubmitResult(null);
        }, 3000);
      } else {
        setSubmitResult({ success: false, message: result.message });
      }
    } catch {
      setSubmitResult({ success: false, message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const getStepStatusColor = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "active":
        return "#0078D4";
      case "running":
        return "#F2C811";
      default:
        return "var(--color-border)";
    }
  };

  const isFormValid =
    formData.name.length >= 2 &&
    formData.email.includes("@") &&
    formData.message.length >= 10;

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {/* Left: Flow Visualization */}
      <div>
        {/* Flow Header */}
        <div
          className="mb-4 flex items-center justify-between rounded-lg border px-4 py-3"
          style={{
            background: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <HiOutlineLightningBolt className="h-5 w-5" style={{ color: "#0078D4" }} />
            <span className="font-semibold">Contact Form Flow</span>
          </div>
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              isSubmitting ? "animate-pulse" : ""
            }`}
            style={{
              background: submitResult?.success
                ? "#10B98120"
                : isSubmitting
                ? "#F2C81120"
                : "#0078D420",
              color: submitResult?.success
                ? "#10B981"
                : isSubmitting
                ? "#F2C811"
                : "#0078D4",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {submitResult?.success
              ? "Completed"
              : isSubmitting
              ? "Running"
              : "Ready"}
          </span>
        </div>

        {/* Flow Steps */}
        <div className="space-y-3">
          {flowSteps.map((step, index) => {
            const status = stepStatuses[index];
            const Icon = step.icon;
            const isTrigger = step.type === "trigger";
            const statusColor = getStepStatusColor(status);
            const isLast = index === flowSteps.length - 1;

            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {!isLast && (
                  <div
                    className="absolute left-5 top-full h-3 w-0.5 transition-colors duration-300"
                    style={{
                      background:
                        status === "completed" ? "#10B981" : "var(--color-border)",
                    }}
                  />
                )}

                {/* Step Card */}
                <motion.div
                  animate={{
                    borderColor: statusColor,
                    boxShadow:
                      status === "active" || status === "running"
                        ? `0 0 0 2px ${statusColor}30`
                        : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    relative flex items-center gap-3 rounded-lg border p-3
                    transition-all duration-300
                    ${isTrigger ? "border-l-[3px]" : ""}
                  `}
                  style={{
                    background: "var(--color-bg-card)",
                    borderLeftColor: isTrigger ? statusColor : undefined,
                  }}
                >
                  {/* Status Indicator */}
                  <div className="absolute -left-1.5 -top-1.5">
                    <AnimatePresence mode="wait">
                      {status === "running" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="h-3 w-3 rounded-full bg-[#F2C811] animate-pulse"
                        />
                      )}
                      {status === "completed" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981]"
                        >
                          <HiOutlineCheck className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                      {status === "active" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="h-3 w-3 rounded-full bg-[#0078D4]"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300"
                    style={{
                      background:
                        status === "completed"
                          ? "#10B98120"
                          : status === "running"
                          ? "#F2C81120"
                          : `${step.color}20`,
                    }}
                  >
                    {status === "running" ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#F2C811] border-t-transparent" />
                    ) : (
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color:
                            status === "completed"
                              ? "#10B981"
                              : step.color,
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                        style={{
                          background:
                            status === "completed"
                              ? "#10B981"
                              : isTrigger
                              ? step.color
                              : `${step.color}20`,
                          color:
                            status === "completed" || isTrigger ? "white" : step.color,
                        }}
                      >
                        {step.type}
                      </span>
                      <span className="text-sm font-medium truncate">
                        {step.title}
                      </span>
                    </div>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Run History */}
        <div
          className="mt-4 rounded-lg border p-3"
          style={{
            background: "var(--color-bg-tertiary)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: "var(--color-text-tertiary)" }}>
              Flow Status
            </span>
            <span
              style={{
                color: submitResult?.success
                  ? "#10B981"
                  : submitResult && !submitResult.success
                  ? "#EF4444"
                  : "var(--color-text-secondary)",
              }}
            >
              {submitResult
                ? submitResult.message
                : isFormValid
                ? "Ready to send"
                : "Complete all fields"}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Form Inputs */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          background: "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
      >
        {/* Form Header */}
        <div
          className="px-4 py-3 border-b flex items-center gap-2"
          style={{
            background: "#0078D4",
            borderColor: "var(--color-border)",
          }}
        >
          <HiOutlineMail className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">
            Send Message
          </span>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {/* Name Field */}
          <div>
            <label
              className="flex items-center gap-2 text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              <HiOutlineUser className="h-4 w-4" style={{ color: "#0078D4" }} />
              Your Name
              {formData.name.length >= 2 && (
                <HiOutlineCheck className="h-4 w-4 text-[#10B981]" />
              )}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField(null)}
              placeholder="Enter your full name"
              className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none"
              style={{
                background: "var(--color-bg-tertiary)",
                borderColor:
                  activeField === "name"
                    ? "#0078D4"
                    : formData.name.length >= 2
                    ? "#10B981"
                    : "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              className="flex items-center gap-2 text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              <HiOutlineMail className="h-4 w-4" style={{ color: "#0078D4" }} />
              Email Address
              {formData.email.includes("@") && (
                <HiOutlineCheck className="h-4 w-4 text-[#10B981]" />
              )}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setActiveField("email")}
              onBlur={() => setActiveField(null)}
              placeholder="Enter your email address"
              className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none"
              style={{
                background: "var(--color-bg-tertiary)",
                borderColor:
                  activeField === "email"
                    ? "#0078D4"
                    : formData.email.includes("@")
                    ? "#10B981"
                    : "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              className="flex items-center gap-2 text-sm font-medium mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              <HiOutlineDocumentText className="h-4 w-4" style={{ color: "#0078D4" }} />
              Message
              {formData.message.length >= 10 && (
                <HiOutlineCheck className="h-4 w-4 text-[#10B981]" />
              )}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setActiveField("message")}
              onBlur={() => setActiveField(null)}
              placeholder="Write your message here..."
              rows={4}
              className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 outline-none resize-none"
              style={{
                background: "var(--color-bg-tertiary)",
                borderColor:
                  activeField === "message"
                    ? "#0078D4"
                    : formData.message.length >= 10
                    ? "#10B981"
                    : "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
            <div
              className="text-xs mt-1 text-right"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {formData.message.length}/5000
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
            whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
            className={`
              w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3
              font-semibold text-sm transition-all duration-200
              ${
                isFormValid && !isSubmitting
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-60"
              }
            `}
            style={{
              background: submitResult?.success
                ? "#10B981"
                : isSubmitting
                ? "#F2C811"
                : isFormValid
                ? "#0078D4"
                : "var(--color-bg-tertiary)",
              color: isFormValid || isSubmitting ? "white" : "var(--color-text-tertiary)",
            }}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : submitResult?.success ? (
              <>
                <HiOutlineCheck className="h-5 w-5" />
                Sent Successfully!
              </>
            ) : (
              <>
                <HiOutlinePaperAirplane className="h-5 w-5" />
                Run Flow
              </>
            )}
          </motion.button>

          {/* Error Message */}
          <AnimatePresence>
            {submitResult && !submitResult.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg px-4 py-2 text-sm"
                style={{ background: "#EF444420", color: "#EF4444" }}
              >
                {submitResult.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
