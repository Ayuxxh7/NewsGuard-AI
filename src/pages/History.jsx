import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import { Link } from "../router.jsx";

const SOURCE = { text: "Text", file: "File", url: "Link" };

export default function History() {
  const [items, setItems] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api("/history/"), api("/stats/")])
      .then(([h, s]) => {
        setItems(h.items);
        setStats(s);
      })
      .catch((e) => setError(e.message));
  }, []);

  async function remove(id) {
    try {
      await api(`/history/${id}/`, { method: "DELETE" });
      setItems((list) => list.filter((i) => i.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">Your history</h1>
      <p className="page-sub">Your most recent checks (up to 100).</p>
      {error && <div className="note note-warn">{error}</div>}

      {stats && (
        <div className="stat-grid">
          <div className="stat"><b>{stats.total}</b><span>Total checks</span></div>
          <div className="stat"><b>{stats.real}</b><span>REAL</span></div>
          <div className="stat"><b>{stats.fake}</b><span>FAKE</span></div>
          <div className="stat"><b>{stats.uncertain}</b><span>Not sure</span></div>
        </div>
      )}

      {items === null && !error && <p className="hint">Loading...</p>}
      {items && items.length === 0 && (
        <div className="card">
          <p>No checks yet. <Link to="/analyze">Analyze your first article</Link>.</p>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Source</th><th>Text</th><th>Result</th><th>Score</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{new Date(i.created_at).toLocaleString()}</td>
                  <td>{SOURCE[i.source_type] || i.source_type}</td>
                  <td className="excerpt" title={i.source_ref || i.excerpt}>{i.source_ref || i.excerpt}</td>
                  <td><span className={"pill " + (i.label === "FAKE" ? "pill-fake" : "pill-real")}>{i.label}</span></td>
                  <td>{(i.score * 100).toFixed(1)}%{i.uncertain ? " (not sure)" : ""}</td>
                  <td><button className="link-btn" onClick={() => remove(i.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
