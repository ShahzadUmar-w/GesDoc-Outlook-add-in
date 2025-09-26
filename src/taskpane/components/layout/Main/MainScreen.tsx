import React, { useState } from 'react';
import { Box, Typography, Button, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoaderApp from '../../Loader/Loader';

// Icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MainScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  // Generic helper for navigation with loader
  const navigateWithLoader = (path) => {
    setLoading(true);
    navigate(path);
    setLoading(false);

  };

  return (
    <Box
      sx={{
        margin: '0 5px',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Loader overlay when navigating */}
      {loading && <LoaderApp />}

      {/* Logo */}
      <Box>
        <img
          src={require('../../../../../assets/logo-filled.png')}
          width={150}
          alt="Logo"
        />
      </Box>

      {/* App title */}
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 500,
          fontFamily: 'system-ui',
          mt: 1,
        }}
      >
        GesDOC Add-in
      </Typography>

      {/* Screen title */}
      <Typography
        gutterBottom
        sx={{
          fontWeight: 'bold',
          mb: 4,
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.text.primary,
        }}
      >
        What do you want to do?
      </Typography>

      {/* Button group */}
      <Stack
        spacing={2.5}
        sx={{
          width: '100%',
          maxWidth: 320,
        }}
      >
        {/* Register Email */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          startIcon={<MailOutlineIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigateWithLoader('/RegisterEmailScreen')}
          sx={{
            py: 1.5,
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          Registar Email
        </Button>

        {/* Register Email with Attachments */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          startIcon={<AttachFileIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigateWithLoader('/RegesterEmialAndAttachments')}
          sx={{
            backgroundColor: '#e56100',
            py: 1.5,
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          Registar Email e Anexos
        </Button>

        {/* Register Invoice */}
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          startIcon={<ReceiptLongIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigateWithLoader('/invoice')}
          sx={{
            py: 1.5,
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          Registar Fatura
        </Button>
      </Stack>
    </Box>
  );
};

export default MainScreen;
