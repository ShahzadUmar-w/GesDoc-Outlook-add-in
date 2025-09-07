// src/components/RegisterEmailScreen.js (New Page)
import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, CircularProgress, Alert, useTheme, Stack, IconButton, TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send'; // Icon for Send action
import { Link, useNavigate } from 'react-router-dom';

const RegisterEmailScreen = () => {
    const theme = useTheme();
    const [comment, setComment] = useState('');
    const [emailSubject, setemailSubject] = useState('');
    const [emailSender, setemailSender] = useState('');
    const [hasSettings, sethasSettings] = useState(null);
    const [isLoading, setisLoading] = useState(null);

    // React Hook for navigation
    const navigate = useNavigate()


    useEffect(() => {
        setemailSubject(Office.context.mailbox.item.subject)
        setemailSender(Office.context.mailbox.item.sender.emailAddress)
        let Settings = localStorage.getItem('user_data')
        sethasSettings(Settings)
    }, [])


    const handleSaveClick = () => {
        // onSave(comment); // Pass the comment to the onSave handler in App.js
    };

    return (
        <Box
            sx={{
                flexGrow: 1, // Allows content to expand and use available vertical space
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // Align to top for scrolling if content is long
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            {/* Back Button */}
            <IconButton
                sx={{ position: 'absolute', top: 8, left: 8, color: theme.palette.text.secondary, zIndex: 1 }}
                onClick={() => {
                    navigate('/main')
                }}
                aria-label="back"
            >
                <ArrowBackIcon />
            </IconButton>

            {/* Icon */}
            <img
                src={require('../../../../../assets/logo-filled.png')}
                width={150}
                alt="Logo"
            />
            {/* Title */}
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: theme.typography.h6.fontWeight }}>
                Registar Email
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
                Confirm details and save the current email to your DMS.
            </Typography>

            {/* Email Details Display */}
            <Stack spacing={1} sx={{ mb: 3, width: '100%', maxWidth: 380, textAlign: 'left', p: 1, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    Subject:
                    <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 'normal' }}>
                        {emailSubject || 'No Subject'}
                    </Typography>
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    From:
                    <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 'normal' }}>
                        {emailSender || 'Unknown Sender'}
                    </Typography>
                </Typography>
                {/* Add more email details if needed */}
            </Stack>

            {/* Comment/Description Text Field */}
            <TextField
                id="comment-input"
                label="Add Comment / Description"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 4, width: '100%', maxWidth: 380 }}
                InputLabelProps={{
                    sx: { color: theme.palette.text.secondary } // Consistent label color
                }}
                InputProps={{
                    sx: { color: theme.palette.text.primary } // Consistent input text color
                }}
            />

            {/* Settings Warning */}
            {!hasSettings && (
                <Alert severity="warning" sx={{ mb: 3, width: '100%', maxWidth: 380 }}>
                    Please configure Username and Server Name in settings before proceeding. <br />
                    <Link to={'/setting'}>
                        Lets configure
                    </Link>
                </Alert>
            )}

            {/* Save Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                size="large"
                fullWidth
                sx={{ maxWidth: 380, py: 1.5 }}
            >
                {isLoading ? "Saving..." : "Save Email to DMS"}
            </Button>
        </Box>
    );
};

export default RegisterEmailScreen;