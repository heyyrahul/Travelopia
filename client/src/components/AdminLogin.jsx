import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Snackbar } from '@mui/material';
import { Alert } from '@mui/material'; 
import signup from '../assets/signup.jpg';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiURL from '../api';

const AdminLogin = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiURL}/admin/login`, formData);
      console.log(response.data);
      console.log("Login Successful");

      const { token, user } = response.data;
      console.log(user);

      const userName = user ? user : '';

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name: userName }));

      setSnackbarMessage('Login Successful');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

     
      setTimeout(() => {
        Navigate('/admindashboard'); 
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      setSnackbarMessage('Error logging in. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${signup})`, backgroundSize: 'cover', minHeight: '673px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="sm" style={{  backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          <img src={logo} alt="logo" style={{ width: '100px', alignContent: 'center' }} />
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '2rem' }}>
            Log In
          </Button>
        </form>
        <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
          <Grid item>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminLogin;
