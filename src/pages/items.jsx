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
      <div className="navbar" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#E26901', 
        padding: '10px 20px',
        color: 'white' 
      }}>
        <img src={logo} alt="CCS Gadget Hub Logo" style={{ height: '60px' }} />
        <nav style={{ display: 'flex', marginLeft: '20px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 15px',
                fontWeight: location.pathname === link.to ? 'bold' : 'normal',
                borderBottom: location.pathname === link.to ? '3px solid white' : 'none'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginLeft: "auto" }}>
          <button 
            onClick={handleLogout} 
            style={{
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FAF6E9' }}>
        <h2 style={{ marginBottom: '20px' }}>Available Items</h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {items.map((item) => (
            <div key={item.id || item.itemId} style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                {item.imagePath ? (
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      console.log(`Image failed to load: ${item.imagePath}`);
                      e.target.onerror = null;
                      const name = item.name || "Item";
                      const initial = name.charAt(0).toUpperCase();
                      const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
                      const colorIndex = Math.abs(name.charCodeAt(0)) % colors.length;
                      const bgColor = colors[colorIndex];
                      const canvas = document.createElement('canvas');
                      canvas.width = 300;
                      canvas.height = 200;
                      const ctx = canvas.getContext('2d');
                      ctx.fillStyle = bgColor;
                      ctx.fillRect(0, 0, 300, 200);
                      ctx.fillStyle = '#ffffff';
                      ctx.font = 'bold 72px Arial';
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      ctx.fillText(initial, 150, 100);
                      e.target.src = canvas.toDataURL();
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#6c757d', 
                    color: 'white',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '72px',
                    fontWeight: 'bold' 
                  }}>
                    {(item.name?.charAt(0) || 'I').toUpperCase()}
                  </div>
                )}
              </div>

              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{item.name}</h3>
                <p style={{ color: '#555', fontSize: '14px', margin: '0 0 10px 0' }}>
                  {item.description ? item.description : "No description available"}
                </p>
                <p style={{ fontSize: '14px', color: '#888', margin: '0 0 10px 0' }}>
                  Condition: <strong>{item.condition || "N/A"}</strong>
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  color: item.status === "Available" ? "#4CAF50" : "#F44336",
                  margin: '0 0 15px 0' 
                }}>
                  {item.status}
                </p>
                <Link 
                  to={`/itemdetails/${item.id || item.itemId}`} 
                  style={{
                    display: 'block',
                    backgroundColor: '#E26901',
                    color: 'white',
                    textAlign: 'center',
                    padding: '8px 0',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
