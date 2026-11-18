import React from "react";

export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path d="M32 4 56 13v18c0 15-10 25-24 29C18 56 8 46 8 31V13z" fill="url(#lg)" />
      <path d="m21 32 8 8 15-17" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-text">
        <strong>
          NewsGuard<span> AI</span>
        </strong>
        <small>Detect · Verify · Stay informed</small>
      </span>
    </span>
  );
}
