import React from "react";
import { Link } from "react-router-dom";
import '../Styles/home.css';
import FeedPage from "./FeedPage";
import { useEffect } from "react";
const HomePage = () => {

  useEffect(() => {
    if (localStorage.getItem("user_contact")) {
      localStorage.removeItem("user_contact")
    }
    if (localStorage.getItem("user_name")) {
      localStorage.removeItem("user_name")
    }
  }, [])

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Emergency Response App</h1>
        <p className="subtitle">Report, Track, and Respond to Incidents in Real-Time</p>
        <nav className="home-nav">
          <Link to="/report" className="btn">Report an Incident</Link>
          <Link to="/feed" className="btn">View Incident Feed</Link>
          <Link to="/admin" className="btn admin-btn">Admin Panel</Link>
        </nav>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Incident Reporting</h3>
          <p>Easily report incidents with type, description, location, and optional media.</p>
        </div>
        <div className="feature-card">
          <h3>Live Dashboard</h3>
          <p>View incidents in real-time with filters for type, severity, and location.</p>
        </div>
        <div className="feature-card">
          <h3>Verification & De-Duplication</h3>
          <p>Ensure reports are verified and prevent duplicate or false incidents.</p>
        </div>
        <div className="feature-card">
          <h3>Responder/Admin Tools</h3>
          <p>Prioritize, update, and manage incidents from a dedicated admin interface.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
