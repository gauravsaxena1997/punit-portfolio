"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Technology experience data for column chart
const technologyData = [
  { name: "Power BI", experience: 4.5, color: "#F2C811" },
  { name: "SQL Server", experience: 5.0, color: "#E74856" },
  { name: "Power Automate", experience: 3.5, color: "#4EA8DE" },
  { name: "DAX", experience: 4.0, color: "#F2C811" },
  { name: "SharePoint", experience: 3.0, color: "#01B8AA" },
  { name: "Power Apps", experience: 2.5, color: "#A855F7" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; experience: number; color: string } }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="rounded-lg border px-3 py-2"
        style={{
          background: "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <p
          className="text-xs font-semibold mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          {data.name}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: data.color }}
          />
          <span style={{ color: "var(--color-text-secondary)" }}>
            Experience:
          </span>
          <span className="font-mono font-semibold" style={{ color: data.color }}>
            {data.experience} years
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CareerTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border p-4 md:p-6 h-full flex flex-col"
      style={{
        background: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Technology Experience
        </h3>
        <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          Years of hands-on experience with each technology
        </p>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={technologyData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 6]}
              tick={{ fill: "var(--color-text-tertiary)", fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
              tickFormatter={(value) => `${value} yrs`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-bg-tertiary)' }} />
            <Bar
              dataKey="experience"
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {technologyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insight callout */}
      <div
        className="mt-4 rounded-lg px-3 py-2 text-xs"
        style={{
          background: "var(--color-bg-tertiary)",
          color: "var(--color-text-secondary)",
        }}
      >
        <span style={{ color: "#F2C811" }}>Key Focus:</span> Leveraging AI tools
        for parallel development while continuously expanding expertise in{" "}
        <span className="font-semibold">advanced DAX queries</span> and building
        personal productivity dashboards.
      </div>
    </motion.div>
  );
}
