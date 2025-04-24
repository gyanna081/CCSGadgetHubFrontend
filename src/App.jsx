import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Items from "./pages/items";
import ItemDetails from "./pages/itemdetails";
import RequestForm from "./pages/requestform";
import Register from './pages/register';
import Profile from "./pages/profile";
import EditProfile from "./pages/editprofile";
import MyRequests from "./pages/my-requests";
import ViewRequest from "./pages/view-request";
import "./index.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/item-details/:itemId" element={<ItemDetails />} /> {/* Dynamic route for item details */}
        <Route path="/borrow/:itemId" element={<RequestForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/view-request/:id" element={<ViewRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
