/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Getstart from "../layout/GetStart/Getstart";
import MainScreen from "../layout/Main/MainScreen";
import RegisterEmailScreen from "../layout/Regesterpages/RegisterEmailScreen";
import Setting from "../layout/Settings/Setting";
import RegesterEmialAndAttachments from "../layout/Regesterpages/RegesterEmialAndAttachments";
import InvoiceFile from "../layout/Regesterpages/InvoiceFile";
import UsernameModal from "../layout/Regesterpages/UsernameModal";
import { useUser } from "../../../context/UserContext";

 

const RouterApp: React.FC = () => {
  

    return (
        <>
            <Router>
                {/* If no username, show modal */}
                <Routes>
                    <Route path="/" element={<Getstart />} />
                    <Route path="/main" element={<MainScreen />} />
                    <Route path="/RegisterEmailScreen" element={<RegisterEmailScreen />} />
                    <Route path="/RegesterEmialAndAttachments" element={<RegesterEmialAndAttachments />} />
                    <Route path="/invoice" element={<InvoiceFile />} />
                    <Route path="/setting" element={<Setting />} />
                </Routes>
            </Router>
        </>
    )
}

export default RouterApp;





