import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/loginstyle.css";
import login_img from "./img/micheile-henderson-SoT4-mZhyhE-unsplash.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  function validate(field, label) {
    // Your validation code remains the same
    if (!field) {
      alert("Please enter " + label);
      return false;
    }
    if (label === "password" && password.length < 8) {
      alert("Please enter a password with at least 8 characters");
      return false;
    }
    if (label === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field)) {
        alert("Please enter a valid email address");
        return false;
      }
    }
    return true;
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!validate(email, "email") || !validate(password, "password")) {
      return;
    }
    // Assuming you want to send a POST request to your server for authentication
    axios
      .post("http://localhost:3002/login", { email, password})
      .then((response) => {
        console.log(response);
        setRole(response.data);
        navigate("/nav"); // Replace with the appropriate URL after successful login
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., show an error message to the user
      });
  }
  function UserDataComponent() {
    // Fetch and display user data here
    return <div>User Data Component</div>;
  }

  function AdminDataComponent() {
    // Fetch and display admin data here
    return <div>Admin Data Component</div>;
  }
  function Role() {
    if (!validate(email, "email") || !validate(password, "password")) {
      return false;
    }
     navigate("/data");

  }

  return (
    <div className="container">
      <div className="Containers">
        <div className="form">
          <h2 style={{ color: "#333", marginBottom: "50px" }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" style={{ fontWeight: "bold" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" style={{ fontWeight: "bold" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Role" style={{ fontWeight: "bold" }}>
                Role :
              </label>
              <input
                type="text"
                placeholder="Enter Role"
                autoComplete="off"
                name="password"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>




            {role === "user" && <UserDataComponent />} {/* Render user data */}
            {role === "admin" && <AdminDataComponent />} {/* Render admin data */}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ fontWeight: "bold" }}
              onClick={Role}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#007bff", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </p>
        </div>
        <div>


        </div>
        <img src={login_img} alt="login_img" className="login_img" />

      </div>
    </div>
  );
}