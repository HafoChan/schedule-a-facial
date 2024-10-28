import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '60px',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: '1px solid #ddd',
      }}
    >
      <IconButton component={Link} to="/" sx={{ mb: 2 }}>
        <HomeIcon />
      </IconButton>
      <IconButton component={Link} to="/doctor" sx={{ mb: 2 }}>
        <PeopleIcon />
      </IconButton>
      <IconButton component={Link} to="/createDoctor" sx={{ mb: 2 }}>
        <PersonAddIcon />
      </IconButton>
      <IconButton component={Link} to="/updateInfo" sx={{ mb: 2 }}>
        <EditIcon />
      </IconButton>
      <IconButton component={Link} to="/prescription" sx={{ mb: 2 }}>
        <MedicalServicesIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton component={Link} to="/medical-history" sx={{ mb: 2 }}>
        <HistoryIcon />
      </IconButton>
      <IconButton component={Link} to="/profile" sx={{ mb: 2 }}>
        <AccountCircleIcon />
      </IconButton>
      <IconButton component={Link} to="/login">
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
