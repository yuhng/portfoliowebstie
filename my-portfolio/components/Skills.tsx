"use client"

import { motion } from "framer-motion"
import TopologyBackground from "@/components/TopologyBackground"

const skillGroups = [
  {
    category: "Programming",
    skills: ["Python: Pandas, Polars, PySpark", "SQL: Postgres, BigQuery, MySQL"],
  },
  {
    category: "Data Visualization",
    skills: ["Tableau", "PowerBI", "Data Studio"],
  },
  {
    category: "Transformation",
    skills: ["Informatica", "Dbt"],
  },
  {
    category: "AI/ML Frameworks",
    skills: ["Scikit-Learn", "LangChain"],
  },
  {
    category: "Cloud Platforms",
    skills: ["AWS", "GCP", "Azure", "Databricks"],
  },
  {
    category: "Certifications",
    skills: ["IBM AI Engineering", "dbt Fundamentals", "Databricks GenAI Fundamentals", "Google Advanced Data Analytics"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="px-8 py-16 relative overflow-hidden">
      <TopologyBackground nodeCount={30} maxEdgeAlpha={0.15} speedMultiplier={0.4} />
      <p className="font-mono text-accent text-xs tracking-widest mb-2">03 / skills</p>
      <h2 className="text-2xl font-extrabold text-text mb-8">Tech stack</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-xl p-4"
          >
            <p className="font-mono text-accent text-xs tracking-widest mb-3">
              {group.category}
            </p>
            <div className="flex flex-col gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}