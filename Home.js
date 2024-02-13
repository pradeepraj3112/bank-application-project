import raect from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./style/homestyle.css";
import bank from "./img/credit-card-model-with-coins-pen_39768-1080.avif";

const Home = () => {


  
  return (
    <>
      <div className="home">
      <div className="home_top_navbar">
          <ul className="Navbar"></ul>
        </div>
        <div>
          <h1 id="welcome" className="home_head">Welcome to Tamil Bank</h1>
        </div>

        
        <div className="containers">

        
        

          <div className="home_left">
            <h2>TAMIL BANK</h2>
            <br />
            <h1>RELATIONSHIP BEYOND BANKING</h1>
            <p>
              We, at Tamil Bank , are committed to become the bank of choice by
              providing superior, proactive, innovative, state-of-art banking
              services with an attitude of care and concern for the customers
              and patrons.
            </p>
            <br></br>
            <br></br>

            <div className="user">
            <Link to="/login" >
            <button className="link">LOGIN</button>
            </Link>

            <Link to="/signup" >
            <button className="link">SIGNUP</button>
            </Link>
              
              
            </div>
          </div>
          
          
        </div>
        </div>

      
      <div className="botton"></div>
    </>
  );
};
export default Home;
