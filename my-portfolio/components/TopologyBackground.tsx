"use client"

import { useEffect, useRef } from "react"

type Props = {
  nodeCount?: number
  connectDist?: number
  maxEdgeAlpha?: number
  speedMultiplier?: number
  className?: string
}

export default function TopologyBackground({
  nodeCount = 55,
  connectDist = 140,
  maxEdgeAlpha = 0.45,
  speedMultiplier = 1,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const ACCENT = "255,60,60"
    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    const init = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.45 * speedMultiplier,
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
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < connectDist) {
            const alpha = (1 - d / connectDist) * maxEdgeAlpha
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
          ? `rgba(${ACCENT},${maxEdgeAlpha * 2})`
          : `rgba(${ACCENT},${maxEdgeAlpha * 0.9})`
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
  }, [nodeCount, connectDist, maxEdgeAlpha, speedMultiplier])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}