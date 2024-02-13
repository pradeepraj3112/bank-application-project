import { Container, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context";
import "./style/DWstyle.css";
import axios from "axios";

export default function Withdraw() {
  let people = useContext(UserContext);
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  var leng = people.users.length;
  var balAnce = people.users[leng - 1].balance;
  const [availablebal, setAvailableBal] = useState(balAnce);
  const [error, setError] = useState("");

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
    if (parseFloat(field) > balAnce) {
      setStatus("Error: " + label);
      alert("Sorry mate, you don't have enough cash to Withdraw");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    if (!validate(withdraw, "withdraw")) return;
    var Money = balAnce - parseFloat(withdraw);
    setAvailableBal(Money);
    people.users[leng - 1].balance = Money;
    setShow(false);
    alert("Successfully Withdraw ₹" + withdraw);
  axios
  .post("http://localhost:3002/withdraw", { withdraw, Money, email: people.users[leng - 1].email, })
  .then((response) => {
    console.log(response);
    navigate("/");
  })
  .catch((error) => {
    console.error(error);
  });

  }
  function refrushForm() {
    setWithdraw("");
    setShow(true);
  }
  return (
    <>
      <div className="deposit" style={{ height: "90vh" }}>
        <div className="row">
          <h1>Balance : ₹ {availablebal} </h1>
        </div>

        {show ? (
          <div className="forms">
            <label>
              <h1>Withdraw :</h1>
              <input
                type="number"
                className="inputs"
                placeholder="Enter Amount to withdraw"
                value={withdraw}
                onChange={(e) => setWithdraw(e.currentTarget.value)}
              />
            </label>
            <br />
            <button
              type="submit"
              className="button"
              disabled={!withdraw}
              onClick={handleCreate}
            >
              Withdraw
            </button>
          </div>
        ) : (
          <>
            <h5>Successful Transaction</h5>
            <br />
            <br />
            <button type="submit" className="btn" onClick={refrushForm}>
              Add Another Withdraw
            </button>


            <Link to="/deposite">
              <button className="link">DEPOSIT</button>
            </Link>


            <Link to="/data">
              <button className="link">DATA</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
