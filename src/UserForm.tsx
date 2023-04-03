import { Select, TextField, Button, SelectChangeEvent, MenuItem, FormControl, FormLabel, InputLabel } from "@mui/material";
import React, { useState } from "react";
import UserService from "./services/user"

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
        if(validateForm()){
            UserService
            .create(formData)
            .then(response => setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                age: 18,
                address: ''
            }))
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: Number(value) }));
      };

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors: Partial<UserFormData> = {};
    
        if (formData.firstName.trim() === '') {
          newErrors.firstName = 'First name is required';
          valid = false;
        }
    
        if (formData.lastName.trim() === '') {
          newErrors.lastName = 'Last name is required';
          valid = false;
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email address';
          valid = false;
        }
    
        if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Invalid phone number';
          valid = false;
        }

        if(formData.address.trim() === ''){
            newErrors.address = 'Address is required';
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
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