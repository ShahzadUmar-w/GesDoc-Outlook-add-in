// src/components/SettingScreen.js (Self-contained for its own data)
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, TextField, CircularProgress, useTheme, Stack, IconButton, Alert // Added Alert here if needed for local msg
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings'; // Main icon for settings screen
import SaveIcon from '@mui/icons-material/Save'; // Icon for save button
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// import { LOCAL_STORAGE_KEYS } from '../utils/constants'; // Ensure correct path for constants

// This component still accepts onBack and showSnackbar as props because they control global app behavior.
const SettingScreen = () => {
    const theme = useTheme();

    // These states now live purely within SettingScreen, initialized from localStorage
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentServername, setCurrentServername] = useState('');
    const [isSaving, setIsSaving] = useState(false);



    const navigate = useNavigate()

    const handleSaveSettings = () => {
        if (currentServername.trim()) {
           
localStorage.setItem('servername', currentServername.trim());
localStorage.setItem('username', currentUsername.trim());
            toast.success("username and url registered!");
            navigate('/main')
        }
        if (!currentServername) {
            toast.warning("Add server url")
        }
        if (!currentUsername) {
            toast.warning("Add username")
        }
    }
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
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            {/* Back Button */}
            {/* Only show back button if onBack callback is provided by parent */}
            <ToastContainer position="bottom-right" />

            <IconButton
                sx={{ position: 'absolute', top: 8, left: 8, color: theme.palette.text.secondary, zIndex: 1 }}
                onClick={() => {
                    navigate('/main')
                }}
                aria-label="back"
                disabled={isSaving} // Disable back during save
            >
                <ArrowBackIcon />
            </IconButton>


            {/* Icon */}
            <SettingsIcon sx={{ fontSize: 80, color: theme.palette.primary.light, mb: 3 }} />

            {/* Title */}
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: theme.typography.h6.fontWeight }}>
              Definir configurações do suplemento
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                Configure o seu nome de utilizador GesDOC e o URL do servidor.
            </Typography>

            <Stack spacing={3} sx={{ width: '100%', maxWidth: 380, mb: 4 }}>
                <TextField
                    id="username-setting"
                    label="Nome de utilizador GesDOC"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={currentUsername}
                    onChange={(e) => setCurrentUsername(e.target.value)}
                    disabled={isSaving}
                    InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
                    InputProps={{ sx: { color: theme.palette.text.primary } }}
                />
                <TextField
                    id="servername-setting"
                    label="Endereço do Servidor GesDOC (ex., http://gesdoc:83)"
                    type="url" // Using type="url" for server name might give mobile keyboards a suitable layout
                    fullWidth
                    variant="outlined"
                    value={currentServername}
                    onChange={(e) => setCurrentServername(e.target.value)}
                    disabled={isSaving}
                    InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
                    InputProps={{ sx: { color: theme.palette.text.primary } }}
                />
            </Stack>

            {/* Save Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveSettings}
                endIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                size="large"
                fullWidth
                sx={{ maxWidth: 380, py: 1.5 }}
            >
                {isSaving ? "Saving..." : "Save Settings"}
            </Button>
        </Box>
    );
}

export default SettingScreen

