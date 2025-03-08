import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateHotel = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cost_per_night: "",
    available_rooms: "",
    image_url: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/hotels", formData);
      navigate("/manage-hotels");
    } catch (err) {
      setError("Error creating hotel. Please try again.");
      console.error("Error creating hotel:", err);
    }
  };

  return (
    <div>
      <h2>Create a New Hotel</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cost per Night ($):</label>
          <input
            type="number"
            name="cost_per_night"
            value={formData.cost_per_night}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Available Rooms:</label>
          <input
            type="number"
            name="available_rooms"
            value={formData.available_rooms}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Hotel</button>
      </form>
    </div>
  );
};

export default CreateHotel;
