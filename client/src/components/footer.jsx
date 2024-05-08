import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px',  display: 'flex', justifyContent: 'space-between', gap: '20px',marginBottom: '0px', width: '100%' }}>
      <div>
        <Typography variant="h6">
          Travelopia
        </Typography>
        <Typography variant="subtitle1">
          Your ultimate travel companion
        </Typography>
      </div>
      <div>
        <Typography variant="body2" color="inherit">
          © {new Date().getFullYear()} Travelopia. All rights reserved.
        </Typography>
        <Typography variant="body2" color="inherit">
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Privacy Policy</Link>
          |
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Terms of Use</Link>
          |
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Contact Us</Link>
        </Typography>
      </div>
      <div>
        <Typography variant="body2" color="inherit">
          Follow us:
        </Typography>
        <Typography variant="body2" color="inherit">
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Facebook</Link>
          |
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Twitter</Link>
          |
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Instagram</Link>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
