import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Card, CardContent, Modal, CircularProgress } from '@mui/material';
import axios from 'axios';
import apiURL from '../api';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'interests', headerName: 'Interests', width: 150 },
  { field: 'travelers', headerName: 'Travelers', type: 'number', width: 130 },
  { field: 'budget', headerName: 'Budget', width: 130 },
];

const AdminDashboard = () => {
  const [applications, setApplications] = React.useState([]);
  const [selectedApplication, setSelectedApplication] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
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
        setApplications(response.data);
        console.log(response.data.trips);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Container maxWidth="sm" style={{ marginTop: '3rem', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          {selectedApplication && (
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Application Details
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Destination:</strong> {selectedApplication.destination}
                  <br />
                  <strong>Interests:</strong> {selectedApplication.interests}
                  <br />
                  <strong>Travelers:</strong> {selectedApplication.travelers}
                  <br />
                  <strong>Budget:</strong> {selectedApplication.budget}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Container>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
