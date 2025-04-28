import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "../assets/CCSGadgetHub1.png";

const navLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Items", to: "/items" },
  { label: "My Requests", to: "/my-requests" },
  { label: "Activity Log", to: "/activity-log" },
  { label: "Profile", to: "/profile" },
];

const ItemDetails = () => {
  const { id } = useParams(); // your App.jsx route is /itemdetails/:id
  const [item, setItem] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/items")
      .then((res) => {
        const foundItem = res.data.find((i) => (i.id || i.itemId) === id);
        setItem(foundItem);
      })
      .catch((err) => {
        console.error("Error fetching item:", err);
      });
  }, [id]);
  
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  if (!item) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="items-page">
      {/* Navbar */}
      <div style={{ 
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

      {/* Main Content */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#FAF6E9' }}>
        {/* Back Arrow */}
        <Link 
          to="/items" 
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            color: '#333',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          &#8592; Back
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          {/* Image Carousel */}
          <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <Carousel showThumbs={false}>
              {item.imagePath ? (
                <div>
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    style={{ 
                      width: '100%', 
                      height: '400px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      console.log(`Image failed to load: ${item.imagePath}`);
                      e.target.onerror = null; // Prevent infinite loop
                      // Create a colored background with first letter
                      const name = item.name || "Item";
                      const initial = name.charAt(0).toUpperCase();
                      // Use a direct data URI to avoid external dependencies
                      const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
                      const colorIndex = Math.abs(name.charCodeAt(0)) % colors.length;
                      const bgColor = colors[colorIndex];
                      
                      const canvas = document.createElement('canvas');
                      canvas.width = 400;
                      canvas.height = 400;
                      const ctx = canvas.getContext('2d');
                      ctx.fillStyle = bgColor;
                      ctx.fillRect(0, 0, 400, 400);
                      ctx.fillStyle = '#ffffff';
                      ctx.font = 'bold 120px Arial';
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      ctx.fillText(initial, 200, 200);
                      
                      e.target.src = canvas.toDataURL();
                    }}
                  />
                </div>
              ) : (
                <div>
                  <div style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "#6c757d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "72px",
                    fontWeight: "bold",
                    color: "white"
                  }}>
                    {(item.name?.charAt(0) || 'I').toUpperCase()}
                  </div>
                </div>
              )}
            </Carousel>
          </div>

          {/* Info Section */}
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>{item.name}</h2>
              <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
                {item.description || "No description provided."}
              </p>

              <h3 style={{ margin: '15px 0 5px 0', color: '#555', fontSize: '18px' }}>Condition</h3>
              <p style={{ fontSize: '16px', marginBottom: '20px' }}>{item.condition || "N/A"}</p>

              <h3 style={{ margin: '15px 0 5px 0', color: '#555', fontSize: '18px' }}>Status:</h3>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: item.status === "Available" ? "#4CAF50" : "#F44336",
                marginBottom: '25px'
              }}>
                {item.status}
              </p>

              {item.status === "Available" ? (
                <Link 
                  to={`/borrow/${item.id || item.itemId}`} 
                  style={{
                    display: 'block',
                    backgroundColor: '#E26901',
                    color: 'white',
                    padding: '12px 0',
                    textAlign: 'center',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Borrow Item
                </Link>
              ) : (
                <button 
                  disabled 
                  style={{
                    display: 'block',
                    width: '100%',
                    backgroundColor: '#ccc',
                    color: '#666',
                    padding: '12px 0',
                    textAlign: 'center',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'not-allowed'
                  }}
                >
                  Not Available
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;