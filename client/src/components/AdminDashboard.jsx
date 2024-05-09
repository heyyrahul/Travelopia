import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Skeleton, TextField, InputAdornment, IconButton } from '@mui/material';
import axios from 'axios';
import { Search } from '@mui/icons-material';
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
  const [searchText, setSearchText] = React.useState('');

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.username.toLowerCase().includes(searchText.toLowerCase()) ||
      app.destination.toLowerCase().includes(searchText.toLowerCase()) ||
      app.interests.toLowerCase().includes(searchText.toLowerCase())
  );

  return (  
    <div style={{ backgroundColor: '#CDE8E5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#556CD6', marginBottom: '20px' }}>
          Travel Applications
        </Typography>
        <TextField
          label="Search by Username, Destination, or Interests"
          variant="outlined"
          size="small"
          fullWidth
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          <Skeleton animation="wave" variant="rectangular" height={400} />
        ) : ( 
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredApplications}
              columns={columns}
              pageSize={10}
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              disableSorting
              disableRowSelectionOnClick
              disableAutosize
              disableColumnResize
              pagination
              autoPageSize
              disableSelectionOnClick
              headerClassName="custom-header"
              headerStyles={{ backgroundColor: '#556CD6', color: 'white', fontWeight: 'bold' }}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
