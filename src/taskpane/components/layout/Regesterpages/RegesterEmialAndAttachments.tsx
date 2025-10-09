import { Button, IconButton, Input, Box, List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, CircularProgress, Snackbar, Alert } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveEmail_and_attachments } from '../../Services/SaveEmail_and_attachments';

const RegesterEmialAndAttachments = () => {
  // State for the email input field, will be populated by Office JS
  const [emailInput, setEmailInput] = useState('');
  const [mailAttachments, setMailAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const initializeOfficeAndGetData = async () => {
      try {
        if (typeof Office !== "undefined" && Office.context?.mailbox?.item) {
          const item = Office.context.mailbox.item;

          // Sender email
          const senderEmail = item.sender?.emailAddress || "Unknown Sender";
          setEmailInput(senderEmail);

          // Attachments
          const attachments = item.attachments || [];
          const formattedAttachments = attachments.map((att) => ({
            id: att.id,
            name: att.name,
            isChecked: false,
          }));
          setMailAttachments(formattedAttachments);
        } else {
          showSnackbar("Office context not detected. Please run inside Outlook.", "error");
        }
      } catch (err) {
        console.error("Error loading Office data:", err);
        showSnackbar("Failed to load email data.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    initializeOfficeAndGetData();
  }, []);

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAttachmentChange = (attachmentId: string) => {
    setMailAttachments((prev) =>
      prev.map((att) =>
        att.id === attachmentId ? { ...att, isChecked: !att.isChecked } : att
      )
    );
  };

  // Handler for the main registration button click
  const handleRegisterClick = () => {
    console.log('Register Email and Attachments clicked!');
    console.log('Email entered:', emailInput);
    const selectedAttachments = mailAttachments.filter(att => att.isChecked);
    console.log('Selected Attachments:', selectedAttachments.map(att => att.name));

    // Here, you would implement the logic to save the email and selected attachments
    // For example, you might call Office.context.mailbox.item.saveAs to get the email as .msg/.eml
    // and then use Office.context.mailbox.item.getAttachmentContentAsync for each selected attachment.
    // This content would then be sent to your network share/DMS via an API.
  };




  // Inline styles to mimic the wireframe's appearance


  const handleSendFile = () => {

    // const demoFile: File = { name: "test.pdf", size: "200KB" };
    const demoFile = new File(["Dummy PDF content"], "test.pdf", {
      type: "application/pdf",
    });
    // Example: empty attachments array and hardcoded username
    SaveEmail_and_attachments(
      demoFile,
      [],
      emailInput, // using sender email as username
      (data, err) => {
        if (data) {
          console.log(data);
        }
        if (err) {
          console.log(err);
        }
      }
    )
  }


  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#333',
      //   border: '1px solid #bbb',
      borderRadius: '5px',
      //   width: '400px', // Approximate width to match the image
      margin: '20px auto',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    // Browser header section
    pageTitleBar: {
      backgroundColor: '#eee',
      borderBottom: '1px solid #ccc',
      textAlign: 'center',
      padding: '6px 0',
      fontSize: '13px',
      color: '#555',
    },
    browserNavbar: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 10px',
      backgroundColor: '#f1f1f1',
      borderBottom: '1px solid #ddd',
    },
    navButtons: {
      display: 'flex',
      gap: '8px',
      marginRight: '15px',
    },
    navIcon: {
      fontSize: '18px',
      cursor: 'pointer',
      color: '#666',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
    },
    addressBar: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      borderRadius: '3px',
      padding: '4px 8px',
      border: '1px solid #bbb',
      color: '#555',
    },
    addressInput: {
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      flexGrow: 1,
      padding: '0 5px',
      fontSize: '13px',
      color: '#333',
      pointerEvents: 'none', // Make it non-interactive to simulate a wireframe
    },
    menuIcon: {
      fontSize: '20px',
      marginLeft: '15px',
      cursor: 'pointer',
      color: '#666',
    },
    // Main content area
    contentArea: {
      padding: '20px',
    },
    // Email input field
    emailInputContainer: {
      marginBottom: '25px',
    },
    emailInputField: {
      //   width: '100%',
      //   padding: '8px 10px',
      // //   border: '1px solid #ccc',
      //   borderRadius: '3px',
      //   fontSize: '14px',
      //   boxSizing: 'border-box',
    },
    // Attachments section
    attachmentsSection: {
      marginBottom: '35px',
      textAlign: 'left',
    },
    attachmentLabel: {
      display: "block",
      marginBottom: "10px",
      cursor: "pointer",
      boxShadow: "0px 0px 3px 1px #00000030",
      border: '2px red',
      padding: "16px",

    },
    attachmentCheckbox: {
      marginRight: '10px',
      transform: 'scale(1.1)',
    },
    // Action button
    actionButtonContainer: {
      marginBottom: '40px',
      textAlign: 'center',
    },
    actionButton: {
      backgroundColor: '#e0e0e0',
      border: '1px solid #bbb',
      borderRadius: '5px',
      padding: '10px 25px',
      fontSize: '14px',
      cursor: 'pointer',
      color: '#333',
      outline: 'none',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      fontWeight: 'normal',
      display: 'inline-block',
    },
    // Description text
    descriptionSection: {
      fontSize: '13px',
      lineHeight: '1.5',
      color: '#555',
      textAlign: 'left',
    },
    descriptionParagraph: {
      marginBottom: '8px',
    },
    filenameExample: {
      fontFamily: 'monospace',
      backgroundColor: '#f9f9f9',
      padding: '2px 4px',
      borderRadius: '3px',
      fontSize: '12px',
      display: 'block',
      marginLeft: '10px',
      wordBreak: 'break-all',
    },
    statusMessage: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#888',
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <p>Loading email data...</p>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      {/* Back button */}
      <IconButton
        sx={{ position: "absolute", top: 8, left: 8 }}
        onClick={() => navigate("/main")}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Logo */}
      <Box
        component="img"
        src={require("../../../../../assets/logo-filled.png")}
        sx={{ width: 150, display: "block", mx: "auto", mb: 2 }}
      />

      {/* Email input */}
      <Input
        value={emailInput}
        readOnly
        fullWidth
        sx={{ mb: 3 }}
        placeholder="Sender email"
      />

      {/* Attachments list */}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {mailAttachments.length > 0 ? (
          mailAttachments.map((att) => (
            <ListItem key={att.id} disablePadding>
              <ListItemButton onClick={() => handleAttachmentChange(att.id)}>
                <ListItemIcon>
                  <Checkbox checked={att.isChecked} />
                </ListItemIcon>
                <ListItemText primary={att.name} />
                <InsertDriveFileIcon sx={{ color: "skyblue" }} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <p>No attachments found.</p>
        )}
      </List>

      {/* <div style={styles.attachmentsSection as React.CSSProperties}>
          {mailAttachments.length > 0 ? (
            mailAttachments.map((att) => (
              <label key={att.id} style={styles.attachmentLabel}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                  <input
                    type="checkbox"
                    name={att.id}
                    checked={att.isChecked}
                    onChange={() => handleAttachmentChange(att.id)}
                    style={styles.attachmentCheckbox}
                  />
                  {att.name} <CommentIcon />
                </div>
              </label>
            ))
          ) : (
            <p style={styles.statusMessage as React.CSSProperties}>No attachments found for this email.</p>
          )}
        </div> */}

      {/* Register Button */}
      <div style={styles.actionButtonContainer as React.CSSProperties}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          startIcon={<AttachFileIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={handleSendFile}
          sx={{
            backgroundColor: '#e56100',
            py: 1.5,
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          Registar Anexos
        </Button>
      </div>
      {/* Info */}
      <Box mt={3} fontSize={13} color="text.secondary">
        <p>This will copy the email and attachments to your GesDoc.</p>
        <p>Example filenames:</p>
        <code>your_email--date--time.pdf</code>
        <br />
        <code>your_email--date--time--att1</code>
        <br />
        <code>your_email--date--time--att2</code>
      </Box>

      {/* Snackbar notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RegesterEmialAndAttachments;
