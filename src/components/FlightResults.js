import React from 'react';

const FlightResults = ({ flights }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}   |   ${year}-${month}-${day}`;
  };

  return (
    <div className="results">
      {flights && flights.length > 0 ? (
        flights.map((flight, index) => {
          const firstLeg = flight.legs[0];
          const secondLeg = flight.legs[1];

          const airline = firstLeg?.carriers?.marketing?.[0];
          const airlineName = airline ? airline.name : 'Unknown Airline';
          const airlineLogo = airline ? airline.logoUrl : '';

          const durationInHours = Math.floor(firstLeg?.durationInMinutes / 60);
          const durationInMinutes = firstLeg?.durationInMinutes % 60;

          return (
            <div key={index} className="results-card">
              <h2>{airlineName}</h2>
              {airlineLogo && <img src={airlineLogo} alt={airlineName} />}
              <div className="flight-info">
                <p className="price">Price: {flight.price.formatted}</p>
                <p>Duration: {durationInHours} hours {durationInMinutes} minutes</p>
                <p>Departure: {formatDate(firstLeg.departure)}</p>
                <p>Arrival: {formatDate(firstLeg.arrival)}</p>
                {secondLeg && (
                  <div className="return-info">
                    <p>Return Departure: {formatDate(secondLeg.departure)}</p>
                    <p>Return Arrival: {formatDate(secondLeg.arrival)}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default FlightResults;
