import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../auth.jsx";
import ResultCard from "../components/ResultCard.jsx";

const TABS = [
  { id: "text", label: "Paste text" },
  { id: "url", label: "News link" },
  { id: "file", label: "Upload .txt file" },
];

export default function Analyze() {
  const { user } = useAuth();
  const [tab, setTab] = useState("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [samples, setSamples] = useState([]);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    api("/samples/")
      .then((data) => setSamples(data.samples || []))
      .catch(() => setSamples([]));
  }, []);

  function loadSample() {
    if (samples[sampleIndex]) {
      setText(samples[sampleIndex].text);
      setTab("text");
      setError("");
      setResult(null);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    let options;
    if (tab === "text") {
      if (!text.trim()) return setError("Please paste some news text first.");
      options = { method: "POST", json: { text } };
    } else if (tab === "url") {
      if (!url.trim()) return setError("Please paste a news link first.");
      options = { method: "POST", json: { url } };
    } else {
      if (!file) return setError("Please choose a .txt file first.");
      const form = new FormData();
      form.append("file", file);
      options = { method: "POST", form };
    }

    setLoading(true);
    try {
      setResult(await api("/analyze/", options));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">Analyze a news article</h1>
      <p className="page-sub">Choose how you want to give the news, then press Analyze.</p>

      <div className="card">
        <div className="tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={"tab" + (tab === t.id ? " active" : "")}
              onClick={() => {
                setTab(t.id);
                setError("");
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={submit}>
          {tab === "text" && (
            <>
              {samples.length > 0 && (
                <div className="sample-row">
                  <select value={sampleIndex} onChange={(e) => setSampleIndex(Number(e.target.value))} aria-label="Sample article">
                    {samples.map((s, i) => (
                      <option key={s.sample} value={i}>
                        {s.sample}
                      </option>
                    ))}
                  </select>
                  <button type="button" className="btn btn-outline" onClick={loadSample}>
                    Load sample
                  </button>
                </div>
              )}
              <label className="label" htmlFor="news-text">
                News headline or article
              </label>
              <textarea
                id="news-text"
                rows={9}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your news article or headline here..."
              />
            </>
          )}

          {tab === "url" && (
            <>
              <label className="label" htmlFor="news-url">
                Link of the news page
              </label>
              <input
                id="news-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/news/article"
              />
              <p className="hint">The page text is read once on the server. Pages that need a login or are blocked will not work.</p>
            </>
          )}

          {tab === "file" && (
            <>
              <label className="label" htmlFor="news-file">
                Plain-text file (.txt, up to 1 MB)
              </label>
              <input id="news-file" type="file" accept=".txt,text/plain" onChange={(e) => setFile(e.target.files[0] || null)} />
              {file && <p className="hint">Selected: {file.name}</p>}
            </>
          )}

          {error && (
            <div className="note note-warn" role="alert">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Analyzing..." : "🔍 Analyze"}
            </button>
            {tab === "text" && (
              <button type="button" className="btn btn-outline" onClick={() => { setText(""); setResult(null); setError(""); }}>
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {result && <ResultCard result={result} signedIn={!!user} />}
    </div>
  );
}
