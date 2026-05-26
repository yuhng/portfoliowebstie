import type { Metadata } from "next"
import "./globals.css"
import ScrollProgress from "@/components/ScrollProgress"

export const metadata: Metadata = {
  title: "Tan Yu Hng, Isaac",
  description: "Portfolio of Isaac",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
