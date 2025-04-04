import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, TextField, MenuItem } from '@mui/material';

const API_URL = 'http://localhost:3001/tasks';

const statuses = ["To Do", "In Progress", "Completed"];

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', status: 'To Do', due_date: '' });

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`).then(response => setTask(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`${API_URL}/${id}`, task);
    } else {
      await axios.post(API_URL, task);
    }
    navigate('/');
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
