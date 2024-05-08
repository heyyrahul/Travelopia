import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import signup from '../assets/signup.jpg';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiURL from '../api';


const SignUp = () => {
  const Navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      // Send formData to backend API endpoint
      const response = await axios.post(`${apiURL}/users/register`, formData);
      console.log(response.data);
      Navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.response.data);
    }
  };
  return (
    <div style={{ backgroundImage: `url(${signup})`, backgroundSize: 'cover', minHeight: '673px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '20px', borderRadius: '10px',backdropFilter: 'blur(10px)' }}>
        <Typography variant="h5" align="center" gutterBottom>
          <img src={logo} alt="logo" style={{ width: '100px' }} />
         
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  label="Username" 
                name="username" 
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
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
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
          <Grid item>
            <Link to="/login" variant="body2">
              Already registered? Log in
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
