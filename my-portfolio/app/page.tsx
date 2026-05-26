import Hero from "@/components/Hero"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import ExtracurricularActivities from "@/components/ExtracurricularActivities"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Hero />
      <Experience />
      <ExtracurricularActivities /> 
      <Skills />
      <Contact />
    </main>
  )
}