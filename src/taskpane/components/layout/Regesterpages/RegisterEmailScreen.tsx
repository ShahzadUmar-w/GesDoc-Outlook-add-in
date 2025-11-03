// // src/components/RegisterEmailScreen.js (New Page)
// import React, { useEffect, useState } from 'react';
// import {
//     Box, Typography, Button, CircularProgress, Alert, useTheme, Stack, IconButton, TextField,
//     LinearProgress
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import SendIcon from '@mui/icons-material/Send'; // Icon for Send action
// import { Link, useNavigate } from 'react-router-dom';
// import { Get_Email_file } from '../../Services/Get_Email_file';
// import { SaveOnlyEmail } from '../../Services/SaveOnlyEmail';
// import { toast, ToastContainer } from 'react-toastify';

// const RegisterEmailScreen = () => {
//     const theme = useTheme();
//     const [comment, setComment] = useState('');
//     const [emailSubject, setemailSubject] = useState('');
//     const [emailSender, setemailSender] = useState('');
//     const [hasSettings, sethasSettings] = useState(null);
//     const [isLoading, setisLoading] = useState(null);

//     // React Hook for navigation
//     const navigate = useNavigate()


//     useEffect(() => {

//         setemailSubject(Office.context.mailbox.item.subject)
//         setemailSender(Office.context.mailbox.item.sender.emailAddress)
//         let Settings = localStorage.getItem('user_data')
//         sethasSettings(Settings)
//     }, [])


//     const handleSaveClick = async () => {
//         const mainEmailFile = await Get_Email_file()
//         let username= localStorage.getItem('username');
//         SaveOnlyEmail(mainEmailFile, username, (result, error) => {
//             if (error) {
//                 console.error("Upload failed:", error);
//                 toast.error("Upload failed")
//             } else {
//                 console.log("Upload result:", result);
//                 toast.success(result)
//             }
//         });

//     };


//     return (
//         <Box
//             sx={{
//                 flexGrow: 1, // Allows content to expand and use available vertical space
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'flex-start', // Align to top for scrolling if content is long
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 p: 3,
//                 bgcolor: 'background.default',
//                 color: 'text.primary',
//             }}
//         >
//             <ToastContainer />
//             {/* Back Button */}
//             <IconButton
//                 sx={{ position: 'absolute', top: 8, left: 8, color: theme.palette.text.secondary, zIndex: 1 }}
//                 onClick={() => {
//                     navigate('/main')
//                 }}
//                 aria-label="back"
//             >
//                 <ArrowBackIcon />
//             </IconButton>

//             {/* Icon */}
//             <img
//                 src={require('../../../../../assets/logo-filled.png')}
//                 width={150}
//                 alt="Logo"
//             />
//             {/* Title */}
//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: theme.typography.h6.fontWeight }}>
//                 Registar Email
//             </Typography>

//             {/* Description */}
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
//                 Confirm details and save the current email to your DMS.
//             </Typography>

//             {/* Email Details Display */}
//             <Stack spacing={1} sx={{ mb: 3, width: '100%', maxWidth: 380, textAlign: 'left', p: 1, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
//                     Subject:
//                     <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 'normal' }}>
//                         {emailSubject || 'No Subject'}
//                     </Typography>
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
//                     From:
//                     <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 'normal' }}>
//                         {emailSender || 'Unknown Sender'}
//                     </Typography>
//                 </Typography>
//                 {/* Add more email details if needed */}
//             </Stack>

//             {/* Comment/Description Text Field */}
//             <TextField
//                 id="comment-input"
//                 label="Add Comment / Description"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 variant="outlined"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 sx={{ mb: 4, width: '100%', maxWidth: 380 }}
//                 InputLabelProps={{
//                     sx: { color: theme.palette.text.secondary } // Consistent label color
//                 }}
//                 InputProps={{
//                     sx: { color: theme.palette.text.primary } // Consistent input text color
//                 }}
//             />

//             {/* Settings Warning */}
//             {/* {!hasSettings && (
//                 <Alert severity="warning" sx={{ mb: 3, width: '100%', maxWidth: 380 }}>
//                     Please configure Username and Server Name in settings before proceeding. <br />
//                     <Link to={'/setting'}>
//                         Lets configure
//                     </Link>
//                 </Alert>
//             )} */}

