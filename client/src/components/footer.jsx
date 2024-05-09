import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import travel2 from '../assets/travel2.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import  EmailIcon from '@mui/icons-material/Email';
const Footer = () => {
  return (
    <div style={{ backgroundColor: '#333' }}>
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '0px', width: '100%' }}>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>  
            <img src={travel2} alt="" style={{ width: '120px', height: '70px', margin: '-10px 10px' }} />
          </Link>
          <Typography variant="subtitle1">
            Your ultimate travel companion
          </Typography>
          <Typography  variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}><FacebookIcon /> </Link>
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}><TwitterIcon /></Link>
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}><InstagramIcon /></Link>
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}><EmailIcon /></Link>
          </Typography> 
        </div>
        <div>
          <Typography    variant="body2" style={{ fontSize: '20px', color: '#DC5431' }}>
            Quick Links
          </Typography>
          <Typography variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Services</Link>
          </Typography>
          <Typography variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>About Us</Link>
          </Typography>
          <Typography variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Career</Link>
          </Typography>
          <Typography variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Contact Us</Link>
          </Typography>
        </div>
        <div>
          <Typography variant="body2" style={{ fontSize: '20px', color: '#DC5431' }}>
        Our Brands
          </Typography>
          <Typography  variant="body2" color="inherit">
          <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>Quark Expeditions</Link>
          </Typography>
          <Typography  variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>  TCS World Travel</Link>
          </Typography>
          <Typography  variant="body2" color="inherit">
            <Link href="#" style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>  Kalos Golf</Link>
          </Typography>
        </div>
        <div>
        <Typography variant="body2"  style={{ fontSize: '20px', color: '#DC5431' }}>
          Address:
          </Typography>
          <Typography>
          123 Main Street, Anytown,
          </Typography>
          <Typography>
          USA
          </Typography>
        </div>
      </footer>
      <hr style={{ marginTop: '0px', width: '100%', border: '1px solid #fff' }} />
      <Typography variant="body2" color="inherit" style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Travelopia | Designed by <a href="https://heyyrahul.github.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><strong style={{ color: '#DC5431' }}>Rahul Kumar</strong></a> 
      </Typography>
    </div>
  );
};

export default Footer;
