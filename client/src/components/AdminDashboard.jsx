import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Skeleton } from '@mui/material';
import axios from 'axios';
import apiURL from '../api';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 200 },  
  { field: 'destination', headerName: 'Destination', width: 200 },
  { field: 'interests', headerName: 'Interests', width: 200 },
  { field: 'travelers', headerName: 'Number of Travelers', type: 'number', width: 150 },
  { field: 'budget', headerName: 'Budget', width: 150 },
];

const AdminDashboard = () => {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${apiURL}/trips`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setApplications(response.data.trips.map((trip, index) => ({
        id: index + 1,
        destination: trip.destination,
        interests: trip.interests,
        travelers: trip.travelers,
        budget: trip.budget,
        username: trip.username
      })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (  
    <div style={{ backgroundColor: '#CDE8E5', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Travel Applications
        </Typography>
        {loading ? (
          <Skeleton animation="wave" variant="rectangular" height={400} />
        ) : ( 
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={applications} columns={columns} pageSize={10} disableColumnFilter disableColumnMenu disableColumnSelector disableSorting disableRowSelectionOnClick disableAutosize disableColumnResize/>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
