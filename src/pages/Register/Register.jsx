import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ userName: '', email: '', password: '', role: 'STAFF' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/register', form);
      alert('Registered successfully!');
      navigate('/login');
    } catch {
      alert('Registration failed!');
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h2 className="heading">Register</h2>
      <input name="userName" placeholder="Name" value={form.userName} onChange={handleChange} required className="input" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input" />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input" />
      <select name="role" value={form.role} onChange={handleChange} className="select">
        <option value="STAFF">Staff</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit" className="button">Register</button>

      <p className="signupText">
        Already have an account? <Link to="/" className="signupLink">Login</Link>
      </p>
    </form>
  );
};

export default Register;
