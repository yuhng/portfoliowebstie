import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0f0f0f",
        border: "#1a1a1a",
        accent: "#ff3c3c",
        muted: "#444444",
        text: "#e8e8e8",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
        sans: ["Share Tech Mono", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
      },
    },
  },
  plugins: [],
}

export default config