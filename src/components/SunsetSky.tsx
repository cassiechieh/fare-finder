/**
 * Decorative hero art, split in two so neither piece gets cropped:
 *  - <FlightRoute>: a dashed route that rises from the lower left, passes just
 *    under the Sign-in button and ends with an airliner climbing to the right.
 *    Keeps its aspect ratio (no cropping) and scales with the width.
 *  - <SunsetHorizon>: sun, clouds, hills and sea along the bottom of the hero.
 * Purely presentational.
 */

export function FlightRoute({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1100 150"
      className={className}
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 142 C230 132 400 40 550 26 C690 14 800 36 900 30"
        fill="none"
        stroke="#1d5fb8"
        strokeWidth="2.5"
        strokeDasharray="2 12"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="20" cy="142" r="6" fill="#ffffff" stroke="#1d5fb8" strokeWidth="2.5" />

      {/* airliner (top view), heading up-right */}
      <g transform="translate(962 22) rotate(-12) scale(2.2)" fill="#1d5fb8">
        <path d="M-22 -2.2 L10 -2.2 L22 -1 Q27 0 22 1 L10 2.2 L-22 2.2 Q-25 0 -22 -2.2 Z" />
        <path d="M-2 -2 L-12 -20 L-6 -20 L10 -2 Z" />
        <path d="M-2 2 L-12 20 L-6 20 L10 2 Z" />
        <path d="M-20 -1.5 L-26 -9 L-22 -9 L-15 -1.5 Z" />
        <path d="M-20 1.5 L-26 9 L-22 9 L-15 1.5 Z" />
      </g>
    </svg>
  );
}

export function SunsetHorizon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 260"
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

      {/* sun, sitting higher above the horizon */}
      <circle cx="1000" cy="150" r="110" fill="url(#sunHalo)" />
      <circle cx="1000" cy="150" r="80" fill="url(#sun)" />

      {/* clouds */}
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="180" cy="110" rx="90" ry="18" />
        <ellipse cx="230" cy="99" rx="48" ry="20" />
        <ellipse cx="1290" cy="118" rx="80" ry="15" />
        <ellipse cx="1330" cy="109" rx="40" ry="15" />
        <ellipse cx="700" cy="150" rx="110" ry="12" opacity="0.8" />
      </g>

      {/* distant hills + sea */}
      <path
        d="M0 176 C120 150 220 160 320 168 C440 178 520 150 640 154 C760 158 820 178 940 176 L1440 176 L1440 260 L0 260 Z"
        fill="#cfe1f6"
      />
      <rect x="0" y="186" width="1440" height="74" fill="url(#sea)" />
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <line x1="930" y1="204" x2="1070" y2="204" />
        <line x1="950" y1="222" x2="1050" y2="222" />
        <line x1="975" y1="238" x2="1025" y2="238" />
      </g>
    </svg>
  );
}
