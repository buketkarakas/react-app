import { Select, TextField, SelectChangeEvent, MenuItem, FormControl, FormLabel } from "@mui/material";
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
        age: 0,
        address: ''
    });
    const [errors, setErrors] = useState<Partial<UserFormData>>({});


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
      };

    return (
        <FormControl style={{margin: 50}}>
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
            <Select
                label='Age'
                name='Age'
                value={String(formData.age)}
                onChange={handleSelectChange}
                error={Boolean(errors.age)}
                fullWidth
                margin='none'
            >
                {Array.from({ length: 103 }, (_, i) => i + 18).map((age) => (
                    <MenuItem key={age} value={age}>
                        {age}
                    </MenuItem>
                    ))}
            </Select>

        </FormControl>
    )

}