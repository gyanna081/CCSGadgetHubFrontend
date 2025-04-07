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
              className={
                location.pathname === link.to
                  ? "navbar-link active-link"
                  : "navbar-link"
              }
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
          <button className="custom-button" onClick={() => navigate("/items")}>
            Borrow Item
          </button>
          <button className="custom-button" onClick={() => navigate("/my-requests")}>
            View Requests
          </button>
        </div>

        {/* Featured Items */}
        <h2 className="featured-title">Featured Items</h2>
        <div className="items-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="item-box"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
