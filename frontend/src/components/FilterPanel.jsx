import React, { useState } from "react";
import '../Styles/FilterPanel.css'

const FilterPanel = ({ onFilter }) => {

  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [time, setTime] = useState("");

  const handleFilter = () => {
    onFilter({ type, severity, time });
  };

  return (
    <div className="filter">
      <h1 className="filters">Filters</h1>
      <div className="all">
        
        <label>Type:</label>
        <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="Accident">Accident</option>
          <option value="Medical">Medical</option>
          <option value="Fire">Fire</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Crime">Crime</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Severity:</label>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Time:</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">All</option>
          <option value="1">Last 1 hour</option>
          <option value="24">Last 24 hours</option>
          <option value="168">Last 7 days</option>
        </select>
      </div>
      <button className="btn" onClick={handleFilter} style={{ marginTop: "10px" }}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;
