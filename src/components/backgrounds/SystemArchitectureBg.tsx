export default function SystemArchitectureBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* High-Definition Server & Datacenter Infrastructure Photography */}
      <img
        src="/images/system_server.jpg"
        alt="Server Architecture and Datacenter System"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.15] transition-all duration-700 ease-out"
        style={{ opacity: 0.45 }}
        loading="lazy"
      />

      {/* Dynamic atmospheric radial glow */}
      <div
        className="absolute inset-0 opacity-75 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 750px at 80% 25%, var(--glow-color) 0%, transparent 70%),
            radial-gradient(circle 800px at 20% 75%, rgba(14, 165, 233, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* Server Rack Guides */}
      <svg
        className="absolute w-full h-full inset-0 opacity-20 object-cover pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1">
          <line x1="120" y1="0" x2="120" y2="900" />
          <line x1="240" y1="0" x2="240" y2="900" />
          <line x1="1200" y1="0" x2="1200" y2="900" />
          <line x1="1320" y1="0" x2="1320" y2="900" />
          <line x1="0" y1="180" x2="1440" y2="180" />
          <line x1="0" y1="450" x2="1440" y2="450" />
          <line x1="0" y1="720" x2="1440" y2="720" />
        </g>
      </svg>

      {/* Balanced Contrast Scrims for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-alt)] via-[var(--background-alt)]/55 to-[var(--background-alt)]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-alt)]/85 via-transparent to-[var(--background-alt)]/85 pointer-events-none" />
    </div>
  );
}
