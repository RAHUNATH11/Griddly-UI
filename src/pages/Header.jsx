import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ background: '#f5f5f5', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      {isAdmin ? (
        <>
          <Link to="/admin" style={linkStyle}>Admin Home</Link>
          <Link to="/warehouse-setup" style={linkStyle}>Warehouse Setup</Link>
          <Link to="/layout" style={linkStyle}>Warehouse Layout</Link>
          <Link to="/Logs" style={linkStyle}>User Action Logs</Link>
        </>
      ) : (
        <>
          <Link to="/staff" style={linkStyle}>Staff Home</Link>
          <Link to="/add-product" style={linkStyle}>Add Product</Link>
          <Link to="/pick-product" style={linkStyle}>Pick Product</Link>
          <Link to="/layout" style={linkStyle}>Warehouse Layout</Link>
        </>
      )}
      <span style={{ float: 'right' }}>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </span>
    </div>
  );
};

const linkStyle = {
  marginRight: '15px',
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold'
};

const logoutBtn = {
  background: '#d9534f',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Header;
