import React, { useState } from "react";
import '../Styles/adminlogin.css'

const AdminLogin = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hardcoded admin credentials (for demo)
  const ADMIN_EMAIL = "2024ugcs032@gmail.com";
  const ADMIN_PASSWORD = "12345";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      alert("Login successful!");
      if (onSubmit) onSubmit(); // Notify parent (App.jsx) that admin is logged in
    } else {
      alert("Invalid email or password");
    }

    // Clear form
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">
      <h2>Admin Login</h2>

      <div>
        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
        />
      </div>

      <br />

      <div>
        <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          required
        />
      </div>

      <br />

      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
