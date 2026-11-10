interface HeroWorkspaceBgProps {
  imageSrc?: string;
  opacity?: number;
}

export default function HeroWorkspaceBg({
  imageSrc = '/images/hero_workspace.jpg',
  opacity = 0.65,
}: HeroWorkspaceBgProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* High-Resolution Developer Workspace Photography - Visible & Vibrant */}
      <img
        src={imageSrc}
        alt="Developer Workspace & System Setup"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.15] transition-all duration-700 ease-out"
        style={{
          opacity: opacity,
        }}
        loading="eager"
      />

      {/* Atmospheric Theme-Colored Ambient Scrim */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 30%, transparent 10%, var(--background-color) 92%),
            radial-gradient(circle 600px at 80% 20%, var(--glow-color) 0%, transparent 75%),
            radial-gradient(circle 700px at 15% 75%, rgba(14, 165, 233, 0.15) 0%, transparent 75%)
          `,
        }}
      />

      {/* Balanced Legibility Gradients - Guarantees 100% Crisp Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/45 to-[var(--background-color)]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-color)]/80 via-transparent to-[var(--background-color)]/80 pointer-events-none" />

      {/* Subtle Digital Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
    </div>
  );
}
