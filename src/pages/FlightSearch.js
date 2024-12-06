import React, { useState } from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightResults from '../components/FlightResults';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchFlights } from '../apis/FlightApis';

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async ({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    returnDate,
    adults,
    children,
    infants,
    cabinClass,
    sortBy,
  }) => {
    setLoading(true);
    setError(null);

    try {
      if (!originSkyId || !destinationSkyId || !originEntityId || !destinationEntityId) {
        setError('Invalid origin or destination airport IDs.');
        return;
      }

      const flightData = await searchFlights({
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        returnDate,
        adults,
        children,
        infants,
        cabinClass,
        sortBy,
      });

      if (flightData && flightData.status && flightData.status === true) {
        if (flightData.data && flightData.data.itineraries && flightData.data.itineraries.length > 0) {
          setFlights(flightData.data.itineraries);
        } else {
          setFlights([]);
          setError('No flights found for the selected route and dates.');
        }
      } else {
        setError('No flights found for the selected route and dates.');
      }
    } catch (err) {
      console.error('Error fetching flights:', err);
      setError('An error occurred while fetching flight data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-search">
      <h1>Flight Search</h1>
      <FlightSearchForm onSubmit={handleSearchSubmit} />
      {loading && (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <FlightResults flights={flights} />
    </div>
  );
};

export default FlightSearch;
