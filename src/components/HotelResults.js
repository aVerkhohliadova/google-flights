import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelResults = ({ hotels }) => {
  const navigate = useNavigate();

  const handleViewDetails = (hotelId) => {
    navigate(`/hotel-details/${hotelId}`);
  };

  return (
    <div className="results">
      {hotels && hotels.length > 0 ? (
        hotels.map((hotel) => (
          <div key={hotel.hotelId} className="results-card">
            <img
              src={hotel.heroImage || hotel.images[0]}
              alt={hotel.name}
              className="hotel-card__image"
            />
            <div className="hotel-card__details">
              <h2 className="hotel-card__name">{hotel.name}</h2>
              <p><strong>Distance:</strong> {hotel.distance}</p>
              <p><strong>Price:</strong> {hotel.price || hotel.cheapestOffer}</p>
              <p><strong>Rating:</strong> {hotel.rating ? hotel.rating.value : 'No rating available'}</p>

              {hotel.relevantPoiDistance && (
                <div className="hotel-card__poi">
                  <strong>Nearby Points of Interest:</strong>
                  <p>{hotel.relevantPoiDistance}</p>
                </div>
              )}

              <button
                className="hotel-card__details-button"
                onClick={() => handleViewDetails(hotel.hotelId)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default HotelResults;
