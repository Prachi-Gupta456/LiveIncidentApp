import React, { useEffect, useState } from "react";
import { createIncident } from "../services/api";
import { getAddress } from "../services/api";
import '../Styles/report.css'

const ReportIncidentForm = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [success, setSuccess] = useState("");
  const [severity, setSeverity] = useState("low")

  const [pending, setPending] = useState(false)

  // -------------------- auto location ---------------------------------
  const [locationMode, setLocationMode] = useState("gps")
  const [location, setLocation] = useState("Detecting...")
  // -------------------------------------------------------

  // updated changes here =======================================
  useEffect(() => {

    if (locationMode === "gps") {

      navigator.geolocation.getCurrentPosition(async (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

    
        const { address } = await getAddress({ lat, lng })

        if (!address) {
          setLocation("Unavailable")
        }

        setLocation(address)
      },
        (error) => {
          console.log(error.message);
          setLocation("Permission denied");
        }
      )
    }

    else {   //if user types location manually
      setLocation("")
    }

  }, [locationMode])
  // --------------------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();
    setPending(true)

    try {

       const mobile_no = localStorage.getItem("user_contact")
       const user_name = localStorage.getItem("user_name")


      let data = await createIncident({ type, description,location, severity,user_name,mobile_no,media });

      

      setSuccess("Incident reported successfully!");
      setType("");
      setDescription("");
      setMedia(null);

    } catch (error) {
      console.error(error);
    } finally {
      setPending(false)
      setType("");
      setDescription("");
      setMedia(null);
    }


  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ maxWidth: "92%", margin: "auto", "placeSelf": "center" }}>
      <h2>Report an Incident</h2>

      <label>Type:</label>
      <select className="select" value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="Accident">Accident</option>
        <option value="Medical">Medical</option>
        <option value="Fire">Fire</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Crime">Crime</option>
        <option value="Other">Other</option>
      </select>

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      {/* -------------added field here ------------------- */}
      <label>Location Mode:</label>

      <select value={locationMode} onChange={(e) => setLocationMode(e.target.value)}>
        <option value="gps">GPS</option>
        <option value="manual">Enter Manually</option>

      </select>
      {/* -------------------------------- */}

      {/* input field for location */}
      <label>Address:</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      {/* --------------------------------- */}

      {/* select severity */}
      <label>Severity:</label>
      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>

      </select>
      {/* ------------------------- */}

      <label>Media:</label>
      <input type="file" onChange={(e) => setMedia(e.target.files[0])} required />

      <button type="submit" disabled = {pending}>{pending ? "Submitting..." : "Submit"}</button>

      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default ReportIncidentForm;
