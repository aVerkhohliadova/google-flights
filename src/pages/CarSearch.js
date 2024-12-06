import React, { useState } from 'react';
import CarSearchForm from '../components/CarSearchForm';
import CarResults from '../components/CarResults';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchCars } from '../apis/CarApis';

const CarSearch = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date)) {
            return date.toISOString().split('T')[0]; // Extract yyyy-MM-dd from ISO string
        }
        return null;
    };
    

    const handleSearchSubmit = async ({
        pickUpEntityId,
        dropOffEntityId,
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime,
        driverAge,
    }) => {
        setLoading(true);
        setError(null);
    
        try {
            const carsData = await searchCars(
                pickUpEntityId,
                dropOffEntityId || null,
                formatDate(pickUpDate),
                pickUpTime,
                dropOffDate ? formatDate(dropOffDate) : null,
                dropOffTime || null,
                driverAge,
            );
    
            if (carsData && carsData.status === true) {
                setCars(carsData.data.quotes || []);
            } else {
                setCars([]);
                setError('No cars found for the selected route and dates.');
            }
        } catch (err) {
            console.error('Error fetching cars:', err);
            setError('An error occurred while fetching car data.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="car-search">
            <h1>Car Seacrh</h1>
            <CarSearchForm onSubmit={handleSearchSubmit} />
            {loading && (
                <div className="loading-spinner">
                    <LoadingSpinner />
                </div>
            )}
            {error && <p className="error">{error}</p>}
            <CarResults cars={cars} />
        </div>
    );
};

export default CarSearch;