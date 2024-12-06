import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHotelDetails } from '../apis/HotelApis';

const HotelDetails = () => {
    const { hotelId } = useParams();
    const [hotelDetails, setHotelDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getHotelDetails = async () => {
            try {
                const data = await fetchHotelDetails(hotelId);
                setHotelDetails(data);
            } catch (err) {
                setError('An error occurred while fetching hotel details.');
            } finally {
                setLoading(false);
            }
        };

        getHotelDetails();
    }, [hotelId]); 

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <p className="error">{error}</p>;
    
    return (
        <div className="hotel-details">
            <header className="hotel-header">
                <h1>{hotelDetails.general.name}</h1>
                <div className="hotel-rating">
                    <span className="stars">{'★'.repeat(hotelDetails.general.stars)}</span>
                </div>
            </header>

            <section className="hotel-gallery">
                <h2>Gallery</h2>
                <div className="gallery-scroll">
                    {hotelDetails.gallery.images.map((image, index) => (
                        <div key={index} className="gallery-item">
                            <img src={image.dynamic} alt={`Gallery image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="hotel-description">
                <h2>Hotel Description</h2>
                <p>{hotelDetails.goodToKnow.description.content}</p>
            </section>

            <section className="hotel-checkin">
                <h2>{hotelDetails.goodToKnow.title}</h2>
                <p><strong>{hotelDetails.goodToKnow.checkinTime.title}: </strong>{hotelDetails.goodToKnow.checkinTime.time}</p>
                <p><strong>{hotelDetails.goodToKnow.checkoutTime.title}: </strong>{hotelDetails.goodToKnow.checkoutTime.time}</p>
            </section>

            <section className="hotel-policies">
                <h2>{hotelDetails.goodToKnow.policies.title}</h2>
                {hotelDetails.goodToKnow.policies.content.map((policy, policyIndex) => (
                    <div key={policyIndex}>
                        <strong>{policy.type}:</strong>
                        {policy.values.map((value, valueIndex) => (
                            <div key={valueIndex} className="policy-value">
                                <h3>{value.title}</h3>
                                <p>{value.content}</p>
                                <p>
                                    <strong>Cost:</strong> {value.is_free ? 'Free' : 'Additional payment required'}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <section className="hotel-location">
                <h2>Location</h2>
                <p>{hotelDetails.location.shortAddress}</p>
                <p>{hotelDetails.location.address}</p>
            </section>

            <section className="hotel-amenities">
                <h2>{hotelDetails.amenities.title}</h2>
                {hotelDetails.amenities.contentV2.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="amenities-category">
                        <h3>{category.category}</h3>
                        <ul>
                            {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item.description}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section className="hotel-reviews">
                <h2>{hotelDetails.reviews.newTitle}</h2>
                <p>{hotelDetails.reviews.summaryDescription}</p>
                <div>
                    <span className="score">{hotelDetails.reviews.rating}   </span>
                    ({hotelDetails.reviews.numberOfReviewsLabel})
                </div>

                {hotelDetails.reviews.explanations && hotelDetails.reviews.explanations.length > 0 && (
                    <div className="explanations">
                        {hotelDetails.reviews.explanations.map((explanation, index) => (
                            <div key={index} className="explanation">
                                <h3>{explanation.title}</h3>
                                <p>{explanation.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
};

export default HotelDetails;
