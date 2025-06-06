import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-home">
      <h2>Welcome Admin</h2>
      <button onClick={() => navigate('/warehouse-setup')}>Warehouse Setup</button>
      <button onClick={() => navigate('/layout')}>Warehouse Layout</button>
    </div>
  );
};

export default AdminHome;