export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,106,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,106,247,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <p className="font-mono text-accent text-sm mb-4">00 / about me</p>
      <h1 className="font-sans text-6xl font-extrabold text-text">
        Tan Yu Hng, Isaac
      </h1>
      <h2 className="font-sans text-2xl text-muted mt-2">
        Bsc (Honors) Data Science and Business Analytics 
      </h2>
      <p className="font-mono text-sm text-muted mt-6 max-w-md">
        Hello! I am Isaac, someone who always chasing the "Whys" and "Hows" in every problem.
        When I'm not on the grind, you'll see me as a Barista or Powerlifter!
      </p>
    </section>
  )
}

