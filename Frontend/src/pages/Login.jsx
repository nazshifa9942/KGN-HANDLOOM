import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.jpg";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    const response = await fetch(
      "https://kgn-handloom.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="login-page">

      {/* LEFT PANEL */}
      <div className="login-left">
        <img src={logo} alt="KGN Logo" className="login-logo" />
        <h1>KGN Handloom</h1>
        <p>Manage your store, products and offers easily</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>
          <p className="login-subtext">
            only for staffs
          </p>

          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="e.g. 9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button onClick={handleLogin}>
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;