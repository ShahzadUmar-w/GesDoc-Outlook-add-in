/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Getstart from "../layout/Main/Getstart";
import MainScreen from "../layout/Main/MainScreen";
import RegisterEmailScreen from "../layout/Main/RegisterEmailScreen";
import Setting from "../layout/Main/Setting";
import RegesterEmialAndAttachments from "../layout/Main/RegesterEmialAndAttachments";


const RouterApp: React.FC = () => {
    
    
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Getstart />} />
                    <Route path="/main" element={<MainScreen/>} />
                    <Route path="/RegisterEmailScreen" element={<RegisterEmailScreen/>} />
                    <Route path="/RegesterEmialAndAttachments" element={<RegesterEmialAndAttachments/>} />

                    <Route path="/setting" element={<Setting/>} />

                </Routes>
            </Router>
        </>
    )
}

export default RouterApp;




