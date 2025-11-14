import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../utils/AuthContext";

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password!");
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });

      login(res.data.token, res.data.user);

      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.message || "Invalid login credentials or server error.";
      alert(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "360px", borderRadius: "15px" }}>
        <h3 className="text-center text-primary mb-4 fw-bold">
          🏋️‍♂️ Canara Gym Login
        </h3>

        <form onSubmit={handleLogin}>
          <div className="alert alert-info" role="alert">
            <small>📌 <strong>Demo Credentials:</strong> user@gmail.com / 1234</small>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2 fw-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "14px" }}>
          Don’t have an account? <a href="/signup" className="text-decoration-none">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
