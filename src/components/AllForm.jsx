import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AllForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://myapp-58va.onrender.com/api/users/');
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          {formData.map((data) => (
            <tr key={data.id}>
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
