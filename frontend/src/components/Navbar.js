import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h3>Attendance App</h3>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/timesheet")}>Timesheet</button>
        <button onClick={() => navigate("/leave")}>Leave</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    background: "#1e88e5",
    color: "white",
  },
  right: {
    display: "flex",
    gap: "15px",
  },
  button: {
    background: "white",
    color: "#1e88e5",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;