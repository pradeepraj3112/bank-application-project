import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import userContext from "../context";
import "./style/loginstyle.css";
import signup_img from "./img/towfiqu-barbhuiya-jpqyfK7GB4w-unsplash.jpg";





export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let people = useContext(userContext);


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
    if (label === "name" && !/^[a-zA-Z ]+$/.test(field)) {
      alert("Please enter a valid name");
      return false;
    }
    if (label === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field)) {
        alert("Please enter a valid email address");
        return false;
      }
    }
    for (let i = 0; i < people.users.length; i++) {
      if (people.users[i].email === email) {
        alert("This email address is already in use");
        return false;
      }
    }
    return true;
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!validate(name, "name") || !validate(email, "email") || !validate(password, "password")) 
      return;
      people.users.push({ name, email, password, balance: 0 });
      alert("Successfully Created");

    
      axios.post("http://localhost:3002/createaccount", { name, email, password, role: 'user' })
      .then((response) => {
        console.log(response);
        navigate("/nav");
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  return (
    <>
    <div className="container">
    <div className="Containers">
      <div className="form">
      
        <h2 style={{ color: "#333", marginBottom: "20px",marginLeft:"100px" }}>createaccount</h2>
        <form onSubmit={handleCreate}>
          <div className="mb-3">
            <label  style={{ fontWeight: "bold" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label  style={{ fontWeight: "bold" }}>
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
            <label  style={{ fontWeight: "bold" }}>
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

          
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ fontWeight: "bold" }}
          >
            Register
          </button>
        </form>
        <p style={{ marginTop: "10px" }} className="login_link">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
      </div>
      <img src={signup_img} alt="login_img" className="login_img"/>
      </div>
    </div>
    </>
  );
}