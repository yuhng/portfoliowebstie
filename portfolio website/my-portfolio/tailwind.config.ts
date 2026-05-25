import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        border: "#1e1e2e",
        accent: "#7c6af7",
        muted: "#4a4a6a",
        text: "#e2e2f0",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config