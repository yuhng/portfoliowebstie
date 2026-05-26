"use client"

import { useEffect, useRef } from "react"

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const accentRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ── Topology Mesh background ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const NODE_COUNT = 55
    const CONNECT_DIST = 140
    const ACCENT = "255,60,60"

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() > 0.85 ? 2.5 : 1.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })

      // Draw edges
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.45
            ctx.strokeStyle = `rgba(${ACCENT},${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const isBright = n.r > 2
        ctx.fillStyle = isBright
          ? `rgba(${ACCENT},0.9)`
          : `rgba(${ACCENT},0.4)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const onResize = () => { init() }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // ── Text entrance animations ───────────────────────────────────────────────
  useEffect(() => {
    const name = "Tan Yu Hng, Isaac"
    const el = nameRef.current
    if (!el) return

    el.innerHTML = ""

    const accentTimer = setTimeout(() => {
      accentRef.current?.classList.remove("opacity-0")
      accentRef.current?.classList.add("opacity-100")
    }, 100)

    const charTimer = setTimeout(() => {
      name.split("").forEach((ch, i) => {
        const span = document.createElement("span")
        span.textContent = ch === " " ? "\u00a0" : ch
        span.style.cssText = `
          display: inline-block;
          opacity: 0;
          transform: translateY(24px) skewY(2deg);
          transition: opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: ${i * 30}ms;
        `
        el.appendChild(span)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            span.style.opacity = "1"
            span.style.transform = "translateY(0) skewY(0deg)"
          })
        })
      })
    }, 300)

    const subtitleTimer = setTimeout(() => {
      subtitleRef.current?.classList.remove("opacity-0", "translate-y-2")
      subtitleRef.current?.classList.add("opacity-100", "translate-y-0")
    }, 1100)

    const bioTimer = setTimeout(() => {
      bioRef.current?.classList.remove("opacity-0", "translate-y-2")
      bioRef.current?.classList.add("opacity-100", "translate-y-0")
    }, 1350)

    return () => {
      clearTimeout(accentTimer)
      clearTimeout(charTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(bioTimer)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden bg-bg">

      {/* Topology mesh canvas — replaces the static grid div */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* 00 / Accent Tag */}
      <p
        ref={accentRef}
        className="font-mono text-accent text-sm mb-4 relative opacity-0 transition-opacity duration-500 ease-out"
      >
        00 / about me
      </p>

      {/* Main Staggered Name Container */}
      <h1
        ref={nameRef}
        aria-label="Tan Yu Hng, Isaac"
        className="font-display text-6xl md:text-7xl font-extrabold text-text relative leading-tight tracking-wide"
      />

      {/* Degree Subtitle */}
      <h2
        ref={subtitleRef}
        className="font-sans text-xl md:text-2xl text-muted mt-2 relative opacity-0 translate-y-2 transition-all duration-500 ease-out"
      >
        BSc (Honours) Data Science and Business Analytics, UOL-LSE
      </h2>

      <>
        <p
          ref={bioRef}
          className="font-mono text-sm text-text/80 mt-6 max-w-xl relative opacity-0 translate-y-2 transition-all duration-500 ease-out leading-relaxed"
        >
          Helllo ! I am Isaac, always chasing the &apos;Whys&apos; and &apos;Hows&apos; in every problem, driven to build intentional solutions.
        </p>

        <p className="font-mono text-xs text-accent mt-4 italic relative">
          // when I&apos;m not on the grind, you&apos;ll find me experimenting with coffee origins or street photography.
        </p>
      </>
    </section>
  )
}
