import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import apiURL from '../api';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'destination', headerName: 'Destination', width: 200 },
  { field: 'interests', headerName: 'Interests', width: 200 },
  { field: 'travelers', headerName: 'Travelers', type: 'number', width: 150 },
  { field: 'budget', headerName: 'Budget', width: 150 },
];

const AdminDashboard = () => {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios.get(`${apiURL}/trips`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Transforming the response data into the format expected by DataGrid
        const formattedData = response.data.trips.map((trip, index) => ({
          id: index + 1,
          destination: trip.destination,
          interests: trip.interests,
          travelers: trip.travelers,
          budget: trip.budget,
        }));
        setApplications(formattedData);
        console.log(formattedData); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Travel Applications
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={applications} columns={columns} pageSize={5} checkboxSelection />
        </div>
      )}
    </Container>
  );
};

export default AdminDashboard;
