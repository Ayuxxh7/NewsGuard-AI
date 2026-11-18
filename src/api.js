// Small helper for talking to the Django backend (all calls go to /api/...).
const TOKEN_KEY = "newsguard_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage may be blocked; the app still works for this visit */
  }
}

export async function api(path, { method = "GET", json, form } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  let body;
  if (form) {
    body = form;
  } else if (json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  }

  let response;
  try {
    response = await fetch(`/api${path}`, { method, headers, body });
  } catch {
    throw new Error("Cannot reach the server. Please check that the backend is running.");
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    /* empty or non-JSON body */
  }
  if (!response.ok) {
    const error = new Error(data.error || "Something went wrong. Please try again.");
    error.status = response.status;
    throw error;
  }
  return data;
}
