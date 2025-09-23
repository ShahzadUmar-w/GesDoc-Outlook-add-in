import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ErrorIcon from '@mui/icons-material/Error';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    height: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',   // or 'row' if you want side by side
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'  // space between elements
};

function UsernameModal({ setShowModal }) {
    const [username, setUsername] = useState('Sajjad');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (username.trim()) {
            localStorage.setItem('username', username); // Store username
            setShowModal(false); // Close modal
            navigate('/setting'); // 
        } else {
            console.log('Please enter a valid username');
        }
    };

    return (
        <Modal open={true} onClose={() => setShowModal(false)}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <ErrorIcon style={{ color: 'orange' }} />
                    You're Not Registered
                </Typography>
                <Button variant="contained" onClick={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, padding: '8px 20px' }}>
                    <LoginIcon />
                    Registar Now
                </Button>
            </Box>
        </Modal>
    );
}

export default UsernameModal;