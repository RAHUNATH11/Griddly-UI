import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PickProduct = () => {
  const [slots, setSlots] = useState([]);
  const [quantities, setQuantities] = useState({});

  const fetchSlots = () => {
    axios.get('http://localhost:8080/api/products/slots')
      .then((res) => setSlots(res.data));
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handlePick = (aisle, tier) => {
    const userId = localStorage.getItem('userId');
    const key = `${aisle}-${tier}`;
    const quantityToPick = Number(quantities[key]);

    if (!userId) {
      alert("User not logged in");
      return;
    }

    if (!quantityToPick || quantityToPick <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    axios.post('http://localhost:8080/api/products/pick', {
        aisle,
        tier,
        userId: Number(userId),
        quantityToPick: quantityToPick, // ✅ matches backend field
      })
      .then(() => {
        alert('Product picked');
        fetchSlots(); // refresh UI
        setQuantities((prev) => ({
          ...prev,
          [key]: ''
        }));
      })
      .catch((err) => {
        alert('Error picking product: ' + (err.response?.data || 'Server error'));
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pick Products</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Aisle</th>
            <th>Tier</th>
            <th>Pick Quantity</th>
          </tr>
        </thead>
        <tbody>
          {slots
            .filter((slot) => slot.isOccupied)
            .map((slot, index) => {
              const key = `${slot.aisleNumber}-${slot.tierNumber}`;
              const maxQty = slot.product?.quantity || 0;

              return (
                <tr key={index}>
                  <td>{slot.product?.productName}</td>
                  <td>{maxQty}</td>
                  <td>{slot.aisleNumber}</td>
                  <td>{slot.tierNumber}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max={maxQty}
                      value={quantities[key] || ''}
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [key]: e.target.value
                        })
                      }
                      style={{ width: '60px', marginRight: '8px' }}
                    />
                    <button
                      onClick={() => handlePick(slot.aisleNumber, slot.tierNumber)}
                      disabled={!quantities[key] || quantities[key] <= 0 || quantities[key] > maxQty}
                    >
                      Pick
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PickProduct;
