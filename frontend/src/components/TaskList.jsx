import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      setMessage('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
      if (editing) {
        await axios.put(`http://localhost:8000/api/tasks/${editing}/`, {
          ...formData,
          completed: false,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Task updated successfully!');
      } else {
        await axios.post('http://localhost:8000/api/tasks/', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Task created successfully!');
      }
      setFormData({ title: '', description: '' });
      setEditing(null);
      fetchTasks();
    } catch (error) {
      setMessage('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setFormData({ title: task.title, description: task.description });
    setEditing(task.id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      setMessage('Failed to delete task');
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:8000/api/tasks/${id}/`, {
        completed: !completed,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      setMessage('Failed to update task');
    }
  };

  return (
    <div>
      <h3>📋 Your Tasks</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter task description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" disabled={loading}>
            {loading ? '⏳ Saving...' : editing ? '✏️ Update Task' : '➕ Add Task'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setFormData({ title: '', description: '' }); }} style={{ background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)' }}>
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#999' }}>
          <p style={{ fontSize: '1.2rem' }}>📝 No tasks yet. Create your first task above!</p>
        </div>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4>{task.title}</h4>
                <span style={{ 
                  background: task.completed ? 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)' : 'linear-gradient(135deg, #ffd93d 0%, #f4a300 100%)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {task.completed ? '✓ Done' : '⏳ Pending'}
                </span>
              </div>
              <p>{task.description || '📄 No description'}</p>
              <p><small>📅 Created: {new Date(task.created_at).toLocaleDateString()}</small></p>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)} style={{ background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' }}>✏️ Edit</button>
                <button onClick={() => handleDelete(task.id)} style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' }}>🗑️ Delete</button>
                <button onClick={() => handleComplete(task.id, task.completed)} style={{ background: task.completed ? 'linear-gradient(135deg, #ffd93d 0%, #f4a300 100%)' : 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)' }}>
                  {task.completed ? '↩️ Incomplete' : '✓ Complete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;