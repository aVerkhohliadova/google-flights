import React, { useState } from 'react';
import HotelSearchForm from '../components/HotelSearchForm';
import HotelResults from '../components/HotelResults';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchHotels } from '../apis/HotelApis';

const HotelSearch = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchSubmit = async ({
        entityId,
        checkin,
        checkout,
        adults,
        rooms,
        sorting,
    }) => {
        setLoading(true);
        setError(null);

        try {
            if (!entityId || !checkin || !checkout || !adults || !rooms) {
                setError('All fields are required.');
                return;
            }

            const hotelData = await searchHotels({
                entityId,
                checkin,
                checkout,
                adults,
                rooms,
                sorting,
            });

            localStorage.setItem('entityId', entityId);

            if (hotelData && hotelData.status && hotelData.status === true) {
                if (hotelData.data && hotelData.data.hotels) {
                    setHotels(hotelData.data.hotels); 
                } else {
                    setHotels([]); 
                    setError('No hotels found for the selected criteria.');
                }
            } else {
                setError('No hotels found for the selected criteria.');
            }
        } catch (err) {
            console.error('Error fetching hotels:', err);
            setError('An error occurred while fetching hotel data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hotel-search">
            <h1>Hotel Search</h1>
            <HotelSearchForm onSubmit={handleSearchSubmit} />
            {loading && (
                <div className="loading-spinner">
                    <LoadingSpinner />
                </div>
            )}
            {error && <p className="error">{error}</p>}
            <HotelResults hotels={hotels} />
        </div>
    );
};

export default HotelSearch;
