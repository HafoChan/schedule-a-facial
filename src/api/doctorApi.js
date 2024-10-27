import axiosClient from "./axiosClient"
const doctorApi = {
    create(data){
        return axiosClient.post("v1/doctor/create",data)
    },
    updateDoctor(id,data){
        return axiosClient.put(`v1/doctor/${id}`,data)
    },

    filterDoctor(province, name,district) {
        console.log(province + name + district)
        const query = [
            province ? `city=${province}` : '',
            name ? `name=${name}` : '',
            district ? `district=${district}` : '',

        ]
        .filter(Boolean)
        .join('&'); 
    
        const endpoint = query ? `v1/doctor?${query}` : 'v1/doctor';
        console.log(endpoint)
        return axiosClient.get(endpoint);
    },

    

}
export default doctorApi