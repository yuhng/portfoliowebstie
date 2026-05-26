"use client"

import { useEffect, useRef } from "react"

const activities = [
    {
    role: "Barista",
    type: "Zerah Coffee Roasters",
    period: "Febuary 2023 - Present",
    description:
      "Precision under pressure. Dialling in espresso ratios, managing rush-hour throughput, and strive in providing the best coffee experience ",
    tags: ["Speciality Coffee", "Customer Experience", "Ops"],
  },
  {
    role: "Data Analytics Club",
    type: "School",
    period: "September 24 — April 25",
    description:
      "Driving data-driven projects and workshops that provided Healthcare Job Market and NYC Traffic insights",
    tags: ["Python", "Tableau", "SQL", "Scikit-Learn", "Polars"],
  },
  {
    role: "Assistant Counselling Specialist",
    type: "SAF Counselling Centre",
    period: "March 21 - Febuary 23",
    description:
      "Performed verbal counselling through the 24-hour SAF Counselling Hotline service to provide essential counselling support to distressed service personnel",
    tags: ["Peer Support", "Communication", "Psychology"],
  },
]

const typeLabel: Record<string, string> = {
  campus: "// campus",
  craft: "// craft",
  service: "// service",
}

export default function ExtracurricularActivities() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const idx = parseInt(el.dataset.idx ?? "0")
            setTimeout(() => {
              el.classList.add("xcard-visible")
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
        .xcard {
          opacity: 0;
          transform: translateX(-14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          position: relative;
        }
        .xcard::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 2px;
          height: 0;
          background-color: #ff3c3c;
          transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .xcard.xcard-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .xcard.xcard-visible::after {
          height: 100%;
        }
        .xcard:hover {
          border-color: rgba(255, 60, 60, 0.3) !important;
        }
      `}</style>

      <section className="px-8 py-20 max-w-4xl mx-auto w-full">
        <p className="font-mono text-accent text-xs tracking-widest mb-2">
          02.5 / beyond the desk
        </p>
        <h2 className="text-2xl font-extrabold text-text mb-8">
          Outside the grind
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activities.map((act, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              data-idx={i}
              className="xcard bg-surface border border-border p-6 flex flex-col gap-4 transition-colors duration-300"
            >
              {/* Type tag */}
              <p className="font-mono text-[10px] text-accent tracking-widest">
                {typeLabel[act.type]}
              </p>

              {/* Role + period */}
              <div>
                <h3 className="text-text font-bold text-base mb-1">{act.role}</h3>
                <p className="font-mono text-xs text-muted">{act.period}</p>
              </div>

              {/* Description */}
              <p className="font-mono text-xs text-muted leading-relaxed flex-1">
                {act.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {act.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-accent bg-bg border border-border px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