//             {/* Save Button */}
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSaveClick}
//                 disabled={isLoading}
//                 endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
//                 size="large"
//                 fullWidth
//                 sx={{ maxWidth: 380, py: 1.5 }}
//             >
//                 {isLoading ? "Saving..." : "Save Email to GetDoc"}
//             </Button>
//             <ToastContainer />

//         </Box>
//     );
// };

// export default RegisterEmailScreen;













// src/components/RegisterEmailScreen.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  Stack,
  IconButton,
  TextField,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, Link } from 'react-router-dom';
import { Get_Email_file } from '../../Services/Get_Email_file';
import { SaveOnlyEmail } from '../../Services/SaveOnlyEmail';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterEmailScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailSender, setEmailSender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSettings, setHasSettings] = useState(null);

  useEffect(() => {
    try {
      const item = Office.context.mailbox.item;
      setEmailSubject(item.subject || 'No Subject');
      setEmailSender(item.sender?.emailAddress || 'Unknown Sender');
      const settings = localStorage.getItem('username');
      setHasSettings(settings);
    } catch (error) {
      toast.error('Unable to load email context');
      console.error('Office context error:', error);
    }
  }, []);

  const handleSaveClick = async () => {
    if (!hasSettings) {
      toast.warning('Please configure settings before saving.');
      navigate('/setting');
      return;
    }

    setIsLoading(true);
    toast.info('Preparing email for upload...');

    try {
      const mainEmailFile = await Get_Email_file();
      const username = localStorage.getItem('username');

      if (!username) {
        toast.warning('Username not found. Please set it in Settings.');
        setIsLoading(false);
        return;
      }

      toast.info('Carregando e-mail para o servidor...');

      SaveOnlyEmail(mainEmailFile, username, (result, error) => {
        setIsLoading(false);
        if (error) {
          console.error('Upload failed:', error);
          toast.error('failed. Please check server url and usename and try again.');
        } else {
          console.log('Upload result:', result);
          toast.success(result || 'Email successfully saved to GetDoc!');
          setTimeout(() => navigate('/main'), 2000);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.error('Error:', err);
      toast.error('Unexpected error occurred.');
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
      }}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />
      {isLoading && <LinearProgress sx={{ width: '100%', position: 'absolute', top: 0 }} />}

      {/* Back Button */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          color: theme.palette.text.secondary,
          zIndex: 1,
        }}
        onClick={() => navigate('/main')}
        aria-label="back"
        disabled={isLoading}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Logo */}
      <img
        src={require('../../../../../assets/logo-filled.png')}
        width={140}
        alt="Logo"
        style={{ marginBottom: 12 }}
      />

      {/* Title */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Registar Email
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 320 }}
      >
        Reveja os detalhes do e-mail e guarde esta mensagem no GesDOC.      </Typography>

      {/* Email Details */}
      <Stack
        spacing={1}
        sx={{
          mb: 3,
          width: '100%',
          p: 2,

        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Assunto:{' '}
          <Typography component="span" color="text.secondary">
            {emailSubject}
          </Typography>
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          De:{' '}
          <Typography component="span" color="text.secondary">
            {emailSender}
          </Typography>
        </Typography>
      </Stack>

      {/* Comment Box */}
      <TextField
        id="comment-input"
        label="Adicionar comentário / Descrição"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 4, width: '100%', maxWidth: 380 }}
        InputLabelProps={{
          sx: { color: theme.palette.text.secondary },
        }}
        InputProps={{
          sx: { color: theme.palette.text.primary },
        }}
      />

      {/* Save Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveClick}
        disabled={isLoading}
        endIcon={
          isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SendIcon />
          )
        }
        size="large"
        fullWidth
        sx={{ maxWidth: 380, py: 1.5 }}
      >
        {isLoading ? ' Salvando...' : 'GUARDAR EMAIL NO GESDOC'}
      </Button>

      {!hasSettings && (
        <Typography
          variant="caption"
          color="warning.main"
          sx={{ mt: 2, fontSize: 13 }}
        >
          You haven’t configured settings yet.{' '}
          <Link to="/setting" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            Configure now
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default RegisterEmailScreen;
