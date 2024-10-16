import React, { useEffect, useState } from "react";
import doctorApi from "../../api/doctorApi";

const UpdateInfo = () =>{
    const [data,setData] = useState({})
    const [doctor,setDoctor] = useState({
        location: "",
        specialization: "",
        experience: "",
        price: 0,
        description: ""})

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetchData()
    }
    const id = "12c408ec-7e2d-43b8-9ac3-dd1a216fc99c"

    const handleChange = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setDoctor(values => (
            {...values,[name] : value}
        ))
    }
    const fetchData = async () =>{
        try {
            const result = await doctorApi.updateDoctor(id,doctor)
            console.log(result)
            setData(result.result)
        } catch (error) {
            console.log(error)
        }
        }
    
    return(
        <form onSubmit={handleSubmit}>
            Location : 
            <input
                type="text"
                name="location"
                value={doctor.location}
                onChange={handleChange}
            />
            <br/>
            Specialization : 
            <input
                type="text"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
            />
            <br/>
            Experience : 
            <input
                type="text"
                name="experience"
                value={doctor.experience}
                onChange={handleChange}
            />
            <br/>
            Price : 
            <input
                type="text"
                name="price"
                value={doctor.price}
                onChange={handleChange}
            />
            <br/>
            Description : 
            <input
                type="text"
                name="description"
                value={doctor.description}
                onChange={handleChange}
            />
            <br/>
            <input type="submit"/>
        </form>
    )
}
export default UpdateInfo;