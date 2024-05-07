import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Card, CardContent, Button, Modal } from '@mui/material';

// Sample data for demonstration
const rows = [
  { id: 1, destination: 'Europe', interests: 'Beaches', travelers: 2, budget: '$5000-$6000' },
  { id: 2, destination: 'Japan', interests: 'Adventures & Outdoors', travelers: 4, budget: '$7000-$8000' },
  { id: 3, destination: 'Mexico', interests: 'Nature & Landscape', travelers: 3, budget: '$6000-$7000' },
];

// Columns configuration for the data grid
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'interests', headerName: 'Interests', width: 150 },
  { field: 'travelers', headerName: 'Travelers', type: 'number', width: 130 },
  { field: 'budget', headerName: 'Budget', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <strong>
        <Button variant="contained" color="primary" onClick={() => handleViewApplication(params.row)}>View</Button>
      </strong>
    ),
  },
];

const AdminDashboard = () => {
  const [selectedApplication, setSelectedApplication] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
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
