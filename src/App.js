// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginModal from "./components/Auth/LoginModal";
import RegisterModal from "./components/Auth/RegisterModal";
import Navbar from "./components/Navbar";
import CreateHotel from "./pages/CreateHotel";
import ManageHotels from "./pages/ManageHotels";
import HotelDetails from "./pages/HotelDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainRoutes />
    </Router>
  );
};

// Component to handle parallel and intercepting routes
const MainRoutes = () => {
  const location = useLocation();
  const background = location.state?.background || location;

  return (
    <>
      {/* Main Routes */}
      <Routes location={background}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/manage-hotels" element={<ManageHotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/create-hotel" element={<CreateHotel />} />
      </Routes>

      {/* Modal Routes (Intercepting) */}
      {background !== location && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<RegisterModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
