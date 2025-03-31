import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { signOut } from "firebase/auth";
import logo from "../assets/CCSGadgetHub1.png"; // Import the logo

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF3E0", fontSize: "20px" }}>
      {/* Navigation Bar */}
      <div
        style={{
          backgroundColor: "#D96528",
          color: "white",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="CCS Gadget Hub Logo"
          style={{ height: "100px", marginRight: "20px" }} // Adjust spacing
        />

        {/* Navigation Links */}
        <nav style={{ display: "flex", gap: "40px", fontWeight: "500" }}>
          <a href="#" style={{ textDecoration: "none", color: "white" }}>
            Dashboard
          </a>
          <a href="#" style={{ textDecoration: "none", color: "white" }}>
            Items
          </a>
          <a href="#" style={{ textDecoration: "none", color: "white" }}>
            My Requests
          </a>
          <a href="#" style={{ textDecoration: "none", color: "white" }}>
            Activity Log
          </a>
          <a href="#" style={{ textDecoration: "none", color: "white" }}>
            Profile
          </a>
        </nav>

        {/* Push Log Out Button to the Right */}
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#444",
              padding: "8px 16px",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
              border: "none",
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Search Bar & Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter items here"
            style={{
              flexGrow: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            style={{
              backgroundColor: "#D96528",
              color: "white",
              padding: "10px 16px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Borrow Item
          </button>
          <button
            style={{
              backgroundColor: "#D96528",
              color: "white",
              padding: "10px 16px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Requests
          </button>
        </div>

        {/* Featured Items */}
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
          Featured Items
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                height: "150px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
