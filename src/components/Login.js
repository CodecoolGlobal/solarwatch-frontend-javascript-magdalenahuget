import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Container } from '@mui/material';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/user/signin', {
            username: username,
            password: password
        })
            .then(response => {
                console.log('Status: ' + response.status);
                if (response.status === 200) {
                    console.log(response);
                    console.log(response.data["jwt"]);
                    sessionStorage.setItem('jwt', response.data["jwt"]);
                    console.log('User logged in successfully!');
                } else {
                    console.log('Login failed.');
                }
            })
            .catch(error => {
                console.error('Connection error:', error);
            })
    };

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
                    Login Page
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Registration;