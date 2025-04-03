import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/task/edit/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
