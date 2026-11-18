import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../auth.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/admin/stats/")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (!user || !user.is_admin) {
    return (
      <div className="page">
        <div className="note note-warn">This page is only for admin accounts.</div>
      </div>
    );
  }

  const maxDay = data ? Math.max(1, ...data.per_day.map((d) => d.total)) : 1;
  const fakeShare = data && data.total ? Math.round((data.fake / data.total) * 100) : 0;

  return (
    <div className="page">
      <h1 className="page-title">Admin dashboard</h1>
      <p className="page-sub">Usage of the site so far (all visitors).</p>
      {error && <div className="note note-warn">{error}</div>}
      {!data && !error && <p className="hint">Loading...</p>}

      {data && (
        <>
          <div className="stat-grid">
            <div className="stat"><b>{data.total}</b><span>Total checks</span></div>
            <div className="stat"><b>{data.users}</b><span>Registered users</span></div>
            <div className="stat"><b>{data.fake}</b><span>Predicted FAKE ({fakeShare}%)</span></div>
            <div className="stat"><b>{data.real}</b><span>Predicted REAL</span></div>
          </div>

          <div className="card">
            <h2>Checks in the last 14 days</h2>
            {data.per_day.length === 0 ? (
              <p className="hint">No checks yet.</p>
            ) : (
              <div className="bars">
                {data.per_day.map((d) => (
                  <div className="bar-col" key={d.day} title={`${d.day}: ${d.total} checks, ${d.fake} FAKE`}>
                    <div className="bar-value">{d.total}</div>
                    <div className="bar" style={{ height: `${(d.total / maxDay) * 100}%` }} />
                    <div className="bar-label">{d.day.slice(5)}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="hint">
              By source: text {data.by_source.text || 0}, file {data.by_source.file || 0}, link {data.by_source.url || 0}.
            </p>
          </div>

          <div className="card table-wrap">
            <h2>Latest checks</h2>
            <table>
              <thead><tr><th>Date</th><th>User</th><th>Text</th><th>Result</th><th>Score</th></tr></thead>
              <tbody>
                {data.recent.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.created_at).toLocaleString()}</td>
                    <td>{r.user}</td>
                    <td className="excerpt">{r.source_ref || r.excerpt}</td>
                    <td><span className={"pill " + (r.label === "FAKE" ? "pill-fake" : "pill-real")}>{r.label}</span></td>
                    <td>{(r.score * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
