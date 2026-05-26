"use client"

import { useEffect, useRef, useState } from "react"

const sections = [
  { id: "about",    label: "00 / about" },
  { id: "experience", label: "01 / experience" },
  { id: "beyond",  label: "02 / beyond" },
  { id: "skills",  label: "03 / skills" },
  { id: "contact", label: "04 / contact" },
]

export default function NavPills() {
  const [active, setActive] = useState<string>("about")
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── IntersectionObserver: track which section is in view ─────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // ── Show/hide on scroll direction ────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY

      // Always hide at very top of page (Hero visible)
      if (current < 80) {
        setVisible(false)
        lastScrollY.current = current
        return
      }

      const scrollingUp = current < lastScrollY.current

      if (scrollingUp) {
        setVisible(true)
        if (hideTimer.current) clearTimeout(hideTimer.current)
        // Auto-hide after 3s of no upward scroll
        hideTimer.current = setTimeout(() => setVisible(false), 3000)
      } else {
        // Scrolling down: hide after short delay
        if (hideTimer.current) clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => setVisible(false), 600)
      }

      lastScrollY.current = current
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <style>{`
        .navpills-wrap {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%) translateY(0px);
          z-index: 9998;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .navpills-wrap.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0px);
        }
        .navpills-wrap:not(.visible) {
          transform: translateX(-50%) translateY(16px);
        }

        .navpill {
          font-family: var(--font-mono, 'Share Tech Mono', monospace);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #444;
          padding: 6px 13px;
          cursor: pointer;
          border: 0.5px solid #1a1a1a;
          background: rgba(15, 15, 15, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          position: relative;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          user-select: none;
          white-space: nowrap;
        }
        .navpill:hover {
          color: #e8e8e8;
          border-color: #333;
        }
        .navpill.active {
          color: #ff3c3c;
          border-color: rgba(255, 60, 60, 0.40);
          background: rgba(255, 60, 60, 0.06);
        }
        .navpill .pip {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1a1a1a;
          flex-shrink: 0;
          transition: background 0.2s ease, box-shadow 0.25s ease;
        }
        .navpill.active .pip {
          background: #ff3c3c;
          box-shadow: 0 0 0 3px rgba(255, 60, 60, 0.18);
        }
      `}</style>

      <nav
        className={`navpills-wrap${visible ? " visible" : ""}`}
        aria-label="Page sections"
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`navpill${active === id ? " active" : ""}`}
            aria-current={active === id ? "true" : undefined}
          >
            <span className="pip" aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
    </>
  )
}
