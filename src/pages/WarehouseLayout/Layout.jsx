import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Layout.css';

const Layout = () => {
  const [aisles, setAisles] = useState(0);
  const [tiers, setTiers] = useState(0);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Fetch warehouse dimensions
    axios.get('http://localhost:8080/api/warehouses/latest')
      .then(res => {
        setAisles(res.data.noOfAisles);
        setTiers(res.data.noOfTiers);
      });

    // Fetch all storage slots
    axios.get('http://localhost:8080/api/products/slots')
      .then(res => setSlots(res.data));
  }, []);

  const getStatus = (aisle, tier) => {
    const slot = slots.find(s => s.aisleNumber === aisle && s.tierNumber === tier);
    return slot && slot.isOccupied ? (
      <div className="occupied">{slot.product?.productName || "Occupied"}</div>
    ) : (
      <div className="available">Available</div>
    );
  };

  return (
    <div className="layout-container">
      <h2 className="layout-title">Warehouse Layout</h2>
      <div className="layout-grid">
        {[...Array(Number(aisles))].map((_, aIndex) => (
          <div key={aIndex} className="aisle">
            {[...Array(Number(tiers))].map((_, tIndex) => (
              <div key={tIndex} className="slot">
                {getStatus(aIndex + 1, tIndex + 1)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
