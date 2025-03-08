import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SocialShare from "../components/SocialShare";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotelDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!hotel) return <p>Hotel not found.</p>;

  const shareUrl = `${window.location.origin}/hotels/${id}`;
  const shareTitle = `${hotel.name} - Book Now!`;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <img src={hotel.image_url} alt={hotel.name} />
      <p>Address: {hotel.address}</p>
      <p>Cost per night: ${hotel.cost_per_night}</p>
      <p>Available Rooms: {hotel.available_rooms}</p>
      <p>Rating: {hotel.average_rating}</p>

      {/* Social Sharing */}
      <SocialShare url={shareUrl} title={shareTitle} />
    </div>
  );
};

export default HotelDetails;
