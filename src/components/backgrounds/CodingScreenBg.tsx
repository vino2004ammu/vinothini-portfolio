export default function CodingScreenBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* High-Definition IDE & Code Screen Background */}
      <img
        src="/images/code_screen.jpg"
        alt="Software Development Code Screen"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.2] transition-all duration-700 ease-out"
        style={{ opacity: 0.45 }}
        loading="lazy"
      />

      {/* Atmospheric Theme-Colored Glow */}
      <div
        className="absolute inset-0 opacity-75 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 800px at 20% 30%, var(--glow-color) 0%, transparent 70%),
            radial-gradient(circle 700px at 80% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* Code Editor Matrix & Technical Lines */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      {/* Balanced Contrast Scrims for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/55 to-[var(--background-color)]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-color)]/85 via-[var(--background-color)]/30 to-[var(--background-color)]/85 pointer-events-none" />
    </div>
  );
}
