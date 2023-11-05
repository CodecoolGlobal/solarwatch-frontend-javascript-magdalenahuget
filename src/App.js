import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registration from './components/Registration';
import Login from "./components/Login";
import Admin from "./components/Admin";
import Solarwatch from "./components/Solarwatch";

const App = () => {
    return (
        <div className="wrapper">
            <h1>Application</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/solarwatch" element={<Solarwatch />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;