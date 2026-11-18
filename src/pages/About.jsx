import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const pct = (v) => (typeof v === "number" ? `${(v * 100).toFixed(2)}%` : "-");

export default function About() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api("/model-info/")
      .then(setInfo)
      .catch(() => setInfo(null));
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">About NewsGuard AI</h1>
      <p className="page-sub">A college mini project on fake news detection using Natural Language Processing.</p>

      <div className="card">
        <h2>How it works</h2>
        <p>
          The text is converted to lowercase, links and punctuation are removed, and common words are dropped. It is then turned
          into numbers with <strong>TF-IDF</strong> (single words and word pairs). A <strong>Passive-Aggressive</strong> classifier,
          with calibrated probabilities, gives the REAL or FAKE estimate.
        </p>
        <p>
          NewsGuard AI looks at <em>how the text is written</em>. It does not search the internet and it does not know whether a
          claim is actually true.
        </p>
      </div>

      <div className="card">
        <h2>Measured results</h2>
        {info && info.available ? (
          <>
            <div className="stat-grid">
              <div className="stat"><b>{pct(info.accuracy)}</b><span>Accuracy</span></div>
              <div className="stat"><b>{pct(info.precision)}</b><span>Precision</span></div>
              <div className="stat"><b>{pct(info.recall)}</b><span>Recall</span></div>
              <div className="stat"><b>{pct(info.f1_score)}</b><span>F1-score</span></div>
            </div>
            <p className="hint">
              Measured on {info.test_rows} held-out articles of the dataset "{info.dataset_file}" (REAL is the positive class). On
              headlines alone the accuracy was {pct(info.headline_only_accuracy)}. These numbers describe this dataset only.
            </p>
          </>
        ) : (
          <p className="hint">The results could not be loaded. Please check that the backend is running.</p>
        )}
      </div>

      <div className="card">
        <h2>Limitations</h2>
        <ul className="plain-list">
          {(info ? info.limitations : []).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Technology</h2>
        <p>React (frontend) · Python and Django (backend) · PostgreSQL (database) · scikit-learn and NLP (model).</p>
      </div>
    </div>
  );
}
