import React from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCheckIn = async () => {
    try {
      await API.post(
        "/checkin",
        {},
        {
          headers: { Authorization: token },
        }
      );
      alert("Checked in successfully");
    } catch (err) {
  console.log("ERROR:", err.response?.data);
  alert("Check-in failed");
}
  };

  const handleCheckOut = async () => {
    try {
      await API.post(
        "/checkout",
        {},
        {
          headers: { Authorization: token },
        }
      );
      alert("Checked out successfully");
    } catch (err) {
  console.log("ERROR:", err.response?.data);
  alert("Check-in failed");
}
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        <button onClick={handleCheckIn}>Check In</button>
        <button onClick={handleCheckOut}>Check Out</button>
      </div>
    </>
  );
}

export default Dashboard;
