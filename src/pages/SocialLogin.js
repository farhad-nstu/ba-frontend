// src/pages/SocialLogin.js
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SocialLogin = () => {
  const { login } = useContext(AuthContext); // Access login method from AuthContext
  const location = useLocation(); // Get URL parameters
  const navigate = useNavigate(); // Redirect to another page

  useEffect(() => {
    // Extract token from URL (e.g., ?token=abc123)
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      // Call login to save token in context and localStorage
      login({ token });

      // Redirect to dashboard or any protected page
      navigate("/dashboard");
    } else {
      // Redirect to login if no token found
      navigate("/login");
    }
  }, [location, login, navigate]);

  return <h2>Processing social login...</h2>;
};

export default SocialLogin;
