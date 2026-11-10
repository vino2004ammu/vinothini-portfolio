export default function TechHardwareBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* High-Tech System Architecture Photography */}
      <img
        src="/images/tech_hardware.jpg"
        alt="System Architecture & High Performance Computing"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.2] transition-all duration-700 ease-out"
        style={{ opacity: 0.45 }}
        loading="lazy"
      />

      {/* Atmospheric Theme-Colored Scrim */}
      <div
        className="absolute inset-0 opacity-75 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 800px at 70% 30%, var(--glow-color) 0%, transparent 70%),
            radial-gradient(circle 750px at 20% 70%, rgba(14, 165, 233, 0.15) 0%, transparent 70%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      {/* Balanced Contrast Scrims for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-alt)] via-[var(--background-alt)]/55 to-[var(--background-alt)]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-alt)]/85 via-[var(--background-alt)]/35 to-[var(--background-alt)]/85 pointer-events-none" />
    </div>
  );
}
