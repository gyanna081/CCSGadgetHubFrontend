import { useNavigate, Link, useLocation } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { signOut } from "firebase/auth";
import logo from "../assets/CCSGadgetHub1.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Items", to: "/items" },
    { label: "My Requests", to: "/my-requests" },
    { label: "Activity Log", to: "/activity-log" },
    { label: "Profile", to: "/profile" },
  ];

  return (
    <div className="dashboard-page">
      {/* Navigation Bar */}
      <div className="navbar">
        <img src={logo} alt="CCS Gadget Hub Logo" />
        <nav>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color:
                  location.pathname === link.to ? "black" : "white",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginLeft: "auto" }}>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Search Bar & Buttons */}
        <div className="search-container">
          <input type="text" placeholder="Enter items here" />
          <button className="custom-button">Borrow Item</button>
          <button className="custom-button">View Requests</button>
        </div>

        {/* Featured Items */}
        <h2 className="featured-title">Featured Items</h2>
        <div className="items-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="item-box"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
