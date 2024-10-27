import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Grid2,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const DoctorDetail = () => {
  const location = useLocation()
  const doctor = location.state?.doctor
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);
  const description = doctor.description ? doctor.description.split(', ') : []
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

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
          alt={doctor}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            marginRight: "30px",
            objectFit: "contain",
          }}
        />
        <Box width={"75%"}>
          <Typography variant="h3" gutterBottom>
            {doctor.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {doctor.experience}
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

      {/* <Grid2 container spacing={2}>
        {doctor.availableTimes.map((time, index) => (
          <Box item xs={6} sm={4} key={index}>
            <Button variant="outlined" fullWidth>
              {time}
            </Button>
          </Box>
        ))}
      </Grid2> */}

      <Paper elevation={3} style={{ marginTop: "20px", padding: "15px" }}>
        <Typography variant="h6">Thông tin thêm</Typography>
        <Typography variant="body2">
          Quá trình công tác:
          <ul>
           {description && description > 0 ?(
            description.map((item) => <li>{item}</li>))
            :(<>
                <li>Chưa có mô tả</li>
                <Button>Cập nhật ở dây "dành cho bác sĩ"</Button>
              </>
            )
           }
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};

export default DoctorDetail;
