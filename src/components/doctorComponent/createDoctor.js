import React, { useEffect, useState } from "react";
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
import doctorService from "../../service/doctorService/createDoctor";
const CreateDoctor = () =>{
    const [data,setData] = useState({})
    const [doctor,setDoctor] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        gender: ""})
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault()
        const confirm = e.target.confirmpassword.value;
        const valid = doctorService.validationPassword(confirm,doctor.password)
        if (valid)
        {
            return setError(valid)
    
        }
        setError("")
        fetchData()
    }

    const handleChange = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setDoctor(values => (
            {...values,[name] : value}
        ))
    }

    const handleCloseSnackbar = (event,reason) => {
      if (reason === 'clickaway')
        return;
      setOpenSnackbar(false);
    };

    const fetchData = async () =>{
        try {
            const result = await doctorApi.create(doctor)
            setSuccessMessage("Lưu bác sĩ thành công!");
            setOpenSnackbar(true);
            setData(result)
        } catch (error) {
          setError("Đã xảy ra lỗi khi lưu bác sĩ.");
          console.error("Create failed:", error);        }
        }
    
    return(
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
              value={doctor.confirmpassword}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Xác nhận mật khẩu"
              name="confirmpassword"
              type="password"
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
    )
}
export default CreateDoctor;