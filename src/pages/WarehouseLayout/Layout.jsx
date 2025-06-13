import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Layout.css';

const Layout = () => {
  const [aisles, setAisles] = useState(0);
  const [tiers, setTiers] = useState(0);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/warehouses/latest')
      .then(res => {
        setAisles(res.data.noOfAisles);
        setTiers(res.data.noOfTiers);
      });

    axios.get('http://localhost:8080/api/products/slots')
      .then(res => setSlots(res.data));
  }, []);

  const getSlotInfo = (aisle, tier) => {
    return slots.find(s => s.aisleNumber === aisle && s.tierNumber === tier);
  };

  const getAisleLabel = (index) => String.fromCharCode(65 + index); // A, B, C...

  return (
  <div className="layout-container container-fluid">
    <h2 className="layout-title">Warehouse Layout</h2>
    <table className="table w-100 custom-layout-table">
      <thead>
        <tr>
          <th></th> {/* corner empty */}
          {[...Array(Number(aisles))].map((_, aIdx) => (
            <th key={aIdx} className="text-center">Aisle {String.fromCharCode(65 + aIdx)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(Number(tiers))].map((_, tIdx) => (
          <tr key={tIdx}>
            <th className="text-end">Tier {tIdx + 1}</th>
            {[...Array(Number(aisles))].map((_, aIdx) => {
              const slot = slots.find(
                s => s.aisleNumber === aIdx + 1 && s.tierNumber === tIdx + 1
              );
              return (
                <td key={aIdx}>
                  <div
                    className={`slot-box ${slot?.isOccupied ? 'occupied' : 'available'}`}
                    title={
                      slot?.isOccupied
                        ? `${slot.product?.productName || 'Occupied'} (Qty: ${slot.product?.quantity || 0})`
                        : 'Available'
                    }
                  >
                    {slot?.isOccupied ? (
                      <>
                        <div>{slot.product?.productName || 'Occupied'}</div>
                        <div className="small">Qty: {slot.product?.quantity || 0}</div>
                      </>
                    ) : (
                      <div>Available</div>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default Layout;
