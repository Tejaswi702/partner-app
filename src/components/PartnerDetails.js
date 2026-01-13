import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";

function PartnerDetails() {
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromSignup) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("partner_details").insert({
      user_id: user.id,
      email: location.state.email,
      dob,
      address,
      phone,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="form-container">
      <h2>Partner Details</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" onChange={(e) => setDob(e.target.value)} required />
        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
        <input type="tel" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PartnerDetails;
