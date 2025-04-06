import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import API from '../api';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form); // Register the user
      console.log('trying login')
      const res = await API.post('/auth/login', form); // Auto-login after registration
      console.log('logged in with ', res)
      login(res.data.access_token);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try a different username.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
