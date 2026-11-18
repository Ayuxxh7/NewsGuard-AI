import React, { useState } from "react";
import { Link, navigate } from "../router.jsx";
import { useAuth } from "../auth.jsx";

export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isRegister) await register(name, email, password);
      else await login(email, password);
      navigate("/analyze");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page narrow">
      <div className="card">
        <h1 className="page-title">{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="page-sub">{isRegister ? "An account lets you keep a history of your checks." : "Log in to see your history."}</p>
        <form onSubmit={submit}>
          {isRegister && (
            <>
              <label className="label" htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </>
          )}
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 8 : undefined}
            required
          />
          {isRegister && <p className="hint">At least 8 characters.</p>}
          {error && <div className="note note-warn" role="alert">{error}</div>}
          <button type="submit" className="btn btn-primary full" disabled={busy}>
            {busy ? "Please wait..." : isRegister ? "Sign up" : "Log in"}
          </button>
        </form>
        <p className="switch">
          {isRegister ? (
            <>Already have an account? <Link to="/login">Log in</Link></>
          ) : (
            <>New here? <Link to="/register">Create an account</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
