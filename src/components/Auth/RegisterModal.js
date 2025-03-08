// src/components/Auth/RegisterModal.js
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const RegisterModal = () => {
  const navigate = useNavigate();

  const handleClose = () => navigate(-1); // Close Modal

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterModal;
