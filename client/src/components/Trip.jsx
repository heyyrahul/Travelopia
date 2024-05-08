import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { FaMountain, FaUmbrellaBeach, FaLandmark, FaTree, FaHippo, FaWineBottle } from 'react-icons/fa';
import background from '../assets/background.mp4'; 
import axios from 'axios';
import apiURL from '../api';

const TripForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    interests: '',
    travelers: '',
    budget: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');

    if (!token) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Please login to continue.');
      setOpenSnackbar(true);
      return; 
    }
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${apiURL}/trips`, formData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      
      console.log(response.data);

      setSnackbarSeverity('success');
      setSnackbarMessage('Trip created successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error creating trip:', error.response.data);
      
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create trip. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="background-video" style={{ position: 'relative', width: '100%', height: '100vh', overflowY: 'hidden' }}>
      <video
        id="local-video"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', objectFit: 'cover' }}
      >
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,  width: '80%' }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>We Care, So You Can Travel Carefree</h1>
        <h3 style={{ color: 'white', textAlign: 'center' }}>Let Our Experts Plan Your Private, Tailor-Made and Secure Tour in 70+ Inspiring Destinations.</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', margin: 'auto',backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', }}>
          <FormControl fullWidth style={{ marginRight: '10px' }}>
            <InputLabel id="destination-label">Where do you want to go?</InputLabel>
            <Select
              labelId="destination-label"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            >
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Greece">Greece</MenuItem>
              <MenuItem value="Thailand">Thailand</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="New Zealand">New Zealand</MenuItem>
              <MenuItem value="South Africa">South Africa</MenuItem>
              <MenuItem value="Switzerland">Switzerland</MenuItem>
              <MenuItem value="Egypt">Egypt</MenuItem>
              <MenuItem value="Iceland">Iceland</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginRight: '10px' }}>
            <InputLabel id="interests-label">Your interests</InputLabel>
            <Select
              labelId="interests-label"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
            >
              <MenuItem value="Adventures & Outdoors">
                <FaMountain style={{ marginRight: '5px' }} />
                Adventures & Outdoors
              </MenuItem>
              <MenuItem value="Beaches">
                <FaUmbrellaBeach style={{ marginRight: '5px' }} />
                Beaches
              </MenuItem>
              <MenuItem value="Heritage & Culture">
                <FaLandmark style={{ marginRight: '5px' }} />
                Heritage & Culture
              </MenuItem>
              <MenuItem value="Nature & Landscape">
                <FaTree style={{ marginRight: '5px' }} />
                Nature & Landscape
              </MenuItem>
              <MenuItem value="Wildlife & Safaries">
                <FaHippo style={{ marginRight: '5px' }} />
                Wildlife & Safaries
              </MenuItem>
              <MenuItem value="Wine & Food">
                <FaWineBottle style={{ marginRight: '5px' }} />
                Wine & Food
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginRight: '10px' }}>
            <InputLabel id="travelers-label">Number of Travelers</InputLabel>
            <Select
              labelId="travelers-label"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="6+">6+</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginRight: '10px' }}>
            <InputLabel id="budget-label">Budget per Person</InputLabel>
            <Select
              labelId="budget-label"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <MenuItem value="$4000-$5000">$4000-$5000</MenuItem>
              <MenuItem value="$5000-$6000">$5000-$6000</MenuItem>
              <MenuItem value="$6000-$7000">$6000-$7000</MenuItem>
              <MenuItem value="$7000-$8000">$7000-$8000</MenuItem>
              <MenuItem value="$8000-$9000">$8000-$9000</MenuItem>
              <MenuItem value="$9000-$10000">$9000-$10000</MenuItem>
              <MenuItem value="$10000+">$10000+</MenuItem> 
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" style={{ width: '100%', padding: '10px 0',backgroundColor: '#DC5431' }}>
            Create My Trip Now
          </Button>
        </form>
      </div>
      
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

export default TripForm;
