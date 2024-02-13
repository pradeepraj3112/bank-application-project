import { useContext } from "react";
import UserContext from "../context";
import "./style/datastyle.css";

export default function Data() {
  let people = useContext(UserContext);
  function renderTableHeader() {
    let header = Object.keys(people.users[0]);
    return header.map((value, index) => {
      return <th>{value}</th>;
    }); 
  }
  function renderTableData() {
    return people.users.map((user, index) => {
      const { name, email,balance } = user;
      return (
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{balance}</td>
        </tr>
      );
    });
  }
  return (
    <>
      <div className="containers">
        <h1 className="text-center">All data</h1>
        <div className="Row">
          <br />
          <table id="users" className="table">
            <tr class="thead">{renderTableHeader()} </tr>
            {renderTableData()}
          </table>
          <br />
        </div>
      </div>
    </>
  );
}
