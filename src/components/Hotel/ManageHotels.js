import React, { useEffect, useState } from 'react';
import { api } from '../api';

const ManageHotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        api.get('/hotels').then(response => {
            setHotels(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Manage Hotels</h1>
            {hotels.map((hotel) => (
                <div key={hotel.id}>
                    <h2>{hotel.name}</h2>
                    <p>{hotel.address}</p>
                </div>
            ))}
        </div>
    );
};

export default ManageHotels;
