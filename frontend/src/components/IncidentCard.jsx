import React from "react";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
import '../Styles/IncidentCard.css'

const IncidentCard = ({ incident }) => {

  const { _id, type, description, severity, status, timestamp } = incident;

  // Format time (e.g., "5 mins ago")
  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000); // seconds
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Color based on severity
  const severityColor = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  return (
    <div className="incident">
      <Link to={`/incident/${_id}`}>
        <h3 className="h">{type}</h3>
        <p>{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
        <p>Reported: {timeAgo(timestamp)}</p>
        <StatusBadge status={status} />
      </Link>
    </div>
  );
};

export default IncidentCard;
