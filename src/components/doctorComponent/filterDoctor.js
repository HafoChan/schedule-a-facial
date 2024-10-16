import { TextField,Autocomplete } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import doctorApi from "../../api/doctorApi";

const options = ["TPHCM","BacKan"]
const FilterDoctor = () => {
    const [value,setValue] = useState("")
    const handleSubmit = () =>{

    }

    const fetchData = async(province) =>{
        const data = await doctorApi.filterByProvince(province)

    }
    return(
        <div style={{marginTop:20,marginBottom:20}} >
             <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Tỉnh thành" />}
            />
            <Button variant="outlined" endIcon={<SendIcon />} onSubmit={handleSubmit}>
                Filter
            </Button>
        </div>
    )
}
export default FilterDoctor