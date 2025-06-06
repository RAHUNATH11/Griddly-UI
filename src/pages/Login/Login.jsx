import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', form);
      const role = res.data.role;

      if (role === 'ADMIN') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else if (role === 'STAFF') {
        localStorage.setItem('isAdmin', 'false');
        navigate('/staff');
      } else {
        alert('Unknown role!');
      }
    } catch {
      alert('Invalid email, password, or role');
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h2 className="heading">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="input"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        required
        className="select"
      >
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="STAFF">Staff</option>
      </select>
      <button type="submit" className="button">Login</button>

      <p className="signupText">
        Don’t have an account? <Link to="/signup" className="signupLink">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
