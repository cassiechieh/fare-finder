/**
 * Decorative gouache-style window illustration: curtains, a morning sky with a
 * plane, rooftops and a jug of flowers on the sill. Purely presentational.
 */
export function WindowScene({ className = "" }: { className?: string }) {
  const ink = "var(--ink)";
  return (
    <svg
      viewBox="0 0 400 430"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {/* sky */}
      <rect x="62" y="44" width="276" height="326" fill="var(--sky)" />
      <rect x="62" y="44" width="276" height="120" fill="#bcd7f0" opacity="0.6" />

      {/* clouds */}
      <g fill="#fffdf7" opacity="0.95">
        <ellipse cx="118" cy="104" rx="30" ry="10" />
        <ellipse cx="136" cy="96" rx="18" ry="11" />
        <ellipse cx="282" cy="210" rx="32" ry="9" />
        <ellipse cx="298" cy="203" rx="16" ry="9" />
      </g>

      {/* contrail */}
      <path
        d="M78 250 C140 230 190 190 236 142"
        fill="none"
        stroke="#fffdf7"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 12"
      />

      {/* plane */}
      <g
        transform="translate(262 118) rotate(-32)"
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M-6 -5 L-20 -34 L-8 -34 L14 -5 Z" fill="var(--primary)" />
        <path d="M-6 5 L-20 34 L-8 34 L14 5 Z" fill="var(--primary)" />
        <path
          d="M-40 0 Q-40 -8 -30 -8 L28 -8 Q46 -7 50 0 Q46 7 28 8 L-30 8 Q-40 8 -40 0 Z"
          fill="#fffdf7"
        />
        <path d="M-34 -7 L-44 -24 L-36 -24 L-24 -7 Z" fill="var(--berry)" />
        <g fill="var(--primary)" stroke="none">
          <circle cx="-16" cy="-1" r="2" />
          <circle cx="-7" cy="-1" r="2" />
          <circle cx="2" cy="-1" r="2" />
          <circle cx="11" cy="-1" r="2" />
          <circle cx="20" cy="-1" r="2" />
        </g>
      </g>

      {/* rooftops */}
      <g stroke={ink} strokeWidth="1.6" strokeLinejoin="round">
        <rect x="150" y="268" width="14" height="22" fill="var(--berry)" opacity="0.85" />
        <rect x="236" y="262" width="14" height="28" fill="var(--berry)" opacity="0.85" />
        <path d="M62 300 L82 280 L318 280 L338 300 Z" fill="var(--slate)" />
        <rect x="62" y="300" width="276" height="70" fill="#f8efdd" />
      </g>
      <g fill="var(--slate)">
        {[84, 118, 152, 186, 220, 254, 288].map((x) => (
          <g key={x}>
            <rect x={x} y="312" width="12" height="18" rx="1" />
            <rect x={x} y="340" width="12" height="18" rx="1" />
          </g>
        ))}
      </g>

      {/* trees */}
      <g stroke={ink} strokeWidth="1.4">
        <circle cx="74" cy="330" r="22" fill="var(--butter)" />
        <circle cx="98" cy="350" r="18" fill="var(--leaf)" />
        <circle cx="330" cy="334" r="22" fill="var(--butter)" />
        <circle cx="306" cy="352" r="16" fill="var(--leaf)" />
      </g>

      {/* window mullions + frame */}
      <g stroke="#fffdf7" strokeWidth="7" fill="none">
        <line x1="200" y1="44" x2="200" y2="370" />
        <line x1="62" y1="176" x2="338" y2="176" />
        <line x1="62" y1="274" x2="338" y2="274" />
      </g>
      <rect x="56" y="38" width="288" height="338" fill="none" stroke="#fffdf7" strokeWidth="12" />
      <rect x="50" y="32" width="300" height="350" fill="none" stroke={ink} strokeWidth="2" />

      {/* sill */}
      <rect
        x="30"
        y="376"
        width="340"
        height="22"
        rx="3"
        fill="#fffdf7"
        stroke={ink}
        strokeWidth="2"
      />

      {/* curtains */}
      <g stroke={ink} strokeWidth="2" strokeLinejoin="round">
        <path
          d="M10 20 L96 20 C86 110 74 190 62 238 C74 292 86 350 98 420 L10 420 Z"
          fill="#b9d4ef"
        />
        <path
          d="M390 20 L304 20 C314 110 326 190 338 238 C326 292 314 350 302 420 L390 420 Z"
          fill="#b9d4ef"
        />
      </g>
      <g stroke="var(--sky-deep)" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M30 30 C30 120 34 190 40 236 C34 290 30 350 30 412" />
        <path d="M54 30 C52 120 50 190 50 236 C52 290 56 350 60 412" />
        <path d="M370 30 C370 120 366 190 360 236 C366 290 370 350 370 412" />
        <path d="M346 30 C348 120 350 190 350 236 C348 290 344 350 340 412" />
      </g>
      <g fill="var(--butter)" stroke={ink} strokeWidth="1.8">
        <ellipse cx="58" cy="240" rx="12" ry="7" />
        <ellipse cx="342" cy="240" rx="12" ry="7" />
      </g>

      {/* curtain rod */}
      <line x1="6" y1="18" x2="394" y2="18" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="8" cy="18" r="6" fill={ink} />
      <circle cx="392" cy="18" r="6" fill={ink} />

      {/* jug of flowers on the sill */}
      <g transform="translate(-40 0)" stroke={ink} strokeWidth="1.6" strokeLinecap="round">
        <path
          d="M268 336 C262 316 262 300 272 292"
          fill="none"
          stroke="var(--leaf)"
          strokeWidth="2.4"
        />
        <path
          d="M280 336 C282 312 290 298 300 290"
          fill="none"
          stroke="var(--leaf)"
          strokeWidth="2.4"
        />
        <path
          d="M288 338 C300 322 312 314 322 312"
          fill="none"
          stroke="var(--leaf)"
          strokeWidth="2.4"
        />
        <circle cx="272" cy="290" r="8" fill="var(--rose)" />
        <circle cx="300" cy="287" r="8" fill="#fffdf7" />
        <circle cx="323" cy="310" r="7" fill="var(--rose)" />
        <circle cx="286" cy="304" r="6" fill="var(--butter)" />
        <circle cx="258" cy="312" r="6" fill="#fffdf7" />
        <path
          d="M266 344 Q262 336 270 334 L304 334 Q312 336 308 344 Q316 360 306 376 L268 376 Q258 360 266 344 Z"
          fill="#fffdf7"
          strokeWidth="2"
        />
        <path d="M308 346 Q322 350 316 364 Q312 370 306 368" fill="none" strokeWidth="2" />
        <g stroke="var(--primary)" strokeWidth="2.4">
          <line x1="287" y1="346" x2="287" y2="366" />
          <line x1="278" y1="356" x2="296" y2="356" />
          <line x1="280" y1="349" x2="294" y2="363" />
          <line x1="294" y1="349" x2="280" y2="363" />
        </g>
      </g>
    </svg>
  );
}
