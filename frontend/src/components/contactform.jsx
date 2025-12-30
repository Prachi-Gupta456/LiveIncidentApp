import React, { useState } from "react";
import '../Styles/contactform.css'

const ContactForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert("Please fill all fields");
      return;
    }

    // You can later send this to backend
    localStorage.setItem("user_name",name)
    localStorage.setItem("user_contact",mobile)
    // MARK USER AS VALID
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 1: Your Details</h2>

      <div>
        <label>Name</label><br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <br />

      <div>
        <label>Mobile Number</label><br />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </div>

      <br />

      <button type="submit">Continue</button>
    </form>
  );
};

export default ContactForm;
