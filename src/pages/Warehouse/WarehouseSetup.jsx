import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WarehouseSetup.css';

const WarehouseSetup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    warehouseName: '',
    noOfAisles: '',
    noOfTiers: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/warehouses/create', form);
      alert('Warehouse setup saved successfully!');
      navigate('/layout');
    } catch (err) {
      alert('Failed to save warehouse setup!');
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h2 className="heading">Warehouse Setup</h2>
      <input type="text" name="warehouseName" placeholder="Warehouse Name" value={form.warehouseName} onChange={handleChange} required className="input" />
      <input type="number" name="noOfAisles" placeholder="No. of Aisles" value={form.noOfAisles} onChange={handleChange} required className="input" />
      <input type="number" name="noOfTiers" placeholder="No. of Tiers" value={form.noOfTiers} onChange={handleChange} required className="input" />
      <button type="submit" className="button">Save</button>
    </form>
  );
};

export default WarehouseSetup;