import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { usePath, Link } from "./router.jsx";
import { useAuth } from "./auth.jsx";
import Home from "./pages/Home.jsx";
import Analyze from "./pages/Analyze.jsx";
import About from "./pages/About.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import History from "./pages/History.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function NeedLogin() {
  return (
    <div className="page">
      <div className="card">
        <p>
          Please <Link to="/login">log in</Link> to see this page.
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page">
      <h1 className="page-title">Page not found</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default function App() {
  const path = usePath();
  const { user, ready } = useAuth();

  let page;
  if (path === "/") page = <Home />;
  else if (path === "/analyze") page = <Analyze />;
  else if (path === "/about") page = <About />;
  else if (path === "/login") page = <AuthForm mode="login" />;
  else if (path === "/register") page = <AuthForm mode="register" />;
  else if (path === "/history") page = !ready ? null : user ? <History /> : <NeedLogin />;
  else if (path === "/dashboard") page = !ready ? null : user ? <Dashboard /> : <NeedLogin />;
  else page = <NotFound />;

  return (
    <div className="app">
      <Navbar />
      <main>{page}</main>
      <Footer />
    </div>
  );
}
