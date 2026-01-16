"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const expertiseData = [
  { name: "Data Visualization", value: 40, color: "#F2C811" },
  { name: "Process Automation", value: 25, color: "#4EA8DE" },
  { name: "Database & SQL", value: 25, color: "#E74856" },
  { name: "Cloud & Integration", value: 10, color: "#01B8AA" },
];

export default function ExpertiseDonut() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border p-4"
      style={{
        background: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <h3
        className="mb-2 text-sm font-semibold text-center"
        style={{ color: "var(--color-text-primary)" }}
      >
        Expertise Distribution
      </h3>
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expertiseData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {expertiseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="var(--color-bg-card)"
                  strokeWidth={index === activeIndex ? 0 : 2}
                  style={{
                    transform: index === activeIndex ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "transform 0.2s ease",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Active Segment Display - Below Chart */}
      <div
        className="text-center py-3 px-4 rounded-lg mb-3"
        style={{ background: "var(--color-bg-tertiary)" }}
      >
        <div
          className="text-sm font-semibold mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          {expertiseData[activeIndex].name}
        </div>
        <div
          className="text-2xl font-bold font-mono"
          style={{ color: expertiseData[activeIndex].color }}
        >
          {expertiseData[activeIndex].value}%
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {expertiseData.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 text-xs cursor-pointer rounded px-2 py-1 transition-all ${
              activeIndex === index ? "bg-[var(--color-bg-tertiary)]" : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div
              className="h-2.5 w-2.5 rounded-sm flex-shrink-0"
              style={{ background: item.color }}
            />
            <span
              style={{
                color:
                  activeIndex === index
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
