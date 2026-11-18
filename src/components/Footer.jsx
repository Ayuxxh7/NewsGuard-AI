import React from "react";
import { Link } from "../router.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>NewsGuard AI</strong> · Fake News Detection using NLP
          <div className="footer-note">
            B.Tech CSE mini project, UNSIET, Veer Bahadur Singh Purvanchal University, Jaunpur.
          </div>
        </div>
        <div className="footer-links">
          <Link to="/analyze">Analyze</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Log in</Link>
        </div>
      </div>
      <div className="footer-disclaimer">
        NewsGuard AI estimates writing style, not truth. Always verify important news from trusted sources.
      </div>
    </footer>
  );
}
