"use client"

import { motion } from "framer-motion"

const links = [
  {
    label: "github",
    value: "github.com/yourhandle",
    href: "https://github.com/yourhandle",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/yourhandle",
    href: "https://linkedin.com/in/yourhandle",
  },
  {
    label: "email",
    value: "you@email.com",
    href: "mailto:you@email.com",
  },
]

export default function Contact() {
  return (
    <section className="px-8 py-16">
      <p className="font-mono text-accent text-xs tracking-widest mb-2">05 / contact</p>
      <h2 className="text-2xl font-extrabold text-text mb-2">Get in touch</h2>
      <p className="font-mono text-muted text-sm mb-10">
        Open to new roles and interesting data problems.
      </p>

      <div className="flex flex-col gap-3 max-w-md">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="flex items-center justify-between bg-surface border border-border rounded-xl px-5 py-4 group hover:border-accent transition-colors duration-200"
          >
            <span className="font-mono text-xs text-muted">{link.label}</span>
            <span className="font-mono text-xs text-text group-hover:text-accent transition-colors duration-200">
              {link.value} →
            </span>
          </motion.a>
        ))}
      </div>

      <p className="font-mono text-xs text-muted mt-16">
        © 2026 Your Name. built with next.js + vercel.
      </p>
    </section>
  )
}