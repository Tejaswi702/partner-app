import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //1. If user is already logged in, go to dashboard
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        navigate("/dashboard");
      }
    };

    checkUser();
  }, [navigate]);

  // ✅ 2. Normal email + password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  // ✅ 3. Google login with redirect
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Partner Login</h2>

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

        <button type="submit">Login</button>
      </form>

      <button className="google-btn" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>

      <div className="link" onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </div>

      <div className="link">
        New Partner?{" "}
        <span className="signup-link" onClick={() => navigate("/signup")}>
          Signup
        </span>
      </div>
    </div>
  );
}

export default Login;
