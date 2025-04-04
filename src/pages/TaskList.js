import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import Box from '@mui/material/Box';


const API_URL = 'http://localhost:3001/tasks';

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
      <Box component="section" sx={{ p: 2, display:'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h3>
          All Tasks
        </h3>
        <Button variant="contained" color="primary" onClick={() => navigate('/task/new')}>
          + Add Task
        </Button>
      </Box>
      
      <Table sx={{ mt: 2, borderRadius: 2, boxShadow: 3, width: "100%" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>S. No</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "30%" }} colSpan={2}>
              Title
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Due Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={task.id} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell colSpan={2}>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{new Date(task.due_date).toLocaleDateString()}</TableCell>
              <TableCell >
                <IconButton color="primary" onClick={() => navigate(`/task/edit/${task.id}`)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => deleteTask(task.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Container>
  );
}

export default TaskList;
