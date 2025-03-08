import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageHotels = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const fetchHotels = useCallback(async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/hotels?page=${page}`);
    console.log("API Response:", response.data);
    setHotels(response.data.data);
    setTotalPages(response.data.last_page);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    setHotels([]);
  }
}, []);

useEffect(() => {
  fetchHotels(currentPage);
}, [fetchHotels, currentPage]);

  return (
    <div>
      <h1>Manage Hotels</h1>
      <button onClick={() => navigate("/create-hotel")}>Create Hotel</button>
      <ul>
        {hotels.map((hotel) => (
            <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>

      <div>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
  >
    Previous
  </button>

  <span> Page {currentPage} of {totalPages} </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => prev + 1)}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default ManageHotels;
