import { useNavigate } from "react-router-dom";
import axios from "axios";

const HotelCard = ({ hotel, onRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      await axios.delete(`/api/hotels/${hotel.id}`);
      onRefresh();
    }
  };

  return (
    <div className="hotel-card">
      <img src={hotel.image_url} alt={hotel.name} />
      <h2>{hotel.name}</h2>
      <p>{hotel.address}</p>
      <p>${hotel.cost_per_night} per night</p>
      <p>Available Rooms: {hotel.available_rooms}</p>
      <p>Rating: {hotel.average_rating}</p>

      <button onClick={() => navigate(`/hotels/${hotel.id}`)}>View Details</button>
      <button onClick={() => navigate(`/edit-hotel/${hotel.id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default HotelCard;
