import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
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
