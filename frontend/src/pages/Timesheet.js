import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Timesheet() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/timesheet", {
        headers: { Authorization: token },
      });
      setData(res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Timesheet</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4">No records found</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {item.checkIn
                      ? new Date(item.checkIn).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td>
                    {item.checkOut
                      ? new Date(item.checkOut).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td>{item.totalHours || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Timesheet;