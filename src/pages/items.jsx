import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/CCSGadgetHub1.png";  // Assuming logo is also used in items page

const Items = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();  // Used for active link styling

  useEffect(() => {
    // Example data for laptop items
    const fetchedItems = [
      { id: 1, name: "Laptop 1", available: true },
      { id: 2, name: "Laptop 2", available: true },
      { id: 3, name: "Laptop 3", available: false },
      { id: 4, name: "Laptop 4", available: true },
      { id: 5, name: "Laptop 5", available: false },
      { id: 6, name: "Laptop 6", available: true },
    ];
    setItems(fetchedItems);
  }, []);

  // Define navigation links just like in Dashboard
  const navLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Items", to: "/items" },
    { label: "My Requests", to: "/my-requests" },
    { label: "Activity Log", to: "/activity-log" },
    { label: "Profile", to: "/profile" },
  ];

  return (
    <div className="items-page">
      {/* Navigation Bar */}
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
          <button className="logout-button">Log Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-container">
        <h2 className="featured-title">Available Laptops</h2>

        {/* Laptop Grid */}
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-box">
              <h3>{item.name}</h3>
              <p className="item-status">
                {item.available ? "Available" : "Not Available"}
              </p>
              {item.available ? (
                <Link to={`/borrow/${item.id}`} className="borrow-btn">
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
