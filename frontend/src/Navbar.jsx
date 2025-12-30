import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../src/Styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/"></Link>
      </div>
      <nav className="navbar-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname === "/feed" ? "active" : ""} to="/feed">Feed</Link>
        <Link className={location.pathname === "/report" ? "active" : ""} to="/report">Report</Link>
        <Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Navbar;
