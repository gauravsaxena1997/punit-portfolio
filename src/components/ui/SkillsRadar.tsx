"use client";

import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const skillsData = [
  { skill: "Power BI", value: 90, fullMark: 100 },
  { skill: "DAX", value: 85, fullMark: 100 },
  { skill: "Power Automate", value: 70, fullMark: 100 },
  { skill: "Power Apps", value: 65, fullMark: 100 },
  { skill: "SQL", value: 60, fullMark: 100 },
  { skill: "SharePoint", value: 60, fullMark: 100 },
  { skill: "Python", value: 55, fullMark: 100 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { skill: string } }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg border px-3 py-2 text-sm"
        style={{
          background: "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
          {payload[0].payload.skill}
        </p>
        <p style={{ color: "#F2C811" }}>
          Proficiency: <span className="font-mono font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SkillsRadar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border p-4 h-full flex flex-col"
      style={{
        background: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <h3 className="mb-2 text-sm font-semibold text-center" style={{ color: "var(--color-text-primary)" }}>
        Core Competencies
      </h3>
      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
            <PolarGrid
              stroke="var(--color-border)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: "var(--color-text-secondary)",
                fontSize: 11,
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{
                fill: "var(--color-text-tertiary)",
                fontSize: 10,
              }}
              tickCount={5}
              axisLine={false}
            />
            <Radar
              name="Proficiency"
              dataKey="value"
              stroke="#F2C811"
              fill="#F2C811"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#F2C811",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: "#F2C811",
                stroke: "var(--color-bg-card)",
                strokeWidth: 2,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p
        className="text-center text-xs mt-1"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        Hover to see proficiency levels
      </p>
    </motion.div>
  );
}
