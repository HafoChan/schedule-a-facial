import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Grid2,
} from "@mui/material";

const DoctorDetail = () => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  const doctor = {
    name: "Phó Giáo sư, Tiến sĩ Phạm Văn Tân",
    experience: [
      "Nguyên Trưởng khoa Khám bệnh và Điều trị ngoại trú, Bệnh viện Mắt Trung ương",
      "Trưởng Phòng khám chuyên khoa Mắt Dr.Tân",
      "Đạt danh hiệu Bác sĩ Cao cấp",
      "20 năm kinh nghiệm khám và điều trị các bệnh về mắt",
    ],
    location:
      "Phòng khám Chuyên khoa Mắt Dr.Tân, Số nhà 5 ngõ 192 Lê Trọng Tấn, Khương Mai, Thanh Xuân, Hà Nội",
    price: "500.000đ - 600.000đ",
    availableTimes: [
      "08:00 - 08:30",
      "09:00 - 09:30",
      "09:30 - 10:00",
      "10:00 - 10:30",
      "10:30 - 11:00",
      "14:00 - 14:30",
      "14:30 - 15:00",
      "15:00 - 15:30",
      "15:30 - 16:00",
      "16:00 - 16:30",
      "16:30 - 17:00",
    ],
  };

  return (
    <Box padding={3} maxWidth="1000px" margin="auto">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
      >
        <img
          src="https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-7-min.jpg.webp" // Thay đổi đường dẫn hình ảnh ở đây
          alt={doctor.name}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            marginRight: "30px",
            objectFit: "cover",
          }}
        />
        <Box width={"75%"}>
          <Typography variant="h4" gutterBottom>
            {doctor.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {doctor.experience.join(", ")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Địa chỉ: {doctor.location}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Giá khám: {doctor.price}
          </Typography>
        </Box>
      </Box>

      <Box display={"flex"} alignItems={"center"} margin={"40px 0px 20px"}>
        <Typography variant="h6" gutterBottom>
          Lịch Khám
        </Typography>
        <Box marginLeft={"30px"}>
          <TextField
            label="Chọn ngày khám"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today.toISOString().split("T")[0],
              max: maxDate.toISOString().split("T")[0],
            }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Box>
      </Box>

      <Grid2 container spacing={2}>
        {doctor.availableTimes.map((time, index) => (
          <Box item xs={6} sm={4} key={index}>
            <Button variant="outlined" fullWidth>
              {time}
            </Button>
          </Box>
        ))}
      </Grid2>

      <Paper elevation={3} style={{ marginTop: "20px", padding: "15px" }}>
        <Typography variant="h6">Thông tin thêm</Typography>
        // Phần này sẽ là description
        <Typography variant="body2">
          Quá trình công tác:
          <ul>
            <li>Bác sĩ tại Phòng khám Chuyên khoa Mắt Dr.Tân (2012 - nay)</li>
            <li>Bác sĩ tại Bệnh viện Mắt Trung ương (2004 - 2018)</li>
            <li>
              Bác sĩ phụ trách khoa Khám bệnh và điều trị ngoại trú, Bệnh viện
              Mắt Trung ương (2002 - 2003)
            </li>
            <li>Giáo viên Y Khoa, Đại học Y Thái Bình (1981 - 1991)</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};

export default DoctorDetail;
