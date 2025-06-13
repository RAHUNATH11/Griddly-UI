import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({
    productName: '',
    quantity: '',
    aisle: '',
    tier: '',
  });

  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [slotError, setSlotError] = useState('');

  useEffect(() => {
    // Fetch existing slots
    axios.get('http://localhost:8080/api/products/slots')
      .then(res => {
        const occupied = res.data.filter(s => s.isOccupied);
        setOccupiedSlots(occupied);
      })
      .catch(() => alert('Error loading slot data'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validate slot
    const aisleNum = Number(updatedForm.aisle);
    const tierNum = Number(updatedForm.tier);

    const exists = occupiedSlots.some(
      (s) => s.aisleNumber === aisleNum && s.tierNumber === tierNum
    );

    if (aisleNum && tierNum && exists) {
      setSlotError('This slot is already occupied. Choose a different one.');
    } else {
      setSlotError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }

    if (slotError) {
      alert(slotError);
      return;
    }

    const data = {
      ...form,
      userId: Number(userId),
    };

    axios.post('http://localhost:8080/api/products/add', data)
      .then(() => {
        alert('Product added successfully!');
        setForm({ productName: '', quantity: '', aisle: '', tier: '' });
      })
      .catch((err) => {
        const msg = err.response?.data || 'Server error';
        alert('Error: ' + msg);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Product Name" value={form.productName} onChange={handleChange} required /><br />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required /><br />
        <input type="number" name="aisle" placeholder="Aisle" value={form.aisle} onChange={handleChange} required /><br />
        <input type="number" name="tier" placeholder="Tier" value={form.tier} onChange={handleChange} required /><br />
        {slotError && <div style={{ color: 'red' }}>{slotError}</div>}
        <button type="submit" disabled={!!slotError}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
