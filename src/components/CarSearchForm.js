import React, { useState } from 'react';
import { searchLocation } from '../apis/CarApis';

const CarSearchForm = ({ onSubmit }) => {
    const [pickUpEntityId, setPickUpEntityId] = useState('');
    const [pickUpLocationInput, setPickUpLocationInput] = useState('');
    const [pickUpLocationOptions, setPickUpLocationOptions] = useState([]);
    const [dropOffEntityId, setDropOffEntityId] = useState('');
    const [dropOffLocationInput, setDropOffLocationInput] = useState('');
    const [dropOffLocationOptions, setDropOffLocationOptions] = useState([]);
    const [pickUpDate, setPickUpDate] = useState('');
    const [pickUpTime, setPickUpTime] = useState('');
    const [dropOffDate, setDropOffDate] = useState('');
    const [dropOffTime, setDropOffTime] = useState('');
    const [driverAge, setDriverAge] = useState(21);
    const [showFullForm, setShowFullForm] = useState(false);

    const handleLocationInput = async (value, setOptions) => {
        if (value.length >= 3) {
            const data = await searchLocation(value);
            setOptions(data.map((item) => ({
                entityId: item.entity_id,
                entity_name: item.entity_name,
            })));
        } else {
            setOptions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pickUpEntityId) {
            alert('Please select a valid city.');
            return;
        }

        onSubmit({
            pickUpEntityId,
            dropOffEntityId,
            pickUpDate,
            pickUpTime,
            dropOffDate,
            dropOffTime,
            driverAge,
        });
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            options.push(
              <option key={time} value={time}>
                {time}
              </option>
            );
          }
        }
        return options;
      };

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-form">
                <div>
                    <label className="search-form__label">
                        Pick-up Location
                        <input
                            type="text"
                            value={pickUpLocationInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPickUpLocationInput(value);
                                if (value.length >= 3) handleLocationInput(value, setPickUpLocationOptions)
                            }}
                            required
                        />
                        {pickUpLocationOptions.length > 0 && (
                            <ul className="search-form__dropdown">
                                {pickUpLocationOptions.map((option) => (
                                    <li
                                        key={option.entityId}
                                        className="search-form__dropdown-item"
                                        onClick={() => {
                                            setPickUpEntityId(option.entityId);
                                            setPickUpLocationInput(option.entity_name);
                                            setPickUpLocationOptions([]);
                                        }}
                                    >
                                        {option.entity_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>
                </div>

                <div>
                    <label className="search-form__label">Pick-up Date</label>
                    <input
                        className="search-form__input"
                        type="date"
                        value={pickUpDate}
                        onChange={(e) => setPickUpDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="search-form__label">Pick-up Time</label>
                    <input
                        className="search-form__input"
                        type="time"
                        value={pickUpTime}
                        onChange={(e) => setPickUpTime(e.target.value)}
                        required
                    />
                </div>

                <button type="button" className="search-form__toggle-button" onClick={() => setShowFullForm(!showFullForm)}>
                    {showFullForm ? 'Show Less' : 'Show More'}
                </button>

                {showFullForm && (
                    <div className="search-form__extended">
                        <div>
                            <label className="search-form__label">
                                Drop-off Location
                            <input
                                className="search-form__input"
                                type="text"
                                placeholder="Enter location"
                                value={dropOffLocationInput}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setDropOffLocationInput(value);
                                    if (value.length >= 3) handleLocationInput(value, setDropOffLocationOptions)
                                }}
                            />
                            {dropOffLocationOptions.length > 0 && (
                                <ul className="search-form__dropdown">
                                    {dropOffLocationOptions.map((option) => (
                                        <li
                                            key={option.entityId}
                                            className="search-form__dropdown-item"
                                            onClick={() => {
                                                setDropOffEntityId(option.entityId);
                                                setDropOffLocationInput(option.entity_name);
                                                setDropOffLocationOptions([]);
                                            }}
                                        >
                                            {option.entity_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            </label>
                        </div>

                        <div>
                            <label className="search-form__label">Drop-off Date</label>
                            <input
                                className="search-form__input"
                                type="date"
                                value={dropOffDate}
                                onChange={(e) => setDropOffDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="search-form__label">Drop-off Time</label>
                            <input
                                className="search-form__input"
                                type="time"
                                value={dropOffTime}
                                onChange={(e) => setDropOffTime(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="search-form__label">Driver Age</label>
                            <input
                                className="search-form__input"
                                type="number"
                                value={driverAge}
                                onChange={(e) => setDriverAge(e.target.value)}
                                min="21"
                            />
                        </div>
                    </div>
                )}

                <button type="submit" className="search-form__button">Search Cars</button>
            </form>
        </div>
    );
};

export default CarSearchForm;
