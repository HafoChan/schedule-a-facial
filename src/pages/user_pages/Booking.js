import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";

const doctors = [
  {
    id: 1,
    name: "Tiến sĩ, Bác sĩ chuyên khoa II Lê Quốc Việt",
    experience:
      "Hơn 30 năm kinh nghiệm khám và điều trị các bệnh nội cơ xương khớp.",
    location: "Hà Nội",
    availableTimes: ["16:30 - 17:00", "17:00 - 17:30", "17:30 - 18:00"],
    price: "350.000đ",
  },
  {
    id: 2,
    name: "BSCKII Dương Minh Trí",
    experience:
      "Nhiều năm kinh nghiệm trong khám và điều trị bệnh lý về Nội Cơ xương khớp.",
    location: "Thành phố Hồ Chí Minh",
    availableTimes: [
      "18:30 - 19:00",
      "19:00 - 19:30",
      "19:00 - 19:30",
      "19:00 - 19:30",
      "19:00 - 19:30",
      "19:00 - 19:30",
    ],
    price: "300.000đ - 400.000đ",
  },
];

const BookingPage = () => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const [selectedDates, setSelectedDates] = useState({}); // State để lưu ngày đã chọn cho từng bác sĩ

  const handleDateChange = (doctorId, date) => {
    setSelectedDates((prev) => ({ ...prev, [doctorId]: date })); // Cập nhật ngày cho bác sĩ tương ứng
  };

  return (
    <Container align="center">
      <Typography variant="h4" gutterBottom align="center">
        Đặt Lịch Khám
      </Typography>
      <Box container spacing={3} maxWidth={"1100px"} align="center">
        {doctors.map((doctor) => (
          <Box
            item
            xs={12}
            sm={6}
            md={4}
            key={doctor.id}
            maxWidth={"1000px"}
            style={{ padding: "4px" }}
          >
            <Paper
              elevation={3}
              style={{
                display: "flex",
                padding: "20px",
                justifyContent: "space-around",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5aoPDi_WOhlc3vAAk0SE_7bkMiyO8PC9Ag&s"
                style={{
                  width: "150px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <Box align="left" width={"500px"}>
                <Typography variant="h6" style={{ margin: "2px 0" }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" style={{ margin: "2px 0" }}>
                  {doctor.experience}
                </Typography>
                <Typography variant="body2" style={{ margin: "2px 0" }}>
                  Địa chỉ: {doctor.location}
                </Typography>
                <Typography variant="body2" style={{ margin: "2px 0" }}>
                  Giá khám: {doctor.price}
                </Typography>
                <Typography variant="subtitle1" style={{ margin: "2px 0" }}>
                  LỊCH KHÁM
                </Typography>
                {doctor.availableTimes.map((time, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    style={{ margin: "5px" }}
                  >
                    {time}
                  </Button>
                ))}
              </Box>
              <Box>
                <TextField
                  label="Chọn ngày khám"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginTop: "30px" }}
                  inputProps={{
                    min: today.toISOString().split("T")[0],
                    max: maxDate.toISOString().split("T")[0],
                  }}
                  value={
                    selectedDates[doctor.id] ||
                    today.toISOString().split("T")[0]
                  } // Hiển thị ngày đã chọn hoặc ngày hiện tại
                  onChange={(e) => handleDateChange(doctor.id, e.target.value)} // Cập nhật ngày cho bác sĩ tương ứng
                />
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BookingPage;
