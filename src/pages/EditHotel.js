import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: "",
    address: "",
    cost_per_night: "",
    available_rooms: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/hotels/${id}`, hotel);
      alert("Hotel updated successfully!");
      navigate("/hotels");
    } catch (error) {
      console.error("Error updating hotel:", error);
      alert("Failed to update hotel");
    }
  };

  return (
    <div>
      <h1>Edit Hotel</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" value={hotel.name} onChange={handleChange} required /></label>
        <label>Address: <input type="text" name="address" value={hotel.address} onChange={handleChange} required /></label>
        <label>Cost per Night: <input type="number" name="cost_per_night" value={hotel.cost_per_night} onChange={handleChange} required /></label>
        <label>Available Rooms: <input type="number" name="available_rooms" value={hotel.available_rooms} onChange={handleChange} required /></label>
        <label>Image URL: <input type="text" name="image_url" value={hotel.image_url} onChange={handleChange} /></label>
        <button type="submit">Update Hotel</button>
      </form>
      <button onClick={() => navigate("/hotels")}>Cancel</button>
    </div>
  );
};

export default EditHotel;
