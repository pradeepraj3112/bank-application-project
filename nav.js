
import { Link } from "react-router-dom";
import "./component/style/homestyle.css";
import dep_with_data from "./component/img/credit-card-model-with-coins-pen_39768-1080.avif";


//import UserContext from "../context";

export default function nav(){
    return(
     <>
     <div className="Homes">

     <div className="dep_with_data">

      <div className="nav">
             
        <Link to="/deposite" className="Link">
          <button className="link">DEPOSIT</button>
        </Link>

      </div>
      <div className="nav">
        <Link to="/withdraw" className="Link">
          <button className="link">WITHDRAW</button>
        </Link>
      </div>
      <div className="nav">
            <Link to="/data" className="Link">
              <button className="link">DATA</button>
            </Link>
      </div>
            </div>
          </div>
     </>
    );
}