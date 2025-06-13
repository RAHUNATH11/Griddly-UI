import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/warehouses/report')
      .then(res => setReport(res.data))
      .catch(err => console.error("Report fetch error:", err));
  }, []);

  return (
    <div className="admin-home container mt-4">
      <h2 className="text-center mb-4">Welcome Admin</h2>

       {/* <div className="d-flex justify-content-center mb-4 gap-3">
        <button className="btn btn-primary" onClick={() => navigate('/warehouse-setup')}>
          Warehouse Setup
        </button>
        <button className="btn btn-success" onClick={() => navigate('/layout')}>
          Warehouse Layout
        </button>
        <button onClick={() => navigate('/logs')}>View Action Logs</button>

      </div>  */}

      <div className="card p-3 shadow-sm">
        <h4 className="mb-3">📊 Slot Utilization Report</h4>
        {report ? (
          <>
            <p><strong>Total Slots:</strong> {report.totalSlots}</p>
            <p><strong>Occupied Slots:</strong> {report.occupiedSlots}</p>
            <p><strong>Available Slots:</strong> {report.availableSlots}</p>
            <p><strong>Total Aisles:</strong> {report.totalAisles}</p>
            <p><strong>Total Tiers:</strong> {report.totalTiers}</p>

            <hr />
            <h5 className="mt-3">📦 Product-wise Slot List</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Aisle</th>
                    <th>Tier</th>
                    <th>Status</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {report.details.map((slot, idx) => (
                    <tr key={idx}>
                      <td>{slot.aisleNumber}</td>
                      <td>{slot.tierNumber}</td>
                      <td>{slot.occupied ? 'Occupied' : 'Available'}</td>
                      <td>{slot.product ? slot.product.productName : '-'}</td>
                      <td>{slot.product ? slot.product.quantity : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading report...</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
