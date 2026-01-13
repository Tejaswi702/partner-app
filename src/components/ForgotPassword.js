import React, { useState } from "react";
import { supabase } from "../supabase";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset email sent");
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button onClick={resetPassword}>Send Reset Link</button>
    </div>
  );
}

export default ForgotPassword;
