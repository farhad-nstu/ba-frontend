import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch paginated hotels
  const fetchHotels = useCallback(async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/hotels?page=${page}`);
      setHotels(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }, []);

  useEffect(() => {
    fetchHotels(currentPage);
  }, [fetchHotels, currentPage]);

  // Delete hotel function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await axios.delete(`http://localhost:8000/api/hotels/${id}`);
        alert("Hotel deleted successfully");
        fetchHotels(currentPage); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting hotel:", error);
        alert("Failed to delete hotel");
      }
    }
  };

  // Navigate to the Edit Hotel page
  const handleEdit = (id) => {
    navigate(`/hotels/edit/${id}`);
  };

  return (
    <div>
      <h1>Manage Hotels</h1>

      <button onClick={() => navigate("/hotels/create")}>Create Hotel</button>

      {hotels.length === 0 ? (
        <p>No hotels available.</p>
      ) : (
        <div>

        <table className="table striped-bordered">
            <thead>
                <tr>
                    <th>Hotel Name</th>
                    <th>Address</th>
                    <th>Cost Per Night</th>
                    <th>Available Rooms</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {hotels.map((hotel) => (
                    <tr key={hotel.id}>
                        <td>{hotel.name}</td>
                        <td>{hotel.address}</td>
                        <td>{hotel.cost_per_night}</td>
                        <td>{hotel.available_rooms}</td>
                        <td>
                            <img src={hotel.image_url} alt={hotel.name} style={{ width: "200px" }} />
                        </td>
                        <td>
                            <button onClick={() => handleEdit(hotel.id)}>Edit</button>
                            <button onClick={() => handleDelete(hotel.id)}>Delete</button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
        </div>
      )}

      <div>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </button>

        <span> Page {currentPage} of {totalPages} </span>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageHotels;
