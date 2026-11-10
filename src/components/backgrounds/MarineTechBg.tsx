export default function MarineTechBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Oceanic & Computer Vision Telemetry Photography */}
      <img
        src="/images/marine_ocean.jpg"
        alt="Marine Ocean Telemetry"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.2] transition-all duration-700 ease-out"
        style={{ opacity: 0.45 }}
        loading="lazy"
      />

      {/* Atmospheric Theme-Colored Glow */}
      <div
        className="absolute inset-0 opacity-75 transition-opacity duration-700"
        style={{
          background: `
            radial-gradient(circle 750px at 15% 25%, rgba(14, 165, 233, 0.2) 0%, transparent 70%),
            radial-gradient(circle 650px at 85% 75%, var(--glow-color) 0%, transparent 70%)
          `,
        }}
      />

      {/* Bathymetric Ocean Contours & Computer Vision Detection Grid */}
      <svg
        className="absolute w-full h-full inset-0 opacity-30 object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="oceanWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="var(--accent-secondary)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="var(--accent-color)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <pattern id="marineGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            <circle cx="60" cy="0" r="1.5" fill="var(--accent-secondary)" opacity="0.4" />
          </pattern>
        </defs>

        {/* Global Detection Mesh */}
        <rect width="100%" height="100%" fill="url(#marineGrid)" />

        {/* Bathymetric Oceanic Wave Contours */}
        <path
          d="M-100 250 C 300 180, 600 340, 1000 240 C 1200 200, 1400 290, 1600 220"
          stroke="url(#oceanWave)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-100 360 C 250 420, 700 280, 1100 390 C 1300 440, 1480 320, 1600 350"
          stroke="url(#oceanWave)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M-100 520 C 400 580, 800 450, 1200 560 C 1350 600, 1500 520, 1600 540"
          stroke="url(#oceanWave)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M-100 680 C 350 620, 750 740, 1150 670 C 1350 630, 1500 700, 1600 660"
          stroke="url(#oceanWave)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* Target Bounding Frame */}
        <g stroke="var(--accent-color)" strokeWidth="1.5" opacity="0.7">
          <path d="M 220 180 L 200 180 L 200 200" fill="none" />
          <path d="M 300 180 L 320 180 L 320 200" fill="none" />
          <path d="M 220 280 L 200 280 L 200 260" fill="none" />
          <path d="M 300 280 L 320 280 L 320 260" fill="none" />
        </g>
      </svg>

      {/* Balanced Contrast Scrims for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/50 to-[var(--background-color)]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-color)]/80 via-transparent to-[var(--background-color)]/80 pointer-events-none" />
    </div>
  );
}
