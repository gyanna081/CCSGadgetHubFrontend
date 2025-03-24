import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { signOut } from "firebase/auth";
import "../pages/dashboard.css";

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
    <div className="min-h-screen bg-[#FAF3E0]">
      {/* Navigation Bar */}
      <div className="bg-[#D96528] text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">CCS Gadget Hub</div>
        <nav className="flex space-x-6 font-medium">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Items</a>
          <a href="#" className="hover:underline">My Requests</a>
          <a href="#" className="hover:underline">Activity Log</a>
          <a href="#" className="hover:underline">Profile</a>
        </nav>
        <button 
          onClick={handleLogout} 
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-5xl mx-auto">
        {/* Search Bar & Buttons */}
        <div className="flex items-center space-x-4 mb-6">
          <input 
            type="text" 
            placeholder="Enter items here" 
            className="p-2 border rounded flex-grow"
          />
          <button className="bg-[#D96528] text-white px-4 py-2 rounded hover:bg-[#B8501B] transition">
            Borrow Item
          </button>
          <button className="bg-[#D96528] text-white px-4 py-2 rounded hover:bg-[#B8501B] transition">
            View Requests
          </button>
        </div>

        {/* Featured Items */}
        <h2 className="text-xl font-bold mb-4">Featured Items</h2>
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white p-4 h-40 rounded shadow-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
