/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Getstart from "../layout/GetStart/Getstart";
import MainScreen from "../layout/Main/MainScreen";
import RegisterEmailScreen from "../layout/Regesterpages/RegisterEmailScreen";
import Setting from "../layout/Settings/Setting";
import RegesterEmialAndAttachments from "../layout/Regesterpages/RegesterEmialAndAttachments";
import InvoiceFile from "../layout/Regesterpages/InvoiceFile";
import UsernameModal from "../layout/Regesterpages/UsernameModal";


const RouterApp: React.FC = () => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Initialize Office.js
        Office.onReady(() => {
            console.log('Office is ready');
            // Check localStorage for username
            const username = localStorage.getItem('username');
            if (!username) {
                setShowModal(true); // Show modal if no username
            }
        });
    }, []);

    return (
        <>
            <Router>
                {showModal && <UsernameModal setShowModal={setShowModal} />}
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




