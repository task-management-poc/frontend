// src/pages/TaskForm.js
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField, MenuItem } from '@mui/material';
import API from '../api';

const statuses = ["To Do", "In Progress", "Completed"];

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', status: 'To Do', due_date: '' });

  useEffect(() => {
    if (id) {
      API.get(`/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(err => console.error('Error fetching task:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/tasks/${id}`, task);
      } else {
        await API.post('/tasks', task);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Container>
      <h2>{id ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField name="title" label="Title" value={task.title} onChange={handleChange} fullWidth required />
        <TextField name="description" label="Description" value={task.description} onChange={handleChange} fullWidth />
        <TextField name="due_date" label="Due Date" type="date" value={task.due_date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
        <TextField name="status" label="Status" select value={task.status} onChange={handleChange} fullWidth required>
          {statuses.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
        </TextField>
        <Button type="submit" variant="contained" color="primary">{id ? 'Update' : 'Create'} Task</Button>
      </form>
    </Container>
  );
}

export default TaskForm;
