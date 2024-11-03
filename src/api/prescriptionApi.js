import axiosClient from "./axiosClient";
const prescriptionApi = {
    findAppointmentByDoctor(){
        return axiosClient.get("/appointment/doctor-appointments?doctorId=f053016f-15b6-4a36-8a4b-1b422492d9c0")
    },
    getInfoPatient(id){
        return axiosClient.get(`/patient/${id}`)
    },
    createMedicine(id, data){
        return axiosClient.post(`/prescription/${id}/medicine`, data)
    },
    getListMedicine(id){
        return axiosClient.get(`/prescription/${id}/medicine`)
    },
    createPrescription(id, data){
        return axiosClient.put(`/prescription/${id}`, data)
    },
    updateStatus(id, data){
        return axiosClient.put(`/appointment/${id}`, data)
    },
    updateMedicine(id, data){
        return axiosClient.put(`/medicine/${id}`, data)
    },
    filterAppointment(date){
        return axiosClient.get(`/appointment/doctor-appointments?doctorId=f053016f-15b6-4a36-8a4b-1b422492d9c0&date=${date}`)
    },  
    filterAppointmentByTime(week, month){
        let url = `appointment/doctor-appointment/time?doctorId=f053016f-15b6-4a36-8a4b-1b422492d9c0`
        if(week){
            url +=`&week=${week}`
        }
        if(month){
            url +=`&month=${month}`
        }
        return axiosClient.get(url)
    }
}
export default prescriptionApi