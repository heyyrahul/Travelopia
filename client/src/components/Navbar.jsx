import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Link } from 'react-browser-router';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

export default function Navbar() {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleClose(); // Close the menu
    Navigate('/login');
    setSnackbarSeverity('success');
    setSnackbarMessage('Logout Successful');
    setOpenSnackbar(true);
  };
  const userData = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!userData;
  const username = userData ? userData.name : '';

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)',backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      
      <Link to="/">  
        <Typography variant="h4" style={{ fontFamily: 'cursive' }}>Travelopia</Typography>
      </Link>  
      <div>
        {isLoggedIn ? (
          <>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
              style={{backgroundColor:'#556CD6', borderRadius:'10px',color:'white', marginRight: '10px'}}
            >
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>{username}</Typography>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem>My Trips</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit" style={{backgroundColor:'#556CD6', marginRight: '10px'}}>User Login</Button>
            <Button component={Link} to="/adminlogin" color="inherit" style={{backgroundColor:'#556CD6'}}>Admin Login</Button>
          </>
        )}
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
    </div>
  );
}
