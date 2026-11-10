import React from 'react';

/**
 * BackgroundGrid
 * Provides an ultra-clean, mild architectural square grid background.
 * Satisfies the request: "பேக்ரவுண்ட்ல லைட்டா ஏதாவது ஸ்கொயர் ஷேப்ல பாக்ஸ் அல்லது லைன் லைனா... மைல்டா தின்னா தான் இருக்கணும்"
 * 
 * Features:
 * - 54px x 54px subtle square grid lines (1px thin, ~3% opacity)
 * - Major blueprint divisions every 216px with soft mustard tint
 * - Minimalist crosshairs (+) at key junctions
 * - Soft radial vignette to keep readability pristine and eliminate harshness
 */
export default function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Ultra-Thin Square Grid Lines (52px x 52px) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.038) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.038) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* Major Technical Subdivision Grid (208px x 208px - 4x4 squares) with Warm Mustard Accent */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '208px 208px',
        }}
      />

      {/* Subtle Crosshair (+) Markers at 208px Junctions */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid-crosshairs"
            width="208"
            height="208"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal line of crosshair */}
            <line
              x1="102"
              y1="104"
              x2="106"
              y2="104"
              stroke="#eab308"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
            {/* Vertical line of crosshair */}
            <line
              x1="104"
              y1="102"
              x2="104"
              y2="106"
              stroke="#eab308"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-crosshairs)" />
      </svg>

      {/* Soft Vignette / Radial Falloff - Keeps content focused and lines mild */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 20%, transparent 20%, rgba(5, 5, 5, 0.4) 65%, #050505 95%),
            radial-gradient(circle at 85% 60%, rgba(234, 179, 8, 0.03), transparent 45%),
            radial-gradient(circle at 15% 40%, rgba(202, 138, 4, 0.02), transparent 40%)
          `,
        }}
      />
    </div>
  );
}
