// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {

    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#4a90e2',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    zIndex: 1000,
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '15px',
  };

  const navLinkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <nav style={navbarStyle}>
      <h1>
        To Do App
      </h1>
      <div className="nav-links">
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/boards" style={navLinkStyle}>Boards</Link>
      </div>
    </nav>
  );
};

export default Navbar;
