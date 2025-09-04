// src/components/SettingScreen.js (Self-contained for its own data)
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, TextField, CircularProgress, useTheme, Stack, IconButton, Alert // Added Alert here if needed for local msg
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings'; // Main icon for settings screen
import SaveIcon from '@mui/icons-material/Save'; // Icon for save button

// import { LOCAL_STORAGE_KEYS } from '../utils/constants'; // Ensure correct path for constants

// This component still accepts onBack and showSnackbar as props because they control global app behavior.
const SettingScreen = () => {
    const theme = useTheme();

    // These states now live purely within SettingScreen, initialized from localStorage
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentServername, setCurrentServername] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Load values from localStorage on component mount
    // useEffect(() => {
    //     setCurrentUsername(localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME) || '');
    //     setCurrentServername(localStorage.getItem(LOCAL_STORAGE_KEYS.SERVERNAME) || '');
    // }, []); // Empty dependency array means this runs only once on mount

    // const handleSaveSettings = () => {
    //     setIsSaving(true);
    //     try {
            // Update localStorage directly
            // localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, currentUsername);
            // localStorage.setItem(LOCAL_STORAGE_KEYS.SERVERNAME, currentServername);

            // Notify parent (App.js) about successful save
    //         if (showSnackbar) { // Use showSnackbar prop to show global feedback
    //             showSnackbar("Settings saved successfully!", "success");
    //         } else {
    //             console.log("Settings saved (no global snackbar available).");
    //         }

    //         // Tell parent to go back (using onBack prop)
    //         if (onBack) {
    //             onBack(); // This will trigger App.js to change activeScreen and refresh its own settings state
    //         } else {
    //             console.log("Settings saved, but 'onBack' callback not provided.");
    //             // If onBack isn't provided, this button does nothing after saving to localStorage.
    //             // It is critical for screen-based navigation to have this callback.
    //         }
    //     } catch (error) {
    //         console.error("Failed to save settings to local storage:", error);
    //         if (showSnackbar) {
    //             showSnackbar("Failed to save settings. Please try again.", "error");
    //         }
    //     } finally {
    //         setIsSaving(false);
    //     }
    // };

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
           
                <IconButton
                    sx={{ position: 'absolute', top: 8, left: 8, color: theme.palette.text.secondary, zIndex: 1 }}
                    // onClick={onBack}
                    aria-label="back"
                    disabled={isSaving} // Disable back during save
                >
                    <ArrowBackIcon />
                </IconButton>
           

            {/* Icon */}
            <SettingsIcon sx={{ fontSize: 80, color: theme.palette.primary.light, mb: 3 }} />

            {/* Title */}
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: theme.typography.h6.fontWeight }}>
                Configure Add-in Settings
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                Set up your DMS username and server URL.
            </Typography>

            <Stack spacing={3} sx={{ width: '100%', maxWidth: 380, mb: 4 }}>
                <TextField
                    id="username-setting"
                    label="DMS Username"
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
                    label="DMS Server URL (e.g., http://yourdms.com)"
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
                // onClick={handleSaveSettings}
                disabled={isSaving || !currentUsername || !currentServername} // Disable if empty
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