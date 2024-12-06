import axios from 'axios';
import { API_BASE_URL, headers } from './api';

// Fetch SkyId and EntityId for an airport by IATA code
export const searchAirport = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/flights/searchAirport`, {
      headers,
      params: { query },
    });

    if (response.data && response.data.status === true) {
      return response.data.data;
    } else {
      throw new Error("No matching airport or city found.");
    }
  } catch (error) {
    console.error("Error searching for airport:", error);
    throw error;
  }
};

// Search for flights between two airports with the required parameters
export const searchFlights = async ({
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  returnDate,
  cabinClass,
  adults,
  children,
  infants,
  sortBy,
  limit = 100,
  carriersIds = '',
  currency
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/flights/searchFlights`, {
      headers,
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        returnDate,
        cabinClass,
        adults,
        children,
        infants,
        sortBy,
        limit,
        carriersIds,
        currency
      }
    });
    return response.data;  // Return the flight search results
  } catch (error) {
    console.error("Error searching for flights:", error);
    throw error;
  }
};
