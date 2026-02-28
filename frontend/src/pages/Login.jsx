import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("Response:", data);   

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      console.log("Token saved:", data.token); 
      navigate("/");
    } else {
      alert(data.error);
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed");
  }
};

  return (
  <div className="login-container">
    <div className="login-card">
      <h1 className="logo">Smart Email</h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit" className="login-btn">
          Login
        </button>

        <p style={{ marginTop: "15px" }}>
  Don’t have an account?{" "}
  <Link to="/signup" style={{ color: "#3b82f6" }}>
    Sign Up
  </Link>
</p>
      </form>
    </div>
  </div>
);
}