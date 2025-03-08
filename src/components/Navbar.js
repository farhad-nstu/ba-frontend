// src/components/Navbar.js
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login" state={{ background: location }}>
        Login
      </Link>
      <Link to="/register" state={{ background: location }}>
        Register
      </Link>
    </nav>
  );
};

export default Navbar;
