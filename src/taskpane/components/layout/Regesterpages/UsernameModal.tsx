import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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


};

function UsernameModal({ setShowModal }) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (username.trim()) {
            localStorage.setItem('username', username); // Store username
            setShowModal(false); // Close modal
            navigate('/'); // Route to homepage
        } else {
            alert('Please enter a valid username');
        }
    };

    return (
        <Modal open={true} onClose={() => setShowModal(false)}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 2 }}>
                    <ErrorIcon style={{ color: 'orange' }} />
                    You're Not Registered
                </Typography>
                <Button variant="contained" onClick={handleSubmit}>
                    <ExitToAppIcon />
                    Registar Now
                </Button>
            </Box>
        </Modal>
    );
}

export default UsernameModal;