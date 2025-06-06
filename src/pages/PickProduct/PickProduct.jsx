import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PickProduct = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/products/slots')
      .then(res => setSlots(res.data));
  }, []);

  const handlePick = (slotId) => {
    axios.post(`http://localhost:8080/api/products/pick/${slotId}`)
      .then(() => {
        alert("Product picked successfully");
        // refresh the list
        setSlots(slots.map(slot => 
          slot.slotId === slotId ? { ...slot, isOccupied: false, product: null } : slot
        ));
      })
      .catch(err => {
        alert("Error picking product");
        console.error(err);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pick Product</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Aisle</th>
            <th>Tier</th>
            <th>Product</th>
            <th>Pick</th>
          </tr>
        </thead>
        <tbody>
          {slots.filter(s => s.isOccupied).map(slot => (
            <tr key={slot.slotId}>
              <td>{slot.aisleNumber}</td>
              <td>{slot.tierNumber}</td>
              <td>{slot.product?.productName}</td>
              <td>
                <button onClick={() => handlePick(slot.slotId)}>Pick</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PickProduct;
