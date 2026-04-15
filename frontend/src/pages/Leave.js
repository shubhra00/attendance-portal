import React, { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Leave() {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave", {
        headers: { Authorization: token },
      });
      setLeaves(res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await API.post("/leave", form, {
        headers: { Authorization: token },
      });

      alert("Leave applied successfully");

      // reset form
      setForm({
        startDate: "",
        endDate: "",
        type: "",
        reason: "",
      });

      fetchLeaves();
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Failed to apply leave");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Apply Leave</h2>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <input
          placeholder="Type (Sick/Casual)"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        <input
          placeholder="Reason"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        />

        <button onClick={handleSubmit}>Apply Leave</button>

        <h3 style={{ marginTop: "20px" }}>My Leaves</h3>

        {leaves.length === 0 ? (
          <p>No leave records found</p>
        ) : (
          <ul>
            {leaves.map((leave, index) => (
              <li key={index}>
                {new Date(leave.startDate).toLocaleDateString()} →{" "}
                {new Date(leave.endDate).toLocaleDateString()} (
                {leave.type}) - <b>{leave.status}</b>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Leave;