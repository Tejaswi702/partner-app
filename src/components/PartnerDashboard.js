import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function PartnerDashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Partner Dashboard</h2>
      <p>You have successfully logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default PartnerDashboard;
