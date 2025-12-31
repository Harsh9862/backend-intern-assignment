import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskList from './TaskList';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    const userData = localStorage.getItem('user');
    if (!token) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-info">
          <h2>Dashboard</h2>
          <p>Welcome back, <strong>{user.username}</strong>!</p>
          <p>Role: <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>
      <TaskList />
    </div>
  );
};

export default Dashboard;