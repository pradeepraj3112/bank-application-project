import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/Home";
import Login from "./component/login";
import Signup from "./component/signup";
import Deposite from "./component/deposite";
import Withdraw from "./component/withdraw";
import Data from "./component/data";
import UserContext from "./context";
import Nav from "./nav";

export default function App() {
  return (
    <Router>
      <Navbar />
      <UserContext.Provider
        value={{
          users: [
            {
              NAME: "",
              EMAIL: "",
              BALANCE: 0
            }
          ]
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/deposite" element={<Deposite />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/data" element={<Data />} />
          <Route path="/nav" element={<Nav />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
