import React from "react";

// Our own illustration: a newspaper, a magnifier and an "NLP" chip.
export default function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 520 380" role="img" aria-label="Newspaper checked with a magnifying glass">
      <defs>
        <linearGradient id="blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c7d2fe" />
          <stop offset="1" stopColor="#ddd6fe" />
        </linearGradient>
        <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <path d="M60 190c0-90 80-150 190-150s210 50 210 140-70 170-200 170S60 280 60 190z" fill="url(#blob)" />
      {/* newspaper */}
      <g transform="rotate(-4 270 190)">
        <rect x="150" y="50" width="230" height="260" rx="14" fill="#fff" stroke="#c7d2fe" strokeWidth="3" />
        <text x="265" y="100" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="34" fill="#0b1b4a">
          NEWS
        </text>
        <rect x="175" y="118" width="180" height="8" rx="4" fill="#cbd5e1" />
        <rect x="175" y="136" width="120" height="8" rx="4" fill="#e2e8f0" />
        <rect x="175" y="165" width="80" height="62" rx="8" fill="#e0e7ff" />
        <circle cx="192" cy="182" r="7" fill="#a5b4fc" />
        <path d="m175 227 24-24 18 14 16-20 22 30z" fill="#a5b4fc" />
        {[165, 183, 201, 219].map((y) => (
          <rect key={y} x="270" y={y} width="85" height="7" rx="3.5" fill="#e2e8f0" />
        ))}
        {[248, 266, 284].map((y) => (
          <rect key={y} x="175" y={y} width="180" height="7" rx="3.5" fill="#e2e8f0" />
        ))}
      </g>
      {/* NLP chip */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={78 + i * 22} y="120" width="6" height="16" rx="3" fill="#60a5fa" />
            <rect x={78 + i * 22} y="208" width="6" height="16" rx="3" fill="#60a5fa" />
            <rect x="62" y={136 + i * 22} width="16" height="6" rx="3" fill="#60a5fa" />
            <rect x="164" y={136 + i * 22} width="16" height="6" rx="3" fill="#60a5fa" />
          </g>
        ))}
        <rect x="74" y="132" width="98" height="84" rx="14" fill="url(#chip)" stroke="#93c5fd" strokeWidth="3" />
        <text x="123" y="185" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="#fff">
          NLP
        </text>
      </g>
      {/* magnifier */}
      <g>
        <circle cx="330" cy="180" r="66" fill="#ffffff55" stroke="#1e1b4b" strokeWidth="12" />
        <rect x="378" y="228" width="22" height="76" rx="11" transform="rotate(-42 389 266)" fill="#1e1b4b" />
        <g transform="rotate(-18 330 180)">
          <rect x="278" y="160" width="104" height="40" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="5" />
          <text x="330" y="190" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="26" fill="#dc2626">
            FAKE
          </text>
        </g>
      </g>
      {/* result chips */}
      <g fontFamily="Inter, sans-serif" fontWeight="700" fontSize="17">
        <rect x="395" y="70" width="120" height="42" rx="21" fill="#ef4444" />
        <text x="455" y="97" textAnchor="middle" fill="#fff">✕  Fake News</text>
        <rect x="395" y="128" width="120" height="42" rx="21" fill="#16a34a" />
        <text x="455" y="155" textAnchor="middle" fill="#fff">✓  Real News</text>
      </g>
    </svg>
  );
}
