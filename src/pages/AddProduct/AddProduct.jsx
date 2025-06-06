import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({
    productName: '',
    quantity: '',
    aisle: '',
    tier: '',
    userId: 1, // hardcoded for now
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/products/add', form)
      .then(() => alert('Product added successfully'))
      .catch(err => alert('Error: ' + err.response?.data || 'Server error'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="number" name="aisle" placeholder="Aisle" onChange={handleChange} required />
        <input type="number" name="tier" placeholder="Tier" onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
