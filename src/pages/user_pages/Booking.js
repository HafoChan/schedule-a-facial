import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Autocomplete,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import doctorApi from '../../api/doctorApi';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const options = ["TPHCM", "BacKan", "BacLieu"];

const BookingPage = () => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);
  const navigate = useNavigate();

  const [selectedDates, setSelectedDates] = useState({});
  const [listDoctor, setListDoctor] = useState([]);
  const [fullname, setFullName] = useState("");
  const [province, setProvince] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;
    if (fullname || province) {
      data = await doctorApi.filterByProvince(province, fullname);
    } else {
      data = await doctorApi.getAll();
    }
    setListDoctor(data.result);

    if (sortOrder) {
      const sorted = [...data.result].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
      setListDoctor(sorted);
    }
  };

  const pressDoctor = (doctor) => {
    navigate(`/doctor/${doctor.name}`, { state: { doctor } });
  };

  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const data = await doctorApi.getAll();
        setListDoctor(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDoctor();
  }, []);

  return (
    <Container align="center">
      <Typography variant="h4" gutterBottom>
        Danh sách bác sĩ
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            variant="outlined"
            label="Tên bác sĩ"
            onChange={e => setFullName(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            <SearchIcon />
          </Button>
        </Box>
        <FormControl component="fieldset">
          <RadioGroup row value={sortOrder} onChange={handleSortChange}>
            <FormControlLabel value="asc" control={<Radio />} label="Giá tăng dần" />
            <FormControlLabel value="desc" control={<Radio />} label="Giá giảm dần" />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          value={province}
          onChange={(event, newValue) => setProvince(newValue)}
          options={options}
          renderInput={(params) => <TextField {...params} label="Tỉnh thành" />}
          style={{ width: 300, marginTop: 10 }}
        />
        <Button variant="outlined" endIcon={<SendIcon />} onClick={handleSubmit} style={{ marginTop: 10 }}>
          Filter
        </Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {listDoctor.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5aoPDi_WOhlc3vAAk0SE_7bkMiyO8PC9Ag&s"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  alt={`${doctor.name}`}
                />
                <Typography variant="h6" style={{ marginTop: 10 }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" style={{ margin: "2px 0" }}>
                  Kinh nghiệm: {doctor.experience}
                </Typography>
                <Typography variant="body2" style={{ margin: "2px 0" }}>
                  Địa chỉ: {doctor.location}
                </Typography>
                <Typography variant="body2" style={{ margin: "2px 0" }}>
                  Giá khám: {doctor.price} VNĐ
                </Typography>
                {/* <TextField
                  label="Chọn ngày khám"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginTop: "10px", width: "100%" }}
                  inputProps={{
                    min: today.toISOString().split("T")[0],
                    max: maxDate.toISOString().split("T")[0],
                  }}
                  value={selectedDates[doctor.id] || today.toISOString().split("T")[0]}
                  onChange={(e) => handleDateChange(doctor.id, e.target.value)}
                /> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => pressDoctor(doctor)}
                  style={{ marginTop: 10 }}
                  fullWidth
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookingPage;
