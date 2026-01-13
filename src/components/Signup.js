import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Create user (SIGN UP)
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      alert(signupError.message);
      return;
    }

    // 2️⃣ Automatically log the user in
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      alert(loginError.message);
      return;
    }

    // 3️⃣ Navigate to Partner Details (user is now logged in)
    navigate("/partner-details", {
      state: {
        fromSignup: true,
        email: email,
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Partner Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
