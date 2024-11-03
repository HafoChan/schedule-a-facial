import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import prescriptionApi from '../../api/prescriptionApi';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';

const Prescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Khởi tạo state với dữ liệu từ navigation nếu có
  const [patientInfo, setPatientInfo] = useState({});
  const [appointment, setAppointment] = useState({});
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // New state to track the index of the medicine being edited

  // Thêm state mới cho kết quả khám
  const [result, setResult] = useState('');

  useEffect(() => {
    const getInfoPatient = async () => {
      try {
        if (location.state?.appointment?.idPatient) {
          const response = await prescriptionApi.getInfoPatient(location.state.appointment.idPatient);
          console.log(location.state.appointment)
          const listmedicine = await prescriptionApi.getListMedicine(location.state.appointment.prescriptionId)
          setPrescriptionList(listmedicine.result)
          setPatientInfo(response.result);
          setAppointment(location.state.appointment)
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    };
    getInfoPatient();
  }, [location.state]);

  const [medicine, setMedicine] = useState({
    name: '',
    medicineType: '',
    instruction: '',
    quantity: '',
    note: '',
  });

  const handlePatientInfoChange = (e) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicineChange = (e) => {
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      [e.target.name]: e.target.value,
    }));
  };


  const handleMedicineSelect = (index) => {
    setEditIndex(index);
    setMedicine(prescriptionList[index]);
  };

  const handleAddMedicine = async () => {
    if (editIndex !== null) {
      const updatedList = [...prescriptionList];
      updatedList[editIndex] = medicine;
      await prescriptionApi.updateMedicine(prescriptionList[editIndex].id, medicine)
      setPrescriptionList(updatedList);
      setEditIndex(null);
    } else {
      // Add new medicine
      const data = await prescriptionApi.createMedicine(appointment.prescriptionId, medicine);
      setPrescriptionList([
        ...prescriptionList,
        { ...data.result },
      ]);
    }
    setMedicine({
      name: '',
      medicineType: 'tuýp',
      instruction: '',
      quantity: '',
      note: '',
    });
  };

  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/v1/appointment/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/pdf",  
        },
        body: JSON.stringify(appointment)
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", patientInfo.name + ".pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Hiển thị thông báo thành công
      setSnackbarMessage('Xuất PDF thành công!');
      setOpenSnackbar(true);
      
      // Đợi 2 giây rồi chuyển hướng
      setTimeout(() => {
        navigate('/medical-history');
      }, 2000);
    } catch (error) {
      setSnackbarMessage('Xuất PDF thất bại!');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await prescriptionApi.createPrescription(appointment.prescriptionId, {
        result: result,
      });
      setResult(response.result.result)
      setSnackbarMessage('Tạo đơn thuốc thành công!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error creating prescription:', error);
      setSnackbarMessage('Tạo đơn thuốc thất bại!');
      setOpenSnackbar(true);
    }
  };

  // Thêm handler cho kết quả khám
  const handleResultChange = (e) => {
    setResult(e.target.value);
  };

  // Thêm state cho thông báo
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hàm đóng thông báo
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Kê Đơn Thuốc
        </Typography>

        {/* Patient Information */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Thông tin bệnh nhân
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tên bệnh nhân"
              name="name"
              value={patientInfo?.name || ''}
              onChange={handlePatientInfoChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              label="Giới tính"
              name="gender"
              value={patientInfo?.gender || ''}
              onChange={handlePatientInfoChange}
              disabled
            >
              <MenuItem value="nam">Nam</MenuItem>
              <MenuItem value="nu">Nữ</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Ngày sinh"
              name="dateOfBirth"
              value={patientInfo?.dob || ''}
              onChange={handlePatientInfoChange}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lý do khám"
              name="reason"
              value={appointment?.title || ''}
              onChange={handlePatientInfoChange}
              disabled
            />
          </Grid>

          {/* Thêm trường Kết quả khám */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Kết quả khám"
              value={result}
              onChange={handleResultChange}
              placeholder="Nhập kết quả khám..."
            />
          </Grid>
        </Grid>

        {/* Medicine Input */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Nhập thông tin thuốc
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nhập tên thuốc"
              name="name"
              value={medicine.name}
              onChange={handleMedicineChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              label="Dạng thuốc"
              name="medicineType"
              value={medicine.medicineType || ''}
              onChange={handleMedicineChange}
            >
              <MenuItem value="tuýp">Tuýp</MenuItem>
              <MenuItem value="viên">Viên</MenuItem>
              <MenuItem value="chai">Chai</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hướng dẫn"
              name="instruction"
              value={medicine.instruction}
              onChange={handleMedicineChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Số lượng"
              name="quantity"
              value={medicine.quantity}
              onChange={handleMedicineChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lưu ý"
              name="note"
              value={medicine.note}
              onChange={handleMedicineChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddMedicine}>
              {editIndex !== null ? 'Cập nhật' : 'Thêm thuốc'}
            </Button>
          </Grid>
        </Grid>

        {/* Prescription Table */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên thuốc</TableCell>
                <TableCell>Dạng thuốc</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Hướng dẫn</TableCell>
                <TableCell>Lưu ý</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptionList.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  onClick={() => handleMedicineSelect(index)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.medicineType}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.instruction}</TableCell>
                  <TableCell>{item.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleExport}>
              Xuất PDF
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              // Disable nút Gửi nếu chưa có kết quả khám
              disabled={!result.trim()}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>

        {/* Cập nhật Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Prescription;
