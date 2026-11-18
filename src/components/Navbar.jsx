import React, { useState } from "react";
import Logo from "./Logo.jsx";
import { Link, navigate, usePath } from "../router.jsx";
import { useAuth } from "../auth.jsx";

export default function Navbar() {
  const path = usePath();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/analyze", label: "Analyze" },
    { to: "/about", label: "About" },
  ];
  if (user) links.push({ to: "/history", label: "History" });
  if (user && user.is_admin) links.push({ to: "/dashboard", label: "Dashboard" });

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <button className="nav-toggle" aria-label="Open menu" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </button>

        <div className={"nav-menu" + (open ? " open" : "")}>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={path === l.to ? "active" : ""} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            {user ? (
              <>
                <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
                <button className="btn btn-dark" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-login" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link to="/register" className="btn btn-dark" onClick={() => setOpen(false)}>
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
