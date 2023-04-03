import { Select, TextField, Button, SelectChangeEvent, MenuItem, FormControl, FormLabel, InputLabel } from "@mui/material";
import React, { useState } from "react";

interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number;
    address: string;
}


export default function UserForm() {
    const [formData, setFormData] = useState<UserFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        age: 18,
        address: ''
    });
    const [errors, setErrors] = useState<Partial<UserFormData>>({});


    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(formData);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: Number(value) }));
      };

    return (
        <FormControl margin="normal" style={{margin: 30, width: "600px"}}>
            <FormLabel component="legend">User Information</FormLabel>
            <TextField
                label='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                fullWidth
                margin="normal"
            />
            <TextField
                label='Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                fullWidth
                margin="normal"
            />
            <TextField
                label='Email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                margin='normal'
            />
            <TextField
                label='Phone Number'
                name='phoneNumber'
                type='tel'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                fullWidth
                margin='normal'
            />
            <TextField
                label='Address'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                error={Boolean(errors.address)}
                helperText={errors.address}
                fullWidth
                margin='normal'
            />
            <TextField
                id="select-age"
                name='age'
                value={String(formData.age)}
                onChange={handleSelectChange}
                error={Boolean(errors.age)}
                fullWidth
                label="Age"
                select
                margin="normal"
            >   
                {Array.from({ length: 103 }, (_, i) => i + 18).map((age) => (
                    <MenuItem key={age} value={age}>
                        {age}
                    </MenuItem>
                    ))}
            </TextField>
            <Button sx={{margin: 5}} color="secondary" variant="contained" onClick={handleSubmit}>Submit</Button>
        </FormControl>
    )

}