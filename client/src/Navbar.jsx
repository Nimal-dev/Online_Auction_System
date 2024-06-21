import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const airway = {
    color: '#931FFF', 
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '1.5px 1.5px 3px rgba(0, 0, 0, 0.8)',
    letterSpacing: '1.5px',
  };

  return (
    <nav style={{ backgroundColor: '#B59DFA', width: '100vw', padding: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#931FFF', textDecoration: 'none', fontSize: '1.5rem' }}>
            <span style={airway}>AuctionElite 🔨 </span>
          </Link>
          
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <Link to="/login" style={{ color: '#931FFF', textDecoration: 'none', margin: '0 10px', fontSize: '20px' }}>
              Login
            </Link>
          </div>
          <Link to="/logout" style={{ color: '#931FFF', textDecoration: 'none', margin: '0 10px', fontSize: '20px', visibility: 'hidden' }}>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


