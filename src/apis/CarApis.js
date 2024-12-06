import axios from 'axios';
import { API_BASE_URL, headers } from './api';

// Fetch pickUpEntityId or dropOffEntityId based on city
export const searchLocation = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/cars/searchLocation`, {
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
      console.error('Error while searching for locations:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  // Search for cars
  export const searchCars = async (pickUpEntityId, dropOffEntityId, pickUpDate, pickUpTime, dropOffDate, dropOffTime, driverAge) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/cars/searchCars`, {
        headers,
        params: {
          pickUpEntityId,
          dropOffEntityId,
          pickUpDate,
          pickUpTime,
          dropOffDate,
          dropOffTime,
          driverAge
        },
      });
  
      if (response.status === 200 && response.data.status) {
        return response.data;
      } else {
        console.error('Error in API response:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error while searching for cars:', error);
      throw error;
    }
  };