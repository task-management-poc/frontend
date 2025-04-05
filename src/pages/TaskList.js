import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import Box from "@mui/material/Box";

const API_URL = "http://localhost:3001/tasks";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  // Filtering logic
  useEffect(() => {
    let filtered = tasks;

    if (search) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [search, statusFilter, tasks]);

  // Pagination handlers
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <h2>Task List</h2>

      {/* Filters */}
      <Box
        component="section"
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <h3>All Tasks</h3>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Search Title"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={() => navigate("/task/new")}>
            + Add Task
          </Button>
        </Box>
      </Box>

      {/* Task Table */}
      <Table sx={{ mt: 2, borderRadius: 2, boxShadow: 3, width: "100%" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>S. No</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "30%" }} colSpan={2}>
              Title
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Due Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
            <TableRow key={task.id} hover>
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
              <TableCell colSpan={2}>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{new Date(task.due_date).toLocaleDateString()}</TableCell>
              <TableCell>
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

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default TaskList;