import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIncidentById, confirmIncident } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const IncidentPage = () => {

  const { id } = useParams(); // Get incident ID from URL
  const [incident, setIncident] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch incident details
  const fetchIncident = async () => {
    try {
      const data = await getIncidentById(id);
      setIncident(data);
    } catch (error) {
      console.error("Error fetching incident:", error);
    }
  };

  useEffect(() => {
    fetchIncident();
  }, [id]);

  const handleConfirm = async () => {
    try {
      await confirmIncident(id);
      setSuccess("Incident confirmed!");
      fetchIncident(); // Refresh data
    } catch (error) {
      console.error("Error confirming incident:", error);
    }
  };

 

if (!incident) return <p>Loading...</p>;

return (
  <div>
    <h1>{incident.type}</h1>
    <StatusBadge status={incident.status} />

    <br />

    <p><strong>Description:</strong> {incident.description}</p>
    <p><strong>Severity:</strong> {incident.severity}</p>
    <p><strong>Reported at:</strong> {new Date(incident.timestamp).toLocaleString()}</p>

   {incident.notes? <p><strong>Admin Notes : {incident.notes}</strong></p> : null}

    <p><strong>Supported Evidence :</strong></p>
    <br></br>

    { incident.mediaType == "image" ?<img src = {incident.mediaURL} style={{"minHeight": "400px", "maxWidth":"89%",
    "backgroundSize": "cover", "backgroundRepeat": "no-repeat" }}></img>:  <video style = {{"marginTop":"5px","width":"85%","height":"300px"}} controls>
      <source
        src={incident.mediaURL}
        type="video/mp4"
      />
    </video>
      }
      <br/>
   
<button onClick={handleConfirm} style={{ marginTop: "20px" }}>Confirm / Upvote</button>
{ success && <p style={{ color: "green" }}>{success}</p> }
    </div >
  );
};

export default IncidentPage;
