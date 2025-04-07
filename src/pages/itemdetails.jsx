import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing carousel styles
import logo from "../assets/CCSGadgetHub1.png"; // Importing logo

const navLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Items", to: "/items" },
  { label: "My Requests", to: "/my-requests" },
  { label: "Activity Log", to: "/activity-log" },
  { label: "Profile", to: "/profile" },
];

const ItemDetails = () => {
  const { itemId } = useParams(); // Using useParams to get the itemId from the URL
  const [item, setItem] = useState(null);
  const location = useLocation(); // Use useLocation to get the current path

  useEffect(() => {
    // Sample data similar to the one from the Items page
    const fetchedItems = [
      { 
        id: 1, name: "Laptop 1", available: true, rating: 5, 
        images: ["image1.jpg", "image2.jpg"], 
        description: "A powerful laptop for all your needs.", 
        condition: "Good", conditionDescription: "Well-maintained, minor scratches on the body." 
      },
      { 
        id: 2, name: "Laptop 2", available: true, rating: 4, 
        images: ["image3.jpg", "image4.jpg"], 
        description: "A lightweight laptop for everyday use.", 
        condition: "Excellent", conditionDescription: "Barely used, no visible damage." 
      },
      // Add more items as necessary
    ];

    const itemData = fetchedItems.find((item) => item.id === parseInt(itemId)); // Find item based on itemId from URL
    setItem(itemData);
  }, [itemId]); // Re-run the effect when itemId changes

  if (!item) {
    return <div>Loading...</div>; // Loading state until the item data is available
  }

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
              className={location.pathname.replace(/\/$/, "") === link.to.replace(/\/$/, "") ? "navbar-link active-link" : "navbar-link"}
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
      <div className="item-details-container">
        {/* Item Image - Carousel */}
        <div className="item-image">
          <Carousel showThumbs={false}>
            {item.images.map((image, index) => (
              <div key={index}>
                <img src={`../assets/${image}`} alt={`Item ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Item Information */}
        <div className="item-info">
          <div className="item-details-left">
            <div className="item-description">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>

            <div className="item-condition">
              <h3>Condition</h3>
              <p>{item.condition}: {item.conditionDescription}</p>
            </div>
          </div>

          {/* Right Side - Status and Borrow Button */}
          <div className="item-details-right">
            <div className="item-status">
              <h3>Status</h3>
              <p>{item.available ? "Available" : "Not Available"}</p>
            </div>

            {/* Borrow Button only shows if the item is available */}
            <div className="item-actions">
              {item.available ? (
                <Link to={`/borrow/${item.id}`} className="borrow-btn">Borrow Item</Link>
              ) : (
                <button disabled className="borrow-btn not-available-btn">Not Available</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
