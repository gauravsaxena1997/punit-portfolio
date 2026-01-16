"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  HiOutlineTable,
  HiOutlineDatabase,
  HiChevronDown,
  HiChevronUp,
  HiOutlineServer,
} from "react-icons/hi";
import { sqlSkillsData } from "@/lib/constants";

interface SQLTableProps {
  categoryFilter?: string;
}

export default function SQLTable({ categoryFilter = "all" }: SQLTableProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [sortColumn, setSortColumn] = useState<string>("proficiency");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Filter data based on category
  const filteredData = useMemo(() => {
    if (categoryFilter === "all") return sqlSkillsData;
    return sqlSkillsData.filter(
      (skill) => skill.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }, [categoryFilter]);

  // Sort the filtered data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn as keyof typeof a];
      const bVal = b[sortColumn as keyof typeof b];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Generate dynamic WHERE clause for display
  const getWhereClause = () => {
    if (categoryFilter === "all") {
      return (
        <>
          <span style={{ color: "#DCDCAA" }}>proficiency</span>{" "}
          <span style={{ color: "#D4D4D4" }}>&gt;=</span>{" "}
          <span style={{ color: "#B5CEA8" }}>75</span>
        </>
      );
    }
    return (
      <>
        <span style={{ color: "#DCDCAA" }}>category</span>{" "}
        <span style={{ color: "#D4D4D4" }}>=</span>{" "}
        <span style={{ color: "#CE9178" }}>&apos;{categoryFilter}&apos;</span>
      </>
    );
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <HiChevronUp className="h-3 w-3" />
    ) : (
      <HiChevronDown className="h-3 w-3" />
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border overflow-hidden"
      style={{
        background: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* SQL Server Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "#CC2927" }}
      >
        <div className="flex items-center gap-2">
          <HiOutlineServer className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">
            SQL Server Management Studio
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Query Editor */}
      <div
        className="border-b p-4"
        style={{
          background: "#1E1E1E",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium"
            style={{ background: "#10B98120", color: "#10B981" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Query executed successfully
          </span>
        </div>
        <pre
          className="text-sm font-mono leading-relaxed overflow-x-auto"
          style={{ color: "#9CDCFE" }}
        >
          <span style={{ color: "#569CD6" }}>SELECT</span>{" "}
          <span style={{ color: "#DCDCAA" }}>id</span>,{" "}
          <span style={{ color: "#DCDCAA" }}>skill_name</span>,{" "}
          <span style={{ color: "#DCDCAA" }}>category</span>,{" "}
          <span style={{ color: "#DCDCAA" }}>proficiency</span>,{" "}
          <span style={{ color: "#DCDCAA" }}>years_exp</span>
          {"\n"}
          <span style={{ color: "#569CD6" }}>FROM</span>{" "}
          <span style={{ color: "#4EC9B0" }}>dbo.Skills</span>
          {"\n"}
          <span style={{ color: "#569CD6" }}>WHERE</span>{" "}
          {getWhereClause()}
          {"\n"}
          <span style={{ color: "#569CD6" }}>ORDER BY</span>{" "}
          <span style={{ color: "#DCDCAA" }}>{sortColumn}</span>{" "}
          <span style={{ color: "#569CD6" }}>{sortDirection.toUpperCase()}</span>;
        </pre>
      </div>

      {/* Results Tab Bar */}
      <div
        className="flex items-center gap-4 border-b px-4"
        style={{
          background: "var(--color-bg-tertiary)",
          borderColor: "var(--color-border)",
        }}
      >
        <div
          className="flex items-center gap-1.5 border-b-2 py-2 text-sm font-medium"
          style={{
            borderColor: "#CC2927",
            color: "var(--color-text-primary)",
          }}
        >
          <HiOutlineTable className="h-4 w-4" />
          Results
        </div>
        <div
          className="flex items-center gap-1.5 py-2 text-sm"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <HiOutlineDatabase className="h-4 w-4" />
          Messages
        </div>
        <span
          className="ml-auto text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {sortedData.length} rows returned
        </span>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--color-bg-tertiary)" }}>
              {[
                { key: "id", label: "id" },
                { key: "skill_name", label: "skill_name" },
                { key: "category", label: "category" },
                { key: "proficiency", label: "proficiency" },
                { key: "years_exp", label: "years_exp" },
                { key: "certifications", label: "certifications" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="cursor-pointer px-4 py-2 text-left font-mono text-xs font-medium transition-colors hover:bg-[var(--color-bg-card)]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon column={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  No rows returned for the selected category
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-t transition-colors hover:bg-[var(--color-bg-tertiary)]"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <td
                    className="px-4 py-2 font-mono text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {row.id}
                  </td>
                  <td
                    className="px-4 py-2 font-mono text-xs font-medium"
                    style={{ color: "#4EC9B0" }}
                  >
                    {row.skill_name}
                  </td>
                  <td
                    className="px-4 py-2 font-mono text-xs"
                    style={{ color: "#CE9178" }}
                  >
                    {row.category}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 w-16 rounded-full overflow-hidden"
                        style={{ background: "var(--color-bg-tertiary)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView
                              ? { width: `${row.proficiency}%` }
                              : { width: 0 }
                          }
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              row.proficiency >= 90
                                ? "#10B981"
                                : row.proficiency >= 80
                                ? "#F2C811"
                                : "#F59E0B",
                          }}
                        />
                      </div>
                      <span style={{ color: "#B5CEA8" }}>{row.proficiency}</span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-2 font-mono text-xs"
                    style={{ color: "#B5CEA8" }}
                  >
                    {row.years_exp}
                  </td>
                  <td
                    className="px-4 py-2 font-mono text-xs"
                    style={{ color: "#B5CEA8" }}
                  >
                    {row.certifications}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs"
        style={{
          background: "var(--color-bg-tertiary)",
          color: "var(--color-text-tertiary)",
        }}
      >
        <span>Connected to: PunitGauttam_Portfolio_DB</span>
        <span>Rows: {sortedData.length} | Execution time: 0.023s</span>
      </div>
    </motion.div>
  );
}
