import React from 'react';

const CarResults = ({ cars }) => {
  return (
    <div className="results">
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <div key={car.guid} className="results-card">
            <div className="car-card__details">
              <h2 className="car-card__name">{car.car_name}</h2>
              <p><strong>Vendor:</strong> {car.vndr}</p>
              <p><strong>Price:</strong> ${car.price.toFixed(2)}</p>
              <p><strong>Score:</strong> {car.new_score}</p>

              <div className="car-card__details-section">
                <p><strong>Rating:</strong> {car.vndr_rating ? car.vndr_rating.overall_rating : 'No rating available'}</p>
                <p><strong>Bags Allowed:</strong> {car.bags}</p>
              </div>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default CarResults;
