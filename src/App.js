import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
       <nav>
          <Link to="/">Tasks</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/task/edit/:id" element={<TaskForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
