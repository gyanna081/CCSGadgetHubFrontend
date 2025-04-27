import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/CCSGadgetHub1.png";

const Items = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:8080/api/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  const navLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Items", to: "/items" },
    { label: "My Requests", to: "/my-requests" },
    { label: "Activity Log", to: "/activity-log" },
    { label: "Profile", to: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="items-page">
      <div className="navbar">
        <img src={logo} alt="CCS Gadget Hub Logo" />
        <nav>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? "navbar-link active-link" : "navbar-link"}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginLeft: "auto" }}>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <div className="dashboard-container">
        <h2 className="featured-title">Available Items</h2>

        <div className="items-grid">
          {items.map((item) => (
            <div key={item.itemId} className="item-box">
              {/* IMAGE */}
              {item.imagePath && (
                <img
                  src={`http://localhost:8080/uploads/${item.imagePath}`} // ✅ uploads + imagePath (not image_path)
                  alt={item.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                />
              )}
              {/* NAME */}
              <h3>{item.name}</h3>
              {/* DESCRIPTION */}
              <p>{item.description ? item.description : "No description available"}</p>
              {/* CONDITION */}
              <p style={{ fontSize: "14px", color: "gray" }}>
                Condition: <strong>{item.condition ? item.condition : "N/A"}</strong>
              </p>
              {/* STATUS */}
              <p className="item-status" style={{ color: item.status === "Available" ? "green" : "red" }}>
                {item.status}
              </p>

              {item.status === "Available" ? (
                <Link to={`/borrow/${item.itemId}`} className="borrow-btn">
                  Borrow
                </Link>
              ) : (
                <button disabled className="not-available-btn">
                  Not Available
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
