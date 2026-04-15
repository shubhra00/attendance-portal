import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Leave from "./pages/Leave";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/leave" element={<Leave />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
