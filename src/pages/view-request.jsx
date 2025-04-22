import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import logo from "../assets/CCSGadgetHub1.png";

const ViewRequest = () => {
  const location = useLocation();
  const { id } = useParams();

  // Dummy data matching the my-requests page
  const dummyRequests = [
    {
      id: "1",
      item: "Dell Laptop",
      status: "Approved",
      requestDate: "2025-04-12",
      fromTime: "09:30 AM",
      toTime: "12:00 PM",
      returnDate: "",
      reason: "Research use for final project",
      remarks: "-"
    },
    {
      id: "2",
      item: "Macbook Air",
      status: "Pending",
      requestDate: "2025-04-10",
      fromTime: "02:00 PM",
      toTime: "05:00 PM",
      returnDate: "",
      reason: "Midterm presentation recording",
      remarks: "-"
    },
    {
      id: "3",
      item: "Huawei Matebook",
      status: "Returned",
      requestDate: "2025-04-05",
      fromTime: "11:15 AM",
      toTime: "04:00 PM",
      returnDate: "2025-04-06 10:00 AM",
      reason: "Final defense setup",
      remarks: "Returned complete and in good condition"
    }
  ];

  const requestData = dummyRequests.find(req => req.id === id);

  if (!requestData) {
    return (
      <div className="dashboard-container">
        <p>Request not found.</p>
        <Link to="/my-requests" className="back-arrow">← Back to My Requests</Link>
      </div>
    );
  }

  return (
    <div className="items-page">
      {/* Navbar */}
      <div className="navbar">
        <img src={logo} alt="CCS Gadget Hub Logo" />
        <nav>
          {[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Items", to: "/items" },
            { label: "My Requests", to: "/my-requests" },
            { label: "Activity Log", to: "/activity-log" },
            { label: "Profile", to: "/profile" },
          ].map((link) => (
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
          <Link to="/login" className="logout-link">Log Out</Link>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-container">
        <Link to="/my-requests" className="back-arrow">←</Link>

        <h2 className="featured-title">Request Summary</h2>

        <div className="request-summary-box">
          <p><strong>Item:</strong> {requestData.item}</p>
          <p><strong>Status:</strong> <span className={`status-badge ${requestData.status.toLowerCase()}`}>{requestData.status}</span></p>
          <p><strong>Request Date:</strong> {requestData.requestDate}</p>
          <p><strong>Duration:</strong> {requestData.fromTime} - {requestData.toTime}</p>
          <p><strong>Returned Date & Time:</strong> {requestData.status.toLowerCase() === "returned" ? requestData.returnDate : "-"}</p>
          <p><strong>Reason for Borrowing:</strong> {requestData.reason}</p>
          <p><strong>Remarks:</strong> {requestData.remarks}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
