import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, TextField, Box, Typography, Container} from '@mui/material';
import SolarwatchData from "./SolarwatchData";

const Solarwatch = () => {
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState({});


    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (city && date) {
            console.log(city)
            console.log(date)
            axios.get(`http://localhost:8080/solar-watch?city=${city}&date=${date}`, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('jwt')}`,
                }
            })
                .then(response => {
                    console.log('Status: ' + response.status);
                    if (response.status === 200) {
                        console.log('Solarwatch data provided successfully!');
                        console.log('response.data: ' + response.data);
                        console.log(response.data['city']);
                        console.log(response.data['date']);
                        console.log(response.data['sunrise']);
                        console.log(response.data['sunset']);
                        setData(response.data);
                        console.log(data);
                    } else {
                        console.log('Solarwatch data not found.');
                    }
                })
                .catch(error => {
                    console.error('Connection error:', error);
                });
        } else {
            console.log('City and date are required.');
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/user/authorize', {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('jwt')}`
            }
        })
            .then(response => {
                console.log('Status: ' + response.status);
                if (response.status === 200) {
                    console.log('Welcome solarwatch!');
                } else {
                    console.log('Unauthorized.');
                    window.location.href = 'http://localhost:3000/login';
                }
            })
            .catch(error => {
                console.error('Connection error:', error);
                window.location.href = 'http://localhost:3000/login';
            });
    }, []); // Pusta tablica jako drugi argument oznacza, że useEffect zostanie wywołany tylko raz, po pierwszym renderowaniu

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="div" gutterBottom>
                    Solarwatch
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{width: '100%', mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                        autoFocus
                        value={city}
                        onChange={handleCityChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="date"
                        label="Date (YYYY-MM-DD)"
                        type="text"
                        id="date"
                        autoComplete="off"
                        value={date}
                        onChange={handleDateChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
            <SolarwatchData data={data}/>
        </Container>
    );
};

export default Solarwatch;