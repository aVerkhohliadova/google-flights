import axios from 'axios';
import { API_BASE_URL, headers } from './api';

// Fetch entityId based on city
export const searchDestination = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hotels/searchDestinationOrHotel`, {
      headers,
      params: { query },
    });

    if (response.status === 200 && response.data.status) {
      return response.data.data;
    } else {
      console.error('Error in API response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error while searching for hotels:', error);
    throw error;
  }
};

// Search for hotels
export const searchHotels = async ({
  entityId,
  checkin,
  checkout,
  adults,
  rooms,
  sorting,
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hotels/searchHotels`, {
      headers,
      params: {
        entityId,
        checkin,
        checkout,
        adults,
        rooms,
        sorting,
      }
    });

    if (response.status === 200 && response.data.status) {
      return response.data;
    } else {
      console.error('Error in API response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error while searching for hotels:', error);
    throw error; 
  }
};

// Fetching hotel details
export const fetchHotelDetails = async (hotelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hotels/getHotelDetails`, {
      headers,
      params: { 
        hotelId,
        entityId: localStorage.getItem('entityId'),
      },
    });

    if (response.status === 200 && response.data.status) {
      return response.data.data;
    } else {
      console.error('Error in API response:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error while fetching hotel details:', error);
    throw error;
  }
};
