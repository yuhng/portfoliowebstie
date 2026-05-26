"use client"

import { useEffect, useRef } from "react"

const activities = [
  {
    role: "Barista",
    type: "craft",
    org: "Zerah Coffee Roasters",
    period: "February 2023 - Present",
    description:
      "Precision under pressure. Dialling in espresso ratios, managing rush-hour throughput, and striving to provide the best coffee experience.",
    tags: ["Speciality Coffee", "Customer Experience", "Hospitality"],
  },
  {
    role: "Data Analytics Club",
    type: "passion",
    org: "School",
    period: "September 24 — April 25",
    description:
      "Driving data-driven projects and workshops that provided Healthcare Job Market and NYC Traffic insights.",
    tags: ["Python", "Tableau", "SQL", "Scikit-Learn", "Polars"],
  },
  {
    role: "Assistant Counselling Specialist",
    type: "service",
    org: "SAF Counselling Centre",
    period: "March 21 - February 23",
    description:
      "Performed verbal counselling through the 24-hour SAF Counselling Hotline service to provide essential support to distressed service personnel.",
    tags: ["Peer Support", "Communication", "Psychology"],
  },
]

const typeLabel: Record<string, string> = {
  campus: "// passion",
  craft: "// craft",
  service: "// service",
}

export default function ExtracurricularActivities() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ── Topology Mesh background ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const NODE_COUNT = 40
    const CONNECT_DIST = 120
    const ACCENT = "255,60,60"
    const MAX_ALPHA = 0.20

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    const init = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45 * 0.5,
        vy: (Math.random() - 0.5) * 0.45 * 0.5,
        r: Math.random() > 0.85 ? 2.5 : 1.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * MAX_ALPHA
            ctx.strokeStyle = `rgba(${ACCENT},${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      nodes.forEach((n) => {
        ctx.fillStyle = n.r > 2
          ? `rgba(${ACCENT},${MAX_ALPHA * 2})`
          : `rgba(${ACCENT},${MAX_ALPHA * 0.9})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    const onResize = () => init()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // ── Card entrance animations ──────────────────────────────────────────────
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

      {/*
        - relative: lets the canvas position absolutely inside
        - bg-bg: solid background so sections don't bleed into each other
        - NO overflow-hidden on the section — would clip ::after accent lines
          and the translateX(-14px) card entrance animation
      */}
      <section className="px-8 py-20 max-w-4xl mx-auto w-full relative bg-bg">

        {/*
          Canvas isolated in its own overflow-hidden div.
          Clips the canvas only, leaving card animations untouched.
        */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <p className="font-mono text-accent text-xs tracking-widest mb-2 relative">
          02 / beyond the desk
        </p>
        <h2 className="text-2xl font-extrabold text-text mb-8 relative">
          Outside of work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {activities.map((act, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              data-idx={i}
              className="xcard bg-surface border border-border p-6 flex flex-col gap-4 transition-colors duration-300"
            >
              {/* Type tag — uses act.type which now correctly maps to typeLabel */}
              <p className="font-mono text-[10px] text-accent tracking-widest">
                {typeLabel[act.type] ?? `// ${act.org.toLowerCase()}`}
              </p>

              <div>
                <h3 className="text-text font-bold text-base mb-1">{act.role}</h3>
                <p className="font-mono text-xs text-muted">{act.period}</p>
              </div>

              <p className="font-mono text-xs text-muted leading-relaxed flex-1">
                {act.description}
              </p>

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
