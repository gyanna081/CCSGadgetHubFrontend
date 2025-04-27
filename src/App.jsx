import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Items from "./pages/items";
import AdminDashboard from "./pages/AdminDashboard"; // Import AdminDashboard
import "./index.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} /> {/* Added Admin route */}
      </Routes>
    </Router>
  );
}

export default App;
