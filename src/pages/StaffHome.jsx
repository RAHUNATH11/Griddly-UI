import React from 'react';
import { Link } from 'react-router-dom';

const StaffHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome Staff</h2>
      <div style={{ marginTop: '20px' }}>
        <Link to="/add-product" style={linkStyle}>➕ Add Product</Link>
        <br />
        <Link to="/pick-product" style={linkStyle}>📦 Pick Product</Link>
      </div>
    </div>
  );
};

const linkStyle = {
  display: 'inline-block',
  margin: '10px 0',
  textDecoration: 'none',
  color: '#fff',
  background: '#007bff',
  padding: '10px 20px',
  borderRadius: '5px',
};

export default StaffHome;
