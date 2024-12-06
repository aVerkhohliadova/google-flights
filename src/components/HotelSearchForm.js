import React, { useState } from 'react';
import { searchDestination } from '../apis/HotelApis';

const HotelSearchForm = ({ onSubmit }) => {
    const [entityId, setEntityId] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [cityOptions, setCityOptions] = useState([]);
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [sorting, setSorting] = useState('price');
    const [showFullForm, setShowFullForm] = useState(false);

    const handleCityInput = async (value) => {
        if (value.length >= 3) {
            const data = await searchDestination(value);
            setCityOptions(data.map((item) => ({
                entityId: item.entityId,
                suggestItem: item.suggestItem,
            })))
        } else {
            setCityOptions([]);
        }
    };

    const reformatText = (input) => {
        return input.replace(/{strong}/g, '').replace(/{\/strong}/g, '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!entityId) {
            alert('Please select a valid city.');
            return;
        }

        onSubmit({
            entityId,
            checkin: checkinDate,
            checkout: checkoutDate,
            adults,
            rooms,
            sorting,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-form">
                <div>
                    <label className="search-form__label">
                        City
                        <input
                            type="text"
                            value={cityInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCityInput(value);
                                if (value.length >= 3) handleCityInput(value)
                            }}
                            required
                        />
                        {cityOptions.length > 0 && (
                            <ul className="search-form__dropdown">
                                {cityOptions.map((option) => (
                                    <li
                                        key={option.entityId}
                                        className="search-form__dropdown-item"
                                        onClick={() => {
                                            setEntityId(option.entityId);
                                            setCityInput(reformatText(option.suggestItem));
                                            setCityOptions([]);
                                        }}
                                    >
                                        {reformatText(option.suggestItem)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>
                </div>
                <div>
                    <label className="search-form__label">Check-in Date</label>
                    <input
                        className="search-form__input"
                        type="date"
                        value={checkinDate}
                        onChange={(e) => setCheckinDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="search-form__label">Check-out Date</label>
                    <input
                        className="search-form__input"
                        type="date"
                        value={checkoutDate}
                        onChange={(e) => setCheckoutDate(e.target.value)}
                        required
                    />
                </div>

                <button type="button" className="search-form__toggle-button" onClick={() => setShowFullForm(!showFullForm)}>
                    {showFullForm ? 'Show Less' : 'Show More'}
                </button>

                {showFullForm && (
                    <div className="search-form__extended">
                        <div>
                            <label className="search-form__label">Adults</label>
                            <input
                                className="search-form__input"
                                type="number"
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="search-form__label">Rooms</label>
                            <input
                                className="search-form__input"
                                type="number"
                                value={rooms}
                                onChange={(e) => setRooms(e.target.value)}
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="search-form__label">Sort by</label>
                            <select
                                className="search-form__select"
                                value={sorting}
                                onChange={(e) => setSorting(e.target.value)}
                            >
                                <option value="-relevance">Relevance (Descending)</option>
                                <option value="-price">Price (High to Low)</option>
                                <option value="price">Price (Low to High)</option>
                                <option value="distance">Distance</option>
                                <option value="-hotel_rating">Rating (Descending)</option>
                                <option value="-stars">Stars (High to Low)</option>
                                <option value="stars">Stars (Low to High)</option>
                            </select>
                        </div>
                    </div>
                )}
                <button type="submit" className="search-form__button">Search Hotels</button>
            </form>
        </div>
    );
};

export default HotelSearchForm;