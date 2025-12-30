import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Change to your backend URL

// modified create-incident-------------------
export const createIncident = async (data) => {

  const form = new FormData()

  form.append("type", data.type)
  form.append("description", data.description)
   form.append("location", data.location)
   form.append("user_name",data.user_name)
   form.append("contact",data.mobile_no)
   form.append("severity", data.severity)
  form.append("media", data.media)

  let result = await axios.post(`${API_URL}/create-incident`, form);

  return result.data
};
// ----------------------------------------------

// ---------------get address ----------------
export const getAddress = async ({ lat, lng }) => {
  const result = await axios.get(`${API_URL}/reverse-geocode?lat=${lat}&lng=${lng}`)
  return result.data
}
// ------------------------------------------------

export const getIncidents = async () => {
  try {
    const result = await axios.get(`${API_URL}/incidents`);

    return result.data.data;
  }
  catch (error) {
    console.log(error.message)
  }

};

export const getIncidentById = async (id) => {
  const result = await axios.get(`${API_URL}/incidents/${id}`);
  return result.data.incident;
};

export const confirmIncident = async (id) => {
 await axios.patch(`${API_URL}/incidents/${id}/confirm`);
 
};

export const updateIncidentStatus = async (id, status, notes) => {
  const response = await axios.patch(`${API_URL}/incidents/${id}/status`, {
    status,
    notes,
  });
  return response.data.msg;
};
