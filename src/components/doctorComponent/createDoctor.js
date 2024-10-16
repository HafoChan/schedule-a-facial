import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import doctorApi from "../../api/doctorApi";

const UpdateDoctor = ({ doctorId }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch doctor data for the given ID
    const fetchDoctorData = async () => {
      try {
        const response = await doctorApi.getDoctorById(doctorId);
        setDoctor(response.result);
      } catch (error) {
        console.error("Failed to fetch doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation here if needed

    try {
      const response = await doctorApi.updateDoctor(doctorId, doctor);
      setSuccessMessage("Cập nhật bác sĩ thành công!");
      setOpenSnackbar(true);
    } catch (error) {
      setError("Đã xảy ra lỗi khi cập nhật bác sĩ.");
      console.error("Update failed:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Cập Nhật Thông Tin Bác Sĩ
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Họ và Tên"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={doctor.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              name="username"
              value={doctor.username}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Mật khẩu"
              name="password"
              type="password"
              value={doctor.password}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              value={doctor.phone}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Giới tính"
              name="gender"
              value={doctor.gender}
              onChange={handleChange}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Cập Nhật
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UpdateDoctor;
