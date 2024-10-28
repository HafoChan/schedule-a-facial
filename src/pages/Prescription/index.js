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
  // Thêm state mới cho kết quả khám
  const [result, setResult] = useState('');

  useEffect(() => {
    const getInfoPatient = async () => {
      try {
        if (location.state?.patientInfo?.idPatient) {
          const response = await prescriptionApi.getInfoPatient(location.state.patientInfo.idPatient);
          const listmedicine = await prescriptionApi.getListMedicine(location.state.patientInfo.prescriptionId)
          console.log(listmedicine)
          setPrescriptionList(listmedicine.result)
          console.log('API Response:', response.result);
          console.log(location.state.patientInfo)
          setPatientInfo(response.result);
          setAppointment(location.state.patientInfo)
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    };
    getInfoPatient();
  }, [location.state]);

  const [medicine, setMedicine] = useState({
    name: '',
    medicine_type: 'Tuýt',
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
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedicine = async () => {
    const data = await prescriptionApi.createMedicine(appointment.prescriptionId, medicine)
    console.log(data.result)
    setPrescriptionList([
      ...prescriptionList,
      { ...data.result},
    ]);
    setMedicine({
      name: '',
      medicine_type: 'Tuýt',
      instruction: '',
      quantity: '',
      note: '',
    });
  };

  const handleExport = () => {
    // Handle PDF export
    console.log('Exporting to PDF...');
  };

  const handleSubmit = async () => {
    try {
      await prescriptionApi.createPrescription(appointment.prescriptionId, {
        result: result,
      });
      
      // Hiển thị thông báo thành công
      setOpenSnackbar(true);
      
      // Đợi 2 giây rồi chuyển hướng
      setTimeout(() => {
        navigate('/medical-history');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

  // Thêm handler cho kết quả khám
  const handleResultChange = (e) => {
    setResult(e.target.value);
  };

  // Thêm state cho thông báo
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              label="Giới tính"
              name="gender"
              value={patientInfo?.gender || ''}
              onChange={handlePatientInfoChange}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lý do khám"
              name="reason"
              value={appointment?.title || ''}
              onChange={handlePatientInfoChange}
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
              name="type"
              value={medicine.medicine_type}
              onChange={handleMedicineChange}
            >
              <MenuItem value="Tuýt">Tuýt</MenuItem>
              <MenuItem value="Viên">Viên</MenuItem>
              <MenuItem value="Chai">Chai</MenuItem>
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
              Thêm thuốc
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
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
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

        {/* Thêm Snackbar để hiển thị thông báo */}
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
            Tạo đơn thuốc thành công!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Prescription;
