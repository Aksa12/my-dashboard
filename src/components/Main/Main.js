import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import MainLayout from '../MainLayout/MainLayout';

const Main = ({ children, isMobile }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  console.log('mobile', isMobile, isOpen);

  return (
    <Box>
      <Navbar isSidebarOpen={isOpen} setIsSidebarOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainLayout isSidebarOpen={isOpen}>{children}</MainLayout>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

// Main.defaultProps = {
//   isMobile: true,
// };

export default Main;
