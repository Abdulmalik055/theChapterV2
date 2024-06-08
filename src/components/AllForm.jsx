import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

function AllForm() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  return (
    <div>
      <div>
        <button onClick={() => navigate("/")}>New Form</button>
        <h3>All Data</h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={index}>
              <td>{data.full_name}</td>
              <td>{data.date_of_birth}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllForm;
