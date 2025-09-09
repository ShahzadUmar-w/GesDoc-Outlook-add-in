import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
                <Typography variant="h6" component="h2">
                    Enter Your Username
                </Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
}

export default UsernameModal;