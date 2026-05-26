"use client"

import { useEffect, useRef } from "react"

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const accentRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const name = "Tan Yu Hng, Isaac"
    const el = nameRef.current
    if (!el) return

    // Clean up previous runs to prevent character duplicate glitches
    el.innerHTML = ""

    // 1. Accent tag fades in smoothly using Tailwind v4 timing tokens
    const accentTimer = setTimeout(() => {
      if (!accentRef.current) return
      accentRef.current.classList.remove("opacity-0")
      accentRef.current.classList.add("opacity-100")
    }, 100)

    // 2. Character array splits, creates individual inline spans, and staggers in
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

        // Force browser paint synchronization
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            span.style.opacity = "1"
            span.style.transform = "translateY(0) skewY(0deg)"
          })
        })
      })
    }, 300)

    // 3. Subtitle slides up 
    const subtitleTimer = setTimeout(() => {
      if (!subtitleRef.current) return
      subtitleRef.current.classList.remove("opacity-0", "translate-y-2")
      subtitleRef.current.classList.add("opacity-100", "translate-y-0")
    }, 1100)

    // 4. Bio paragraph slides up
    const bioTimer = setTimeout(() => {
      if (!bioRef.current) return
      bioRef.current.classList.remove("opacity-0", "translate-y-2")
      bioRef.current.classList.add("opacity-100", "translate-y-0")
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
      {/* Subtle grid background tracking your crimson custom accent lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,60,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,60,60,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

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
        BSc (Honours) Data Science and Business Analytics
      </h2>

      {/* React Fragment grouping text nodes to resolve adjacent block compilation issues */}
      <>
        {/* Refactored High-Impact Bio */}
        <p
          ref={bioRef}
          className="font-mono text-sm text-text/80 mt-6 max-w-xl relative opacity-0 translate-y-2 transition-all duration-500 ease-out leading-relaxed"
        >
          I am Isaac Tan, a data-driven Data Science student who loves transforming raw, complex data into automated cloud pipelines and high-impact analytics solutions.
        </p>
        
        <p className="font-mono text-xs text-accent mt-4 italic relative">
          // when I&apos;m not on the grind, you&apos;ll find me experimenting with coffee origins or street photography.
        </p>
      </>
    </section>
  )
}