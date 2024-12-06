import React, { useState } from 'react';
import { searchAirport } from '../apis/FlightApis';

const FlightSearchForm = ({ onSubmit }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState('economy');
  const [sortBy, setSortBy] = useState('best');
  const [showFullForm, setShowFullForm] = useState(false);

  const handleSearchAirport = async (iata, setOptions) => {
    try {
      const data = await searchAirport(iata);
      setOptions(data.map((item) => ({
        skyId: item.skyId,
        entityId: item.entityId,
        title: item.presentation.suggestionTitle,
      })));
    } catch (error) {
      console.error("Error fetching airport options:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert('Please select a valid origin and destination.');
      return;
    }

    onSubmit({
      originSkyId: origin.skyId,
      destinationSkyId: destination.skyId,
      originEntityId: origin.entityId,
      destinationEntityId: destination.entityId,
      date: departureDate,
      returnDate,
      adults,
      children,
      infants,
      cabinClass,
      sortBy,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <div>
          <label className="search-form__label">
            Origin:
            <input
              type="text"
              value={originInput}
              onChange={(e) => {
                const value = e.target.value;
                setOriginInput(value);
                if (value.length >= 3) handleSearchAirport(value, setOriginOptions);
              }}
              required
            />
            {originOptions.length > 0 && (
              <ul className="search-form__dropdown">
                {originOptions.map((option) => (
                  <li
                    key={option.skyId}
                    className="search-form__dropdown-item"
                    onClick={() => {
                      setOrigin(option);
                      setOriginInput(option.title);
                      setOriginOptions([]);
                    }}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>

        <div>
          <label className="search-form__label">
            Destination:
            <input
              type="text"
              value={destinationInput}
              onChange={(e) => {
                const value = e.target.value;
                setDestinationInput(value);
                if (value.length >= 3) handleSearchAirport(value, setDestinationOptions);
              }}
              required
            />
            {destinationOptions.length > 0 && (
              <ul className="search-form__dropdown">
                {destinationOptions.map((option) => (
                  <li
                    key={option.skyId}
                    className="search-form__dropdown-item"
                    onClick={() => {
                      setDestination(option);
                      setDestinationInput(option.title);
                      setDestinationOptions([]);
                    }}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>

        <div>
          <label className="search-form__label">
            Departure Date:
            <input
              className="search-form__input"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label className="search-form__label">
            Return Date:
            <input
              className="search-form__input"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label className="search-form__label">
            Adults:
            <input
              className="search-form__input"
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              min="1"
              required
            />
          </label>
        </div>

        <button type="button" className="search-form__toggle-button" onClick={() => setShowFullForm(!showFullForm)}>
          {showFullForm ? 'Show Less' : 'Show More'}
        </button>

        {showFullForm && (
          <div className="search-form__extended">
            <div>
              <label className="search-form__label">
                Children (2-12 years):
                <input
                  className="search-form__input"
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  min="0"
                />
              </label>
            </div>

            <div>
              <label className="search-form__label">
                Infants (Under 2 years):
                <input
                  className="search-form__input"
                  type="number"
                  value={infants}
                  onChange={(e) => setInfants(e.target.value)}
                  min="0"
                />
              </label>
            </div>

            <div>
              <label className="search-form__label">
                Cabin Class:
                <select className="search-form__select" value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
                  <option value="economy">Economy</option>
                  <option value="premium_economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </select>
              </label>
            </div>

            <div>
              <label className="search-form__label">
                Sort By:
                <select className="search-form__select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="best">Best</option>
                  <option value="price_high">Cheapest</option>
                  <option value="fastest">Fastest</option>
                  <option value="outbound_take_off_time">Outbound Take Off Time</option>
                  <option value="outbound_landing_time">Outbound Landing Time</option>
                  <option value="return_take_off_time">Return Take Off Time</option>
                  <option value="return_landing_time">Return Landing Time</option>
                </select>
              </label>
            </div>
          </div>
        )}

        <button type="submit" className="search-form__button">Search Flights</button>
      </form>
    </div>
  );
};

export default FlightSearchForm;
