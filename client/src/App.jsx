import * as React from 'react';
import AllRoutes from './Routes/AllRoutes';
import Navbar from './components/Navbar';
import Footer from './components/footer';

export default function App() {
  return (
    <> <Navbar />
      <AllRoutes />
      <Footer />
    </>
  );
}