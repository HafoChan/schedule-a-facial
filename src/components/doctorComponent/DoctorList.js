import React from 'react';
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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

const DoctorList = ({
  listDoctor,
  selectedProvince,
  selectedDistrict,
  fullname,
  sortOrder,
  options,
  handleSelectChange,
  handleSubmit,
  handleSortChange,
  setFullName,
  pressDoctor,
  handleSearchName
}) => {
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
            value={fullname}
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
          value={selectedProvince}
          onChange={(event, newValue) => handleSelectChange('province', newValue)}
          options={options}
          getOptionLabel={option => option.Name || ''}
          renderInput={params => <TextField {...params} label="Tỉnh thành" />}
          style={{ width: 300, marginTop: 10 }}
        />
        <Autocomplete
          value={selectedDistrict}
          onChange={(event, newValue) => handleSelectChange('district', newValue)}
          options={selectedProvince && selectedProvince.Districts || []}
          getOptionLabel={option => option.Name || ''}
          renderInput={params => <TextField {...params} label="Huyện" />}
          style={{ width: 300, marginTop: 10 }}
        />
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          style={{ marginTop: 10 }}
        >
          Filter
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {listDoctor.map(doctor => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5aoPDi_WOhlc3vAAk0SE_7bkMiyO8PC9Ag&s"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                  }}
                  alt={`${doctor.name}`}
                />
                <Typography variant="h6" style={{ marginTop: 10 }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" style={{ margin: '2px 0' }}>
                  Kinh nghiệm: {doctor.experience}
                </Typography>
                <Typography variant="body2" style={{ margin: '2px 0' }}>
                  Địa chỉ: {doctor.district}, {doctor.city}
                </Typography>
                <Typography variant="body2" style={{ margin: '2px 0' }}>
                  Giá khám: {doctor.price} VNĐ
                </Typography>
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

export default DoctorList;
