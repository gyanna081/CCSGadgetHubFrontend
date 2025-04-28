import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseconfig"; // 🔥 add auth here
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import logo from "../assets/CCSGadgetHub1.png";

const RequestForm = () => {
  const location = useLocation();
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reason, setReason] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [startBlock, setStartBlock] = useState("");
  const [durationBlocks, setDurationBlocks] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [agree, setAgree] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`https://ccsgadgethub.onrender.com/api/items`)
      .then(res => {
        const foundItem = res.data.find(it => (it.id || it.itemId) === itemId);
        if (foundItem) {
          setItem(foundItem);
        } else {
          setError("Item not found.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setError("Failed to load item details.");
        setLoading(false);
      });
  }, [itemId]);

  function generateBlocks() {
    const blocks = [];
    for (let time = 7.5; time <= 20.0; time += 0.5) {
      blocks.push({ value: time, label: formatBlockLabel(time) });
    }
    return blocks;
  }

  function formatBlockLabel(value) {
    const startHour = Math.floor(value);
    const startMin = value % 1 === 0.5 ? 30 : 0;
    const endValue = value + 0.5;
    const endHour = Math.floor(endValue);
    const endMin = endValue % 1 === 0.5 ? 30 : 0;
    return `${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)}`;
  }

  function formatTime(hour, minute) {
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = ((hour + 11) % 12) + 1;
    const formattedMinute = minute === 0 ? "00" : "30";
    return `${formattedHour}:${formattedMinute} ${suffix}`;
  }

  function formatTimeRange(start, end) {
    const startHour = Math.floor(start);
    const startMin = start % 1 === 0.5 ? 30 : 0;
    const endHour = Math.floor(end);
    const endMin = end % 1 === 0.5 ? 30 : 0;
    return `${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)}`;
  }

  useEffect(() => {
    if (startBlock && durationBlocks) {
      const start = parseFloat(startBlock);
      const end = start + parseFloat(durationBlocks);
      if (end > 21) {
        setReturnTime("Invalid - exceeds 9:00 PM");
      } else {
        setReturnTime(formatTime(Math.floor(end), end % 1 === 0.5 ? 30 : 0));
      }
    } else {
      setReturnTime("");
    }
  }, [startBlock, durationBlocks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!borrowDate || !startBlock || !durationBlocks || returnTime.includes("Invalid")) {
      alert("Please complete all fields correctly.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmRequest = async () => {
    setSubmitting(true);
    try {
      const startTime = parseFloat(startBlock);
      const endTime = startTime + parseFloat(durationBlocks);

      const user = auth.currentUser; // 🔥 get real user from Firebase auth

      if (!user) {
        alert("No user logged in. Please login first.");
        return;
      }

      const requestData = {
        userId: user.uid, // 🔥 real UID
        userName: user.displayName || user.email || "Unknown User",
        itemId: item.id || item.itemId,
        itemName: item.name,
        borrowDate: borrowDate,
        startTime: formatTime(Math.floor(startTime), startTime % 1 === 0.5 ? 30 : 0),
        returnTime: returnTime,
        reason: reason,
        timeRange: formatTimeRange(startTime, endTime),
        status: "Pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "borrowRequests"), requestData);

      console.log("✅ Borrow request submitted to Firestore.");
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("❌ Error submitting borrow request:", error);
      alert("Failed to submit request. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  const navLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Items", to: "/items" },
    { label: "My Requests", to: "/my-requests" },
    { label: "Activity Log", to: "/activity-log" },
    { label: "Profile", to: "/profile" },
  ];
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="request-form-page" style={{ minHeight: "100vh", backgroundColor: "#FAF9F6" }}>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E26901', padding: '10px 20px', color: 'white' }}>
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
          <button onClick={handleLogout} style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Log Out</button>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
        <Link to="/items" style={{ textDecoration: 'none', color: '#333', fontSize: '20px', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>← Back to Items</Link>
        <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>Borrow Request Form</h2>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Item Name:</label>
            <input type="text" value={item?.name || ""} disabled style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Borrowing:</label>
            <input type="date" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Reason for Borrowing:</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="3" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Time Slot (Start):</label>
              <select value={startBlock} onChange={(e) => { setStartBlock(e.target.value); setDurationBlocks(""); }} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <option value="">-- Select Start Slot --</option>
                {generateBlocks().map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Duration:</label>
              <select value={durationBlocks} onChange={(e) => setDurationBlocks(e.target.value)} required disabled={!startBlock} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', opacity: startBlock ? 1 : 0.6 }}>
                <option value="">-- Select Duration --</option>
                {startBlock && [0.5, 1, 1.5, 2].map((duration, idx) => (
                  <option key={idx} value={duration}>{duration === 0.5 ? "30 minutes" : `${duration} hours`}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Expected Return Time:</label>
            <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }}>{returnTime || "Return time will be shown here"}</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} style={{ marginRight: '10px' }} required />
              I agree to the terms and conditions.
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <button type="submit" disabled={!agree} style={{ backgroundColor: agree ? '#E26901' : '#ccc', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: agree ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>Submit Request</button>
          </div>
        </form>

        {showConfirmModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '500px', width: '90%' }}>
              <h3 style={{ marginTop: 0, color: '#333' }}>Confirm Borrow Request</h3>
              <p><strong>Item:</strong> {item?.name}</p>
              <p><strong>Borrow Date:</strong> {new Date(borrowDate).toLocaleDateString()}</p>
              <p><strong>Reason:</strong> {reason || "No reason provided."}</p>
              <p><strong>Selected Time:</strong> {formatTimeRange(parseFloat(startBlock), parseFloat(startBlock) + parseFloat(durationBlocks))}</p>
              <p><strong>Return Time:</strong> {returnTime}</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={handleConfirmRequest} disabled={submitting} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px' }}>{submitting ? "Submitting..." : "Confirm"}</button>
                <button onClick={() => setShowConfirmModal(false)} disabled={submitting} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '500px', width: '90%', textAlign: 'center' }}>
              <h2 style={{ color: '#4CAF50' }}>Request Submitted!</h2>
              <p>Your request is now pending approval.</p>
              <Link to="/my-requests" style={{ marginTop: '20px', display: 'inline-block', backgroundColor: '#E26901', color: 'white', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none' }}>Go to My Requests</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RequestForm;
