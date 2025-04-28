import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseconfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import logo from "../assets/CCSGadgetHub1.png";

const MyRequests = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 👈 Default is now "all"
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("✅ Authenticated user:", user.uid);
        setUserId(user.uid);
      } else {
        console.warn("❌ No authenticated user found.");
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) {
        console.warn("⏳ User not loaded yet, skipping fetch...");
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, "borrowRequests"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        console.log("✅ Borrow requests fetched:", fetched);
        setRequests(fetched);
      } catch (error) {
        console.error("❌ Error fetching borrow requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.itemName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "-";
    return new Date(dateTimeStr).toLocaleString();
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    });
  };

  return (
    <div className="items-page" style={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: "#E26901", padding: "10px 20px", display: "flex", alignItems: "center", color: "white" }}>
        <img src={logo} alt="CCS Gadget Hub Logo" style={{ height: "50px", marginRight: "20px" }} />
        <nav style={{ display: "flex", gap: "20px" }}>
          {[
            { label: "Dashboard", to: "/userdashboard" },
            { label: "Items", to: "/useritems" },
            { label: "My Requests", to: "/my-requests" },
            { label: "Profile", to: "/userprofile" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: location.pathname === link.to ? "bold" : "normal",
                borderBottom: location.pathname === link.to ? "2px solid white" : "none",
                paddingBottom: "4px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", fontSize: "16px", cursor: "pointer" }}>
            Log Out
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="dashboard-container" style={{ padding: "30px" }}>
        <h2 className="featured-title" style={{ marginBottom: "20px", textAlign: "center", color: "#333" }}>My Requests</h2>

        {/* Filter bar */}
        <div className="filter-bar" style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <option value="all">All</option> {/* 👈 Added ALL tab */}
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="returned">Returned</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading requests...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
              <thead style={{ backgroundColor: "#f5f5f5" }}>
                <tr>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Item</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Request Date</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Status</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Returned Date & Time</th>
                  <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id}>
                      <td style={{ padding: "12px", textAlign: "center" }}>{req.itemName || "-"}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>{formatDate(req.borrowDate)}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <span style={{
                          padding: "5px 10px",
                          borderRadius: "12px",
                          backgroundColor:
                            req.status.toLowerCase() === "approved" ? "#4CAF50" :
                            req.status.toLowerCase() === "pending" ? "#FFA500" :
                            req.status.toLowerCase() === "returned" ? "#2196F3" :
                            "#f44336",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "13px"
                        }}>
                          {req.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        {req.status.toLowerCase() === "returned" ? formatDateTime(req.returnDate) : "-"}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => navigate(`/view-request/${req.id}`)}
                          style={{ backgroundColor: "#E26901", color: "white", padding: "8px 16px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>No requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
