import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Flights</Link></li>
        <li><Link to="/hotels">Hotels</Link></li>
        <li><Link to="/cars">Cars</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
