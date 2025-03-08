// src/components/Navbar.js
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <Link to="/">Home</Link> &nbsp;&nbsp;
      <Link to="/manage-hotels">Manage Hotles</Link> &nbsp;&nbsp;
      <Link to="/login" state={{ background: location }}>
        Login
      </Link> &nbsp;&nbsp;
      <Link to="/register" state={{ background: location }}>
        Register
      </Link>
    </nav>
  );
};

export default Navbar;
