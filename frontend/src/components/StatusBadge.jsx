import React from "react";

const StatusBadge = ({ status }) => {
  const colorMap = {
    "unverified": "gray",
    "verified": "blue",
    "in-progress": "orange",
    "resolved": "green",
  };

  const style = {
    padding: "2px 8px",
    borderRadius: "12px",
    backgroundColor: colorMap[status.toLowerCase()] || "gray",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "5px"
  };

  return <span style={style}>{status}</span>;
};

export default StatusBadge;
