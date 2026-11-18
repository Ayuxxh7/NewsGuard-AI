import React, { useEffect, useState } from "react";
import { Link } from "../router.jsx";
import HeroArt from "../components/Hero.jsx";
import { api } from "../api.js";

const STEPS = [
  { n: 1, title: "Paste the news", text: "Paste an article or headline, upload a .txt file, or give a web link." },
  { n: 2, title: "Click Analyze", text: "The text is cleaned and turned into TF-IDF features, then the trained model scores it." },
  { n: 3, title: "Read the result", text: "See REAL or FAKE with a model score and a warning when the model is unsure." },
];

export default function Home() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api("/model-info/")
      .then(setInfo)
      .catch(() => setInfo(null));
  }, []);

  const accuracy = info && info.available ? `${(info.accuracy * 100).toFixed(1)}%` : "95.6%";

  const features = [
    { icon: "⚡", color: "blue", title: "Quick result", text: "The answer comes back in about a second after you press Analyze." },
    { icon: "🎯", color: "violet", title: `${accuracy} on test data`, text: "Measured on held-out articles of its own dataset. Other sources will differ." },
    { icon: "🔗", color: "green", title: "Three ways to check", text: "Paste text, upload a text file, or paste a news link." },
    { icon: "🛡️", color: "orange", title: "Honest warnings", text: "It tells you when a text is short or the model is not sure." },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="badge">✦ Powered by NLP &amp; Machine Learning</span>
          <h1>
            Fake News
            <br />
            <span className="grad">Detection</span>
          </h1>
          <p>
            Check what the writing of a news story looks like. NewsGuard AI uses <strong>Natural Language Processing</strong> to
            estimate whether an article resembles real or fake news.
          </p>
          <div className="hero-buttons">
            <Link to="/analyze" className="btn btn-primary">
              🔍 Analyze News →
            </Link>
            <a href="#how" className="btn btn-outline">
              ▶ Learn More
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <HeroArt />
        </div>
      </section>

      <section className="features" id="features">
        {features.map((f) => (
          <div className="feature" key={f.title}>
            <span className={"feature-icon " + f.color}>{f.icon}</span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="how" id="how">
        <h2>How It Works</h2>
        <p className="how-sub">Just 3 simple steps to check any news article</p>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="step-n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>
          Stay alert. <span>Verify before you share.</span>
        </h2>
        <Link to="/analyze" className="btn btn-light">
          Try it now →
        </Link>
      </section>
    </>
  );
}
