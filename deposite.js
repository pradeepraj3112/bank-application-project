import { Container, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context";
import "./style/DWstyle.css";
import axios from "axios";


export default function Deposit() {
  let people = useContext(UserContext);
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  var leng = people.users.length;
  var balAnce = people.users[leng -1].balance;
  const [availablebal, setAvailableBal] = useState(balAnce);
  const [show, setShow] = useState(true);

  // form validation
  function validate(field, label) {
    if (isNaN(field)) {
      setStatus("Error: " + label);
      alert("Please Enter Valid Number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (parseFloat(field) <= 0) {
      setStatus("Error: " + label);
      alert(" Please Enter a Value greater than zero");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
  function handleCreate() {
    if (!validate(deposit, "deposit")) return;
    var Money = balAnce + parseFloat(deposit);
    setAvailableBal(Money);
    people.users[leng - 1].balance = Money;
    setShow(false);
    alert("Successfully Deposited ₹" + deposit);

    axios
    .post("http://localhost:3002/deposite", { deposit, Money, email: people.users[leng - 1].email })
    .then((response) => {
      console.log(response);
      navigate("/");
    })
    .catch((error) => {
      console.error(error);
    });
  
  }

  function refrushForm() {
    setDeposit("");
    setShow(true);
  }
  return (
    <>
      <div className="deposit">
        <div className="row" >
          <h1 style={{ fontSize: "50px" }}>Balance : ₹ {availablebal}</h1>
        </div>

        {show ? (
          <div className="forms">
            <label>
              <h1>Deposit :</h1>
              <input
                type="number"
                className="inputs"
                placeholder="Enter Amount to be deposited"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />{" "}
            </label>
            <br />
            <div>
              <img src="https://canada-first.ca/wp-content/uploads/2020/03/Daily-Bank-Deposits.png" style={{width:"50%"}} />
            </div>
            <button type="submit" className="button" onClick={handleCreate}>
              Deposit
            </button>
          </div>
        ) : (
          <>
            <div className="AddAnotherDeposit">
              <h5>Successful Transaction</h5>

              <button type="submit" className="btn" onClick={refrushForm}>
                Add Another Deposit
              </button>


              <Link to="/withdraw">
              <button className="link">WITHDRAW</button>
              </Link>


              <Link to="/data">
              <button className="link">DATA</button>
              </Link>


            </div>
          </>
        )}
      </div>
    </>
  );
}
