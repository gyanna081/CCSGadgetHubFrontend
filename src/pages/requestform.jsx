// RequestForm.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import logo from "../assets/CCSGadgetHub1.png";

const navLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Items", to: "/items" },
  { label: "My Requests", to: "/my-requests" },
  { label: "Activity Log", to: "/activity-log" },
  { label: "Profile", to: "/profile" },
];

const RequestForm = () => {
  const location = useLocation();
  const { itemId } = useParams();
  const [itemName] = useState(`Laptop ${itemId}`);
  const [reason, setReason] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [estimatedReturn, setEstimatedReturn] = useState("");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (fromTime && toTime) {
      const today = new Date();
  
      const [toHours, toMinutes] = toTime.split(":").map(Number);
  
      // Create a Date object for the end time
      const toDate = new Date(today);
      toDate.setHours(toHours, toMinutes, 0, 0);
  
      // Add exactly 30 minutes
      const returnDate = new Date(toDate.getTime() + 30 * 60 * 1000);
  
      // Cap return time at 11:59 PM if it goes over
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 0, 0);
  
      if (returnDate > endOfDay) {
        returnDate.setHours(23, 59, 0, 0);
      }
  
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setEstimatedReturn(returnDate.toLocaleString(undefined, options));
    } else {
      setEstimatedReturn("");
    }
  }, [fromTime, toTime]);
  
  

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

      {/* Form Content */}
      <div className="dashboard-container">
        <Link to="/items" style={{ fontSize: "24px", color: "black" }}>←</Link>
        <h2 className="items-heading" style={{ marginTop: "10px" }}>Request Form</h2>

        <form className="request-form" style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
          {/* Item Name */}
          <div>
            <label><strong>Item Name:</strong></label>
            <input type="text" value={itemName} disabled style={{ width: "100%", padding: "10px", borderRadius: "5px" }} />
          </div>

          {/* Reason for Borrowing */}
          <div>
            <label><strong>Reason for borrowing:</strong></label>
            <textarea
              placeholder="State reason here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>

          {/* Duration */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label><strong>Duration:</strong></label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "5px" }} />
                <span style={{ alignSelf: "center" }}>to</span>
                <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "5px" }} />
              </div>
            </div>

            {/* Return Time (calculated) */}
            <div style={{ flex: 1 }}>
              <label><strong>Estimated Return Time:</strong></label>
              <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", background: "#f1f1f1", minHeight: "48px" }}>
                {estimatedReturn || "Select duration to calculate return time"}
              </div>
            </div>
          </div>

          {/* Terms and Agreement */}
          <div>
            <label><strong>Terms and Agreement</strong></label>
            <div style={{ margin: "10px 0", fontSize: "14px", color: "#444" }}>
              <p>Terms and Agreement here..</p>
              <p>Terms and Agreement here..</p>
              <p>Terms and Agreement here..</p>
              <p>Terms and Agreement here..</p>
            </div>
            <label>
              <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} /> I agree to the terms and conditions.
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="custom-button" disabled={!agree}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
