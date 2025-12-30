import React, { useEffect, useState } from "react";
import IncidentCard from "../components/IncidentCard";
import FilterPanel from "../components/FilterPanel";
import { getIncidents } from "../services/api";
import '../Styles/feed.css'


const FeedPage = () => {

  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);

  // Fetch all incidents from backend
  const fetchIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
      setFilteredIncidents(data);

    } catch (error) {
      console.error("Error fetching incidents:", error.message);
    }
  };

  useEffect(() => {
    fetchIncidents();

    // Optional: real-time updates every 10 seconds
    const interval = setInterval(fetchIncidents, 20000);
    return () => clearInterval(interval);
  }, []);

  // Handle filter changes from FilterPanel
  const handleFilter = (filters) => {
    const { type, severity, time } = filters;

    const filtered = incidents.filter((incident) => {
      let typeMatch = type ? incident.type  === type : true;
      let severityMatch = severity ? incident.severity  === severity  : true;

      let timeMatch = true;
      if (time) {
        const hoursAgo = (new Date() - new Date(incident.timestamp)) / 3600000;
        timeMatch = hoursAgo <= parseInt(time);
      }

      return typeMatch && severityMatch && timeMatch;
    });

    setFilteredIncidents(filtered);
  };

  return (
    <div className="feed-page">
  <h1>Live Incident Feed</h1>

  <div className="top-container">
    <div className="filter-panel-container">
      <FilterPanel onFilter={handleFilter} />
    </div>

  <div className="incident-list">
    {filteredIncidents.map((incident) => (
      <IncidentCard key={incident._id} incident={incident} />
    ))}
  </div>
</div>
</div>


  );
};

export default FeedPage;
