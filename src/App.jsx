import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Items from "./pages/items";
import ItemDetails from "./pages/itemdetails";
import RequestForm from "./pages/requestform";
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
      </Routes>
    </Router>
  );
}

export default App;
