import React from "react";

const doctors = [
  { id: 1, name: "Bác sĩ A", specialty: "Da liễu", experience: "10 năm" },
  { id: 2, name: "Bác sĩ B", specialty: "Thẩm mỹ", experience: "8 năm" },
  { id: 3, name: "Bác sĩ C", specialty: "Chăm sóc da", experience: "5 năm" },
];

const Team = () => {
  return (
    <div>
      <h1>Đội ngũ chuyên gia</h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <h2>{doctor.name}</h2>
            <p>Chuyên môn: {doctor.specialty}</p>
            <p>Kinh nghiệm: {doctor.experience}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
