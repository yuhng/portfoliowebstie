import Hero from "@/components/Hero"
import Projects from "@/components/Projects"

export default function Home() {
  return (
    <main className="bg-bg min-h-screen text-text selection:bg-accent/30">
      {/* 1. Hero / Introduction Section */}
      <Hero />
      
      {/* 2. Your newly fixed Projects Section */}
      <Projects />
    </main>
  )
}