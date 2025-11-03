import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, useTheme } from '@mui/material'; // Added useTheme
import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import InfoIcon from '@mui/icons-material/Info'; // Not used in provided code, removed if not needed
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import LoaderApp from '../../Loader/Loader';
import pt from "../../utils/textResources.json";
import type { Translations } from '../../../../types/Translations';

const text = pt as Translations;

const Getstart = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const theme = useTheme(); // Access the theme object for consistent styling

    // Placeholder for navigation handler
    const handleGetStarted = () => {
        setloading(true);
        let username = localStorage.getItem('username');
        if (!username) {
            navigate('/setting');
            return;
        } else {
            navigate('/main');
        }
        // Replace '/main' with your specific starting route if different

        // If navigation is asynchronous, you might hide loader in the target component or with more sophisticated routing.
    };

    return (
        <Box
            sx={{
                minHeight: '100vh', // Ensures the Box takes full height of the task pane
                width: '100%',     // Ensures the Box takes full width
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Vertically center content
                alignItems: 'center', // Horizontally center content
                textAlign: 'center',
                bgcolor: 'white', // Use theme background color
                // p: 3, // Add padding around the entire content
            }}
        >
            {loading && <LoaderApp />} {/* Retained your LoaderApp usage */}

            <Typography
                variant="h4" // Using a Typography variant for a more structured title
                gutterBottom
                sx={{
                    fontWeight: theme.typography.h4.fontWeight, // Use theme fontWeight
                    mb: 4, // Increased margin for better separation from visual elements
                    fontSize: { xs: '2rem', sm: '2.5rem' }, // Responsive font size
                    color: theme.palette.text.primary, // Use theme text primary color
                    fontFamily: 'cursive', // Use theme font family
                    // No need for display:flex, alignItems, gap here unless you add an icon directly to the title
                }}
            >
                Save Emails to GesDOC{text.saveEmailToGesDOC}
            </Typography>

            {/* Visual element with email icon, arrow, and logo */}
            <Stack
                direction="row"
                spacing={3} // Increased spacing for better visual separation
                alignItems="center"
                justifyContent="center"
                mb={5} // Increased margin bottom for more space before description
                sx={{
                    flexWrap: 'wrap', // Allow items to wrap on smaller screens
                    px: 1, // Add some horizontal padding to the stack itself
                }}
            >
                {/* Email Icon/Image */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={require('../../../../../assets/email.png')} width={60} height={60} alt="Email Icon" />
                </Box>

                {/* Arrow Icon with Custom Styling */}
                <ArrowForwardIcon
                    sx={{
                        fontSize: 30, // Slightly larger arrow icon
                        color: theme.palette.text.secondary, // Use theme color
                        border: `2px solid ${theme.palette.text.secondary}`, // Use theme color for border
                        borderRadius: '50%',
                        p: 0.8, // Padding for the icon to make the circle bigger
                        minWidth: 40, minHeight: 40, // Ensure minimum size of the circle
                        boxSizing: 'content-box', // Ensure padding is added to width/height
                    }}
                />

                {/* Logo Image */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={require('../../../../../assets/logo-filled.png')} width={70} height={70} alt="GesDOC Logo" />
                </Box>
            </Stack>

            {/* Description Text */}
            <Typography
                variant="body1" // Use body1 variant from theme
                color="text.secondary" // Use theme text secondary color
                sx={{
                    maxWidth: 380, // Slightly increased max width for readability
                    mb: 5, // Increased margin bottom before the button
                    px: 2, // Horizontal padding for text, especially on smaller screens
                }}
            >
                <Typography component="span" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}> {/* Bold part with theme primary color */}
                    GesDOC for Outlook
                </Typography>
                , lets you save emails directly within Outlook.
            </Typography>

            {/* "Get Started" Button */}
            <Button
                variant="contained"
                color="primary" // Use theme's primary color
                onClick={handleGetStarted} // Use dedicated handler
                size="large"
                style={{
                    minWidth: 260, // Slightly increased minWidth for a more prominent button
                    maxWidth: 320, // Keep a max width for consistency
                    width: '90%', // Make it full width if within a Stack/Box with maxWidth

                    fontWeight: theme.typography.button.fontWeight, // Use theme fontWeight for button text
                }}
            >
                Get Started with GesDOC
            </Button>
        </Box>
    );
};

export default Getstart;