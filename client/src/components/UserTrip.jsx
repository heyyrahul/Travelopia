import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { CSSTransition } from 'react-transition-group';
import Skeleton from '@mui/material/Skeleton';
import trip from '../assets/trip.png';
import apiURL from '../api';
const tableContainerStyle = {
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  margin: '16px',
  overflow: 'hidden', 
};

const headerCellStyle = {
  backgroundColor: '#1976d2', 
  color: '#fff',
  fontWeight: 'bold',
};

const bodyCellStyle = {
  backgroundColor: '#f3f3f3',
  color: '#333',
};

const headingStyle = {
  marginBottom: '20px',
  fontFamily: 'Arial, sans-serif', 
  fontSize: '2rem',
  color: '#333', 
  fontWeight: 'bold',
};

const SkeletonLoader = () => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={headerCellStyle}><Skeleton /></TableCell>
          <TableCell style={headerCellStyle}><Skeleton /></TableCell>
          <TableCell style={headerCellStyle}><Skeleton /></TableCell>
          <TableCell style={headerCellStyle}><Skeleton /></TableCell>
          <TableCell style={headerCellStyle}><Skeleton /></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={5}><Skeleton /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
const NoTripsMessage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <img src={trip} alt="No trips" style={{ width: 'auto', height: '300px', marginBottom: '20px' }} />
    <Typography variant="h5">Oops! You don't have any trips yet.</Typography>
    <Typography variant="body1">Please create one.</Typography>
  </div>
);


const UserTrip = () => {
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showTable, setShowTable] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${apiURL}/trips/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrips(response.data.trips);
        setShowTable(true); 
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchTrips();
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ height: '100vh' }}>
      <Typography variant="h4" style={headingStyle}>
        Your Trips
      </Typography>
      <Paper style={tableContainerStyle}>
        <CSSTransition
          in={showTable}
          timeout={500} 
          classNames="fade"
          unmountOnExit
        >
          {isLoading ? ( 
            <SkeletonLoader />
          ) : (
            <React.Fragment>
              {trips.length > 0 ? ( 
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={headerCellStyle}>S.No</TableCell>
                        <TableCell style={headerCellStyle}>Destination</TableCell>
                        <TableCell style={headerCellStyle}>Interests</TableCell>
                        <TableCell style={headerCellStyle}>Travelers</TableCell>
                        <TableCell style={headerCellStyle}>Budget</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trip, index) => (
                        <TableRow key={trip._id}>
                          <TableCell style={bodyCellStyle}>{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell style={bodyCellStyle}>{trip.destination}</TableCell>
                          <TableCell style={bodyCellStyle}>{trip.interests}</TableCell>
                          <TableCell style={bodyCellStyle}>{trip.travelers}</TableCell>
                          <TableCell style={bodyCellStyle}>{trip.budget}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <NoTripsMessage />
              )}
            </React.Fragment>
          )}
        </CSSTransition>
      </Paper>
      <TablePagination
        component="div"
        count={trips.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserTrip;
