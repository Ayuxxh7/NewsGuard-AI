import React from "react";
import { Link } from "../router.jsx";

export default function ResultCard({ result, signedIn }) {
  const fake = result.label === "FAKE";
  const percent = (result.score * 100).toFixed(1);
  return (
    <section className={"result " + (fake ? "result-fake" : "result-real")} aria-live="polite">
      <div className="result-head">
        <span className="result-icon">{fake ? "✕" : "✓"}</span>
        <div>
          <div className="result-title">{fake ? "Looks like FAKE news" : "Looks like REAL news"}</div>
          <div className="result-sub">Model score: {percent}%</div>
        </div>
      </div>

      <div className="meter" role="img" aria-label={`Model score ${percent} percent`}>
        <div className="meter-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="split">
        <span>REAL {(result.p_real * 100).toFixed(1)}%</span>
        <span>FAKE {(result.p_fake * 100).toFixed(1)}%</span>
      </div>

      {result.uncertain && (
        <div className="note note-warn">The model is not very sure about this text. Please verify it from trusted sources.</div>
      )}
      {result.short_text && (
        <div className="note note-info">
          This text is short. The model was trained on full articles, so it is much less accurate on short headlines. Paste the
          full article for a more reliable estimate.
        </div>
      )}

      <p className="result-foot">
        This is a statistical estimate of writing style, not a fact-check and not proof. The model was trained on mostly US political
        news from around 2016.
      </p>
      {!signedIn && (
        <p className="result-foot">
          <Link to="/login">Log in</Link> to keep your checks in History.
        </p>
      )}
    </section>
  );
}
