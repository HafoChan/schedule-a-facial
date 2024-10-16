import React, { useEffect, useState } from "react"
import doctorApi from "../../api/doctorApi"
import { Box } from "@mui/material"
import Button from '@mui/material/Button';
import { TextField,Autocomplete } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search'
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';


const options = ["TPHCM","BacKan","BacLieu"]
const GetDoctor = () => {
    const [listDoctor,setListDoctor] = useState([])
    const [fullname, setFullName] = useState("")
    const [province,setProvince] = useState("")
    const [sortOrder, setSortOrder] = useState(""); 
      
    const handleSortChange = (event) => {
        const order = event.target.value;
        setSortOrder(order);
        };
    const handleSubmit = async (event) =>{
        event.preventDefault()
        let data
        if(fullname||province)
            data = await doctorApi.filterByProvince(province,fullname)
        else
            data = await doctorApi.getAll()
        setListDoctor(data.result)
        if(sortOrder)
        {
            console.log(data.result)
            const sorted = [...data.result].sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            });
            console.log("after filter price:" + sorted[0].price)
            setListDoctor(sorted);
        }

    }

    useEffect(() => {
        const GetAllDoctor = async() =>{
            try {
                const data = await doctorApi.getAll();
                setListDoctor(data.result)
            } catch (error) {
                console.log(error)
            }
        }
        console.log("list doctor after all " + listDoctor)

        GetAllDoctor()
    },[])

    return(
        <div>
            <div style={{marginTop:20,marginBottom:20}}>
                <div>
                    <input onChange={e => setFullName(e.target.value)}/><Button variant = "outlined" onClick={handleSubmit} >{<SearchIcon/>}</Button>
                    <FormControl component="fieldset">
                        <RadioGroup row value={sortOrder} onChange={handleSortChange}>
                            <FormControlLabel value="asc" control={<Radio />} label="Giá tăng dần" />
                            <FormControlLabel value="desc" control={<Radio />} label="Giá giảm dần" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <Autocomplete
                    value={province}
                    name = "province"
                    onChange={(event, newValue) => {
                    setProvince(newValue);
                    }}
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tỉnh thành" />}
                />
                <Button variant="outlined" endIcon={<SendIcon />} onClick={handleSubmit}>
                    Filter
                </Button>
            </div>
            <div>
                {listDoctor.map((item,key) =>
                    <Box key={key} component="section" sx={{ p: 2, border: '1px solid black', mb: 2 }}>
                        <h2>{item.name}</h2>
                        <p>Location: {item.location}</p>
                        <p>Specialization: {item.specialization}</p>
                        <p>Experience: {item.experience}</p>
                        <p>Price: {item.price}</p>
                </Box>
                )}
            </div>
        </div>
    )
}
export default GetDoctor