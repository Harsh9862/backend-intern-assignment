import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
      localStorage.setItem('access', response.data.tokens.access);
      localStorage.setItem('refresh', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data 
        ? Object.values(error.response.data).flat().join(', ')
        : error.message || 'Unknown error';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>✨ Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">👤 User</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Registering...' : '📝 Register'}
        </button>
      </form>
      {message && (
        <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      <p style={{ textAlign: 'center', color: '#666', marginTop: '1.5rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;