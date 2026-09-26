/**
 * Fixed, decorative "antique survey map + engraved harbour" backdrop:
 * aged parchment, faded street grids and a river, a compass rose, dashed
 * airmail-style flight routes from Taipei to Seoul and Tokyo with little
 * planes, and a sepia harbour skyline along the bottom. aria-hidden.
 */

const PLANE =
  "M0 -2 L9 -2 L16 -11 L20 -11 L15 -2 L22 -2 L25 -6 L28 -6 L26 0 L28 6 L25 6 L22 2 L15 2 L20 11 L16 11 L9 2 L0 2 Q-3 0 0 -2 Z";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const ink = "#4a3826";

export function MapBackdrop() {
  const rand = seeded(11);
  const smoke = Array.from({ length: 9 }, (_, i) => ({
    key: i,
    cx: 250 + i * 120 + rand() * 40,
    cy: 700 - rand() * 50,
    rx: 60 + rand() * 60,
    ry: 14 + rand() * 12,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="parchment absolute inset-0" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <pattern
            id="blocksA"
            width="26"
            height="18"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-8)"
          >
            <rect x="2" y="2" width="22" height="14" fill="none" stroke={ink} strokeWidth="0.7" />
          </pattern>
          <pattern
            id="blocksB"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(28)"
          >
            <rect x="2" y="2" width="16" height="16" fill="none" stroke={ink} strokeWidth="0.6" />
          </pattern>
          <pattern id="waterHatch" width="14" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 3 H9" stroke={ink} strokeWidth="0.8" />
          </pattern>
          <filter id="soft" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* faded street grids */}
        <g opacity="0.16">
          <path d="M-40 60 L640 20 L700 520 L-40 600 Z" fill="url(#blocksA)" />
          <path d="M860 -20 L1480 -20 L1480 380 L1160 470 L980 300 Z" fill="url(#blocksB)" />
          <path
            d="M-40 60 L640 20 L700 520 L-40 600 Z"
            fill="none"
            stroke={ink}
            strokeWidth="1.2"
          />
        </g>

        {/* river */}
        <path
          d="M1480 120 C1260 160 1120 250 1040 360 C960 470 1010 560 900 640 C820 700 700 720 560 760 L1480 760 Z"
          fill="#f5ecda"
          opacity="0.75"
        />
        <path
          d="M1480 120 C1260 160 1120 250 1040 360 C960 470 1010 560 900 640 C820 700 700 720 560 760"
          fill="none"
          stroke={ink}
          strokeWidth="1.2"
          opacity="0.35"
        />
        <path
          d="M1480 200 C1300 240 1190 320 1130 420 C1070 520 1080 600 980 680"
          fill="none"
          stroke={ink}
          strokeWidth="0.8"
          strokeDasharray="1 5"
          opacity="0.35"
        />

        {/* contour lines */}
        <g fill="none" stroke={ink} strokeWidth="0.7" opacity="0.14">
          <path d="M60 700 C180 640 300 660 380 620 C460 580 520 600 560 560" />
          <path d="M40 740 C170 690 300 700 390 660 C480 620 560 640 620 600" />
          <path d="M20 780 C160 740 300 740 400 700 C500 660 600 680 680 640" />
        </g>

        {/* flight routes (airmail dashes) */}
        <g fill="none" strokeLinecap="round">
          <path
            d="M200 560 C120 420 180 240 330 150"
            stroke="#8a4b2a"
            strokeWidth="2"
            strokeDasharray="10 8"
            opacity="0.55"
          />
          <path
            d="M200 560 C480 700 900 640 1200 400"
            stroke="#8a4b2a"
            strokeWidth="2"
            strokeDasharray="10 8"
            opacity="0.55"
          />
        </g>
        <g fill="#6b3a20" opacity="0.8">
          <path d={PLANE} transform="translate(179 336) rotate(-72) scale(1.4)" />
          <path d={PLANE} transform="translate(905 567) rotate(-20) scale(1.4)" />
        </g>
        {/* route stops */}
        <g stroke={ink} strokeWidth="1.4" fill="#f5ecda" opacity="0.8">
          <circle cx="200" cy="560" r="7" />
          <circle cx="330" cy="150" r="6" />
          <circle cx="1200" cy="400" r="6" />
        </g>
        <g fill={ink} opacity="0.8">
          <circle cx="200" cy="560" r="2.5" />
          <circle cx="330" cy="150" r="2.2" />
          <circle cx="1200" cy="400" r="2.2" />
        </g>
        <g
          fill={ink}
          opacity="0.55"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="15"
          letterSpacing="6"
          fontStyle="italic"
        >
          <text x="120" y="598">
            TAIPEI
          </text>
          <text x="296" y="128">
            SEOUL
          </text>
          <text x="1160" y="378">
            TOKYO
          </text>
        </g>

        {/* compass rose */}
        <g transform="translate(1270 170)" stroke={ink} opacity="0.4" fill="none">
          <circle r="62" strokeWidth="1" />
          <circle r="54" strokeWidth="0.6" strokeDasharray="2 4" />
          <path d="M0 -76 L10 -10 L0 0 L-10 -10 Z" fill={ink} strokeWidth="0.8" />
          <path d="M0 76 L10 10 L0 0 L-10 10 Z" fill="none" strokeWidth="0.8" />
          <path d="M76 0 L10 10 L0 0 L10 -10 Z" fill="none" strokeWidth="0.8" />
          <path d="M-76 0 L-10 10 L0 0 L-10 -10 Z" fill={ink} strokeWidth="0.8" />
          <path d="M40 -40 L6 -6 M-40 40 L-6 6 M40 40 L6 6 M-40 -40 L-6 -6" strokeWidth="0.8" />
          <text
            y="-84"
            textAnchor="middle"
            fill={ink}
            stroke="none"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="16"
          >
            N
          </text>
        </g>

        {/* map frame with graticule ticks */}
        <g stroke={ink} fill="none" opacity="0.35">
          <rect x="18" y="18" width="1404" height="864" strokeWidth="1.4" />
          <rect x="26" y="26" width="1388" height="848" strokeWidth="0.6" />
          {Array.from({ length: 36 }, (_, i) => (
            <line
              key={`t${i}`}
              x1={40 + i * 39}
              y1="18"
              x2={40 + i * 39}
              y2={i % 3 === 0 ? 34 : 26}
              strokeWidth="0.7"
            />
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <line
              key={`l${i}`}
              x1="18"
              y1={40 + i * 39}
              x2={i % 3 === 0 ? 34 : 26}
              y2={40 + i * 39}
              strokeWidth="0.7"
            />
          ))}
        </g>

        {/* engraved harbour along the bottom */}
        <g opacity="0.3">
          <g fill="#8d7d68" filter="url(#soft)" opacity="0.35">
            {smoke.map((s) => (
              <ellipse key={s.key} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />
            ))}
          </g>
          <path
            d="M0 800 L0 770 L60 770 L60 752 L120 752 L120 764 L180 764 L180 740 L196 740 L196 700 L204 700 L204 740 L240 740 L240 756 L300 756 L300 732 L316 732 L316 690 L326 690 L326 732 L380 732 L380 700 L392 700 L392 660 L404 660 L404 700 L420 700 L420 744 L470 744 L470 724 L530 724 L530 750 L600 750 L600 736 L612 736 L612 684 L622 684 L622 736 L660 736 L660 714 L700 704 L740 714 L740 748 L820 748 L820 730 L870 730 L870 760 L960 760 L960 744 L1030 744 L1030 766 L1120 766 L1120 752 L1200 752 L1200 770 L1300 770 L1300 760 L1440 760 L1440 800 Z"
            fill="#6e5b45"
          />
          {/* water tower */}
          <g stroke="#5b4936" strokeWidth="2" fill="#6e5b45">
            <rect x="452" y="640" width="30" height="34" rx="6" />
            <path
              d="M456 674 L446 744 M478 674 L488 744 M450 700 L484 700 M448 722 L486 722"
              fill="none"
            />
          </g>
          {/* water */}
          <rect x="0" y="800" width="1440" height="100" fill="url(#waterHatch)" opacity="0.35" />
          {/* steamboat */}
          <g fill="#6e5b45" stroke="#5b4936" strokeWidth="1">
            <path d="M560 824 L900 824 L880 846 L585 846 Z" />
            <rect x="600" y="806" width="250" height="18" />
            <rect x="630" y="792" width="170" height="14" />
            <rect x="690" y="748" width="9" height="44" />
            <rect x="712" y="748" width="9" height="44" />
          </g>
          <g fill="none" stroke="#5b4936" strokeWidth="1">
            <path d="M600 806 L600 824 M640 806 V824 M680 806 V824 M720 806 V824 M760 806 V824 M800 806 V824" />
          </g>
        </g>
      </svg>

      {/* vignette + foxing at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_45%,transparent_55%,rgba(92,64,34,0.28)_100%)]" />
    </div>
  );
}
