import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registration from './components/Registration';
import Login from "./components/Login";
import Admin from "./components/Admin";
import Solarwatch from "./components/Solarwatch";
import {Icon} from "@mui/material";
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import image from "./img/gordes.jpg";
import './App.css';

const App = () => {
    return (
        <div style={{backgroundImage: `url(${image})`, width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            <div className="wrapper">
                <h1 className="appTitle">
                    <Icon className="icon" component={WbTwilightIcon} fontSize="large"/>
                    SOLARWATCH
                </h1>
                <BrowserRouter>
                    <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/solarwatch" element={<Solarwatch/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;