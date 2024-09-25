import React from "react";
import { Box, Link as MuiLink, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom"; //

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      padding={3}
    >
      <Typography variant="h4" gutterBottom>
        Chào mừng đến với ứng dụng đặt lịch thăm khám da mặt
      </Typography>
      <Typography variant="body1" gutterBottom>
        Hãy chọn một dịch vụ và đặt lịch hẹn ngay hôm nay!
      </Typography>
      <Box display="flex" gap={2}>
        <MuiLink
          component={Link}
          to="/login"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="primary">
            Login
          </Button>
        </MuiLink>
        <MuiLink
          component={Link}
          to="/register"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="info">
            Register
          </Button>
        </MuiLink>
        <MuiLink
          component={Link}
          to="/booking"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="success">
            Booking
          </Button>
        </MuiLink>
        <MuiLink
          component={Link}
          to="/doctor"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="success">
            Doctor Detail
          </Button>
        </MuiLink>
      </Box>
    </Box>
  );
};

export default Home;
