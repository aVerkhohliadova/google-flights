import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightSearch from './pages/FlightSearch';
import HotelSearch from './pages/HotelSearch';
import CarSearch from './pages/CarSearch';
import Navbar from './components/NavBar';
import HotelDetails from './pages/HotelDetails';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<FlightSearch />} />
          <Route path="/hotels" element={<HotelSearch />} />
          <Route path="/cars" element={<CarSearch />} />

          <Route path="/hotel-details/:hotelId" element={<HotelDetails /> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
