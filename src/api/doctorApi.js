import axiosClient from "./axiosClient"
const doctorApi = {
    create(data){
        return axiosClient.post("doctor/create",data)
    },
    updateDoctor(id,data){
        return axiosClient.put(`doctor/${id}`,data)
    },
    getAll(){
        return axiosClient.get("doctor/all")
    },
    filterByProvince(province,name){
        if (name)
        {
            console.log(name)
            console.log("inn name")
            return axiosClient.get(`/doctor/filter/${province}?name=${name}`)

        }
        else
            return axiosClient.get(`/doctor/filter/${province}`)

    },
    filterByName(name){
        return axiosClient.get(`/doctor/filter/?name=${name}`)
    },
    filterPrice(sort){
        return axiosClient.get(`/doctor/price/${sort}`)
    }
}
export default doctorApi