import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./navstyle.css";
import TamilBank from "../img/tamil bank.png";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className="navbar">

<img src={TamilBank} alt="Bank Logo" style={{width:"7%"}}/>



    
      <ul
        className={isMobile ? "nav-links-mob" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <Link to="/" className="homes">
          <li>HOME</li>
        </Link>





      </ul>
      <button className="mob-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <h1>X</h1> : <h1>||||</h1>}
      </button>
    </nav>
  );
};
export default Navbar;
