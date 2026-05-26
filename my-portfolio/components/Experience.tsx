"use client"

import { useEffect, useRef } from "react"

const experiences = [
  {
    role: "Data Engineer Intern",
    company: "Munich Re",
    period: "June 26 — Present",
    description: "ML & Analytics in Actuarial Science",
    tags: ["Azure", "Databricks", "PySpark", "SQL", "PowerBI"],
  },
  {
    role: "Data Intelligence Analyst Intern",
    company: "Publicis Groupe",
    period: "January 26 — June 26",
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const idx = parseInt(el.dataset.idx ?? "0")
            setTimeout(() => {
              el.classList.add("card-visible")
            }, idx * 110)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: "-60px" }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .exp-card {
          opacity: 0;
          transform: translateX(-14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          position: relative;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 0;
          background-color: #ff3c3c;
          transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .exp-card.card-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .exp-card.card-visible::before {
          height: 100%;
        }
        .exp-card:hover {
          border-color: rgba(255, 60, 60, 0.3) !important;
        }
      `}</style>

      <section className="px-8 py-20 max-w-4xl mx-auto w-full">
        <p className="font-mono text-accent text-xs tracking-widest mb-2">01 / experience</p>
        <h2 className="text-2xl font-extrabold text-text mb-8">Where I&apos;ve worked</h2>

        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              data-idx={i}
              className="exp-card bg-surface border border-border p-6 flex flex-col md:flex-row md:items-start gap-4 transition-colors duration-300"
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
                      className="font-mono text-[10px] text-accent bg-bg border border-border px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
