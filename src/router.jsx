// A tiny router (history API) so the project needs no extra package.
import React, { useEffect, useState } from "react";

export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("app-navigate"));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    window.addEventListener("app-navigate", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("app-navigate", update);
    };
  }, []);
  return path;
}

export function Link({ to, children, ...rest }) {
  function onClick(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  }
  return (
    <a href={to} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
