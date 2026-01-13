import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PartnerSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // (You can add Firebase signup here later)

    //  Navigate to PartnerDetails with state
    navigate("/partner-details", {
      state: {
        fromSignup: true,
        email: email
      }
    });
  };

  return (
    <div className="form-container">
      <h2>Partner Signup</h2>
      <p className="form-subtitle">Create a partner account</p>

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default PartnerSignup;
