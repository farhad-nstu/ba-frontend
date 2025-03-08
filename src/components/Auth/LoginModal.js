// src/components/Auth/LoginModal.js
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const LoginModal = () => {
  const navigate = useNavigate();

  const handleClose = () => navigate(-1); // Close Modal

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
