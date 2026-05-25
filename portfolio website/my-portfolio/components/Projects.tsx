"use client"

import { motion } from "framer-motion"

const projects = [
  {
    title: "Real-time ETL Pipeline",
    description: "Kafka + Spark Streaming pipeline processing 10M events/day",
    tags: ["Kafka", "Spark", "Python", "AWS"],
    link: "https://github.com/...",
  },
  {
    title: "dbt Data Warehouse",
    description: "Modular dbt project for Snowflake with full lineage docs and CI testing.",
    tags: ["dbt", "Snowflake", "SQL"],
    link: "https://github.com/...",
  },
  {
    title: "Airflow Orchestration",
    description: "100+ DAGs managing ingestion, transforms and alerts across 3 cloud environments.",
    tags: ["Airflow", "Python", "GCP"],
    link: "https://github.com/...",
  },
]

export default function Projects() {
  return (
    <section className="px-8 py-16">
      <p className="font-mono text-accent text-xs tracking-widest mb-2">02 / projects</p>
      <h2 className="text-2xl font-extrabold text-text mb-8">Featured work</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-xl p-5"
          >
            <h3 className="text-text font-bold mb-2">{project.title}</h3>
            <p className="font-mono text-muted text-xs leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-accent bg-bg border border-border px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent hover:underline"
            >
              view on github →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}