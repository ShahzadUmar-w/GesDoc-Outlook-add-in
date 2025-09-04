import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function HeaderAppBar({isonsignpage}: {isonsignpage?: boolean}) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1 }} style={{display:'flex', justifyContent:'center'}}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
         <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "sticky",
          top: 1,
          zIndex: 10,
          left: 10,
          backgroundColor: "white",
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MATTERS
          </Typography>
          {isonsignpage ? (
            <div onClick={() => {navigate('/settingspage')}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              
            </div>
          ):(  <div onClick={() => {navigate('/')}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
              
            </div>)}
        </Toolbar>
      </AppBar>
    </Box>
    </Box>
  );
}
