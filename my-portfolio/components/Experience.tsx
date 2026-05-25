"use client"

import { motion } from "framer-motion"

// TODO: Replace "Company Name" and descriptions with your actual internship data
const experiences = [
  {
    role: "Data Engineer Intern",
    company: "Munich Re",
    period: "June 26 — present",
    description: "ML & Analytics in Actuarial Science",
    tags: ["Azure", "Databricks", "PySpark", "SQL", "PowerBI"],
  },
  {
    role: "Data Intelligence Analyst Intern",
    company: "Publicis Groupe",
    period: "January 26 —  June 26",
    description: "Advertising Analytics solutions for APAC PepsiCo & Samsung",
    tags: ["Python", "BigQuery", "GCS", "Data Studio"],
  },
  {
    role: "EA Data Analyst Intern",
    company: "Schneider Electric",
    period: "June 25 — December 25",
    description: "Data Governance Analytics for East Asia Data Office",
    tags: ["Python", "PostgreSQL", "Tableau"],
  },
  {
    role: "Data Analyst Intern",
    company: "Aspial Corporation",
    period: "July 24 — November 24",
    description: "Retail & Pawn Analytics for LeeHwa, GoldHeart & Maxi-Cash",
    tags: ["BigQuery", "PostgreSQL", "Tableau", "PowerBI"],
  },
]

export default function Experience() {
  return (
    <section className="px-8 py-20 max-w-4xl mx-auto w-full">
      <p className="font-mono text-accent text-xs tracking-widest mb-2">01 / experience</p>
      <h2 className="text-2xl font-extrabold text-text mb-8">Where I've worked</h2>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} // Changed from x: -20 to y: 20 for a smoother vertical entry
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-100px" }} // Triggers slightly before entering frame
            className="bg-surface border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-start gap-4 hover:border-accent/30 transition-colors duration-300"
          >
            {/* Left — period */}
            <div className="md:w-36 shrink-0">
              <p className="font-mono text-xs text-muted md:pt-1">{exp.period}</p>
            </div>

            {/* Right — content */}
            <div className="flex-1">
              <h3 className="text-text font-bold text-base mb-0.5">{exp.role}</h3>
              <p className="font-mono text-accent text-xs mb-3">{exp.company}</p>
              <p className="text-muted text-sm leading-relaxed mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-accent bg-bg border border-border px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}