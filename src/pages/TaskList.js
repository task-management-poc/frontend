import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/tasks';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container>
      <h2>Task List</h2>
      <Button variant="contained" color="primary" onClick={() => navigate('/task/new')}>Add Task</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{new Date(task.due_date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => navigate(`/task/edit/${task.id}`)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={() => deleteTask(task.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default TaskList;
