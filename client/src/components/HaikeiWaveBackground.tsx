import React from "react";

export function HaikeiWaveBackground({
  className = "",
  opacity = 0.55,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      {/* Subtle organic layered contour SVG reminiscent of Haikei layered waves / smooth anatomical contours */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="haikei-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2545" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#134074" stopOpacity="0.025" />
            <stop offset="100%" stopColor="#006494" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="haikei-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B4965" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#62B6CB" stopOpacity="0.02" />
          </linearGradient>
          <pattern
            id="medical-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#0B2545" fillOpacity="0.04" />
          </pattern>
        </defs>

        {/* Minimal dot grid overlay for medical precision feel */}
        <rect width="1440" height="700" fill="url(#medical-grid)" />

        {/* Smooth organic wave layer 1 */}
        <path
          d="M0,280 C260,210 440,360 720,290 C1000,220 1200,340 1440,280 L1440,700 L0,700 Z"
          fill="url(#haikei-grad-1)"
        />

        {/* Smooth organic wave layer 2 */}
        <path
          d="M0,380 C320,310 520,440 840,370 C1160,300 1320,410 1440,360 L1440,700 L0,700 Z"
          fill="url(#haikei-grad-2)"
        />

        {/* Delicate contour line reminiscent of anatomical tomographic level curves */}
        <path
          d="M0,280 C260,210 440,360 720,290 C1000,220 1200,340 1440,280"
          stroke="#0B2545"
          strokeWidth="1"
          strokeOpacity="0.07"
          strokeDasharray="4 6"
        />
        <path
          d="M0,380 C320,310 520,440 840,370 C1160,300 1320,410 1440,360"
          stroke="#134074"
          strokeWidth="1"
          strokeOpacity="0.06"
        />
      </svg>
    </div>
  );
}
