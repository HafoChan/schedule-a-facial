import React, { useState, useEffect } from "react";
import doctorApi from '../../api/doctorApi';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import DoctorList from "../../components/doctorComponent/DoctorList";

const BookingPage = () => {
  const { provinceSlug, districtSlug } = useParams(); // Lấy tham số từ URL

  const navigate = useNavigate();

  const [listDoctor, setListDoctor] = useState([]);
  const [fullname, setFullName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [options, setOptions] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null); // Lưu tỉnh đã chọn
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Lưu huyện đã chọn
  const searchParams = new URLSearchParams();

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  const getCity = async () => {
    const data = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
    setOptions(data.data)
  }
  const handleSelectChange = (type, newValue) => {
    if (type === 'province') {
      setSelectedProvince(newValue);
      setSelectedDistrict(null); // Reset huyện khi thay đổi tỉnh
    } else if (type === 'district') {
      setSelectedDistrict(newValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fullname) {
      searchParams.append("keyword", fullname); // Thêm query string ?keyword=a
    }
    let data;
    const provinceSlug = selectedProvince ? selectedProvince.Name.toLowerCase().replace(/\s+/g, '-') : '';
    const districtSlug = selectedDistrict ? selectedDistrict.Name.toLowerCase().replace(/\s+/g, '-') : '';
    const url = districtSlug
      ? `/doctor/${provinceSlug}/${districtSlug}?${searchParams.toString()}`
      : (provinceSlug
        ? `/doctor/${provinceSlug}?${searchParams.toString()}`
        : `/doctor?${searchParams.toString()}`);

    data = await doctorApi.filterDoctor(selectedProvince && selectedProvince.Name, fullname, selectedDistrict && selectedDistrict.Name);
    console.log(data.result)
    setListDoctor(data.result);
    navigate(url)
    if (sortOrder) {
      const sorted = [...data.result].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
      setListDoctor(sorted);
    }
  };

  const pressDoctor = (doctor) => {
    navigate(`/doctorDetail/${doctor.name}`, { state: { doctor } });
  };

  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const data = await doctorApi.filterDoctor(selectedProvince && selectedProvince.Name, fullname, selectedDistrict && selectedDistrict.Name);
        setListDoctor(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDoctor();
    getCity()
  }, [provinceSlug, districtSlug]);

  return (
    <DoctorList
      listDoctor={listDoctor}
      selectedProvince={selectedProvince}
      selectedDistrict={selectedDistrict}
      fullname={fullname}
      sortOrder={sortOrder}
      options={options}
      handleSelectChange={handleSelectChange}
      handleSubmit={handleSubmit}
      handleSortChange={handleSortChange}
      setFullName={setFullName}
      pressDoctor={pressDoctor}
    />
  )

};

export default BookingPage;