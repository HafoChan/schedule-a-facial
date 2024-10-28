import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Checkbox,
  Chip,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import prescriptionApi from '../../api/prescriptionApi';


const MedicalHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selected, setSelected] = useState([]);
  const [medicalRecords,setMedicalRecords] = useState({})
  useEffect(()=>{
    const getData = async () =>{
        const list = await prescriptionApi.findAppointmentByDoctor()
        console.log(list.result)
        setMedicalRecords(list.result)
    }
    getData()
  },[])


//   const medicalRecords = [
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       birthDate: '1990-05-15',
//       examDate: '2024-03-15',
//       subject: 'Khám da mặt định kỳ',
//       email: 'nguyenvana@email.com',
//       status: 'Đã khám'
//     },
//     {
//       id: 2,
//       name: 'Trần Thị B',
//       birthDate: '1995-08-20',
//       examDate: '2024-03-14',
//       subject: 'Tư vấn điều trị mụn',
//       email: 'tranthib@email.com',
//       status: 'Chờ khám'
//     },
//   ];


  const handleSelect = (id) => {
    // Nếu id đã được chọn thì bỏ chọn
    if (selected.includes(id)) {
      setSelected([]);
    } else {
      // Nếu id chưa được chọn thì chọn nó và bỏ chọn các id khác
      setSelected([id]);
    }
  };

  const handlePrescription = () => {
    if (selected.length === 1) {
      const record = medicalRecords.find(r => r.id === selected[0]);
      navigate('/prescription', { state: { patientInfo: record } });
    }
  };



  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 500 }}>
        Lịch Sử Khám
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          placeholder="Tìm kiếm theo tên..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        
        <Select
          size="small"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="all">Tất cả ngày</MenuItem>
          <MenuItem value="today">Hôm nay</MenuItem>
          <MenuItem value="week">Tuần này</MenuItem>
          <MenuItem value="month">Tháng này</MenuItem>
        </Select>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Kê đơn thuốc">
          <Button
            variant="contained"
            startIcon={<MedicalServicesIcon />}
            onClick={handlePrescription}
            disabled={selected.length !== 1}
          >
            Kê đơn thuốc
          </Button>
        </Tooltip>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Ngày khám</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Email LH</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalRecords && medicalRecords.length > 0 && medicalRecords.map((record) => (
              <TableRow 
                key={record.id}
                hover
                selected={selected.indexOf(record.id) !== -1}
                sx={{ '&:hover': { cursor: 'pointer' } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(record.id) !== -1}
                    onChange={() => handleSelect(record.id)}
                  />
                </TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{(record.dob)}</TableCell>
                <TableCell>{(record.start)}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={record.status}
                    color={record.status === 'CONFIRMED' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Button variant="contained" size="small">1</Button>
        <Button variant="outlined" size="small">2</Button>
        <Button variant="outlined" size="small">3</Button>
        <Typography sx={{ lineHeight: '30px' }}>...</Typography>
        <Button variant="outlined" size="small">15</Button>
        <IconButton>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MedicalHistory;
