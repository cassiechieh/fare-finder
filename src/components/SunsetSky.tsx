/**
 * Decorative hero scene: a sunset over a calm horizon, soft clouds and an
 * airliner climbing along a dashed route. Purely presentational.
 */
export function SunsetSky({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd2b3" />
          <stop offset="0.6" stopColor="#ffb489" />
          <stop offset="1" stopColor="#fb7a43" />
        </radialGradient>
        <radialGradient id="sunHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd2b3" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd2b3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcd8f5" />
          <stop offset="1" stopColor="#8fbbe9" />
        </linearGradient>
      </defs>

      {/* sun */}
      <circle cx="1060" cy="330" r="190" fill="url(#sunHalo)" />
      <circle cx="1060" cy="330" r="92" fill="url(#sun)" />

      {/* clouds */}
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="240" cy="150" rx="90" ry="20" />
        <ellipse cx="290" cy="138" rx="50" ry="22" />
        <ellipse cx="1240" cy="170" rx="80" ry="16" />
        <ellipse cx="1280" cy="160" rx="40" ry="16" />
        <ellipse cx="820" cy="250" rx="110" ry="14" opacity="0.8" />
      </g>

      {/* distant hills + sea */}
      <path
        d="M0 330 C120 300 220 312 320 322 C440 334 520 300 640 306 C760 312 820 334 940 330 L1440 330 L1440 420 L0 420 Z"
        fill="#cfe1f6"
      />
      <rect x="0" y="342" width="1440" height="78" fill="url(#sea)" />
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <line x1="990" y1="362" x2="1130" y2="362" />
        <line x1="1010" y1="382" x2="1110" y2="382" />
        <line x1="1035" y1="400" x2="1085" y2="400" />
      </g>

      {/* flight route */}
      <path
        d="M120 360 C420 300 620 150 960 110"
        fill="none"
        stroke="#1d5fb8"
        strokeWidth="2.5"
        strokeDasharray="2 12"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="120" cy="360" r="6" fill="#ffffff" stroke="#1d5fb8" strokeWidth="2.5" />

      {/* airliner (top view), heading up-right */}
      <g transform="translate(990 104) rotate(-10) scale(2.1)" fill="#1d5fb8">
        <path d="M-22 -2.2 L10 -2.2 L22 -1 Q27 0 22 1 L10 2.2 L-22 2.2 Q-25 0 -22 -2.2 Z" />
        <path d="M-2 -2 L-12 -20 L-6 -20 L10 -2 Z" />
        <path d="M-2 2 L-12 20 L-6 20 L10 2 Z" />
        <path d="M-20 -1.5 L-26 -9 L-22 -9 L-15 -1.5 Z" />
        <path d="M-20 1.5 L-26 9 L-22 9 L-15 1.5 Z" />
      </g>
    </svg>
  );
}
