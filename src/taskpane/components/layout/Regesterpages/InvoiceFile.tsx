import { Button, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Box, Typography, CircularProgress, } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useState, useEffect } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';
const InvoiceFile = () => {
  const [emailInput, setEmailInput] = useState("");
  const [mailAttachments, setMailAttachments] = useState<any[]>([]);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- navigation
  const navigate = useNavigate()
  // --- Office JS Integration ---
  useEffect(() => {
    const initializeOfficeAndGetData = async () => {
      try {
        if (Office?.context?.mailbox?.item) {
          const item = Office.context.mailbox.item;

          // Get sender's email
          const senderEmail = Office.context.mailbox.item.sender.emailAddress;
          if (senderEmail) {
            setEmailInput(senderEmail);
          } else {
            setEmailInput("No sender email found");
          }

          // Get attachments
          const attachments = Office.context.mailbox.item.attachments;
          if (attachments && attachments.length > 0) {
            // Map attachments to our state structure, initially all unchecked
            const formattedAttachments = attachments.map(att => ({
              id: att.id,
              name: att.name,
              isChecked: false, // Start all as unchecked
            }));
            setMailAttachments(formattedAttachments);
          } else {
            console.log("No attachments found for this email.");
            setMailAttachments([]);
          }
        } else {
          setToast({
            open: true,
            message: "Please open this add-in inside Outlook.",
            severity: "error",
          });
        }
      } catch (err) {
        console.error("Error initializing Office or fetching data:", err);
        setError("Failed to load email data. Make sure an email is selected.");
        setEmailInput("Error fetching email");
        setMailAttachments([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch data
    initializeOfficeAndGetData();

    // The empty dependency array ensures this effect runs only once after initial render
  }, []);

  // Handler for attachment checkbox changes
  const handleAttachmentChange = (attachmentId) => {
    setMailAttachments(prevAttachments =>
      prevAttachments.map(att =>
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
        <Typography mt={2}>Loading email data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <IconButton onClick={() => navigate("/main")} sx={{ mb: 1 }}>
        <ArrowBackIcon />
      </IconButton>

      <Box
        component="img"
        src={require("../../../../../assets/logo-filled.png")}
        sx={{ width: 150, display: "block", mx: "auto", mb: 2 }}
      />

      <Typography variant="h6" align="center" gutterBottom>
        Register Invoice
      </Typography>

      <Input value={emailInput} readOnly fullWidth sx={{ mb: 3 }} />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Invoice Attachment</InputLabel>
        <Select
          value={selectedAttachment ? selectedAttachment.id : ""}
          label="Invoice Attachment"
          onChange={(e) => {
            const att = mailAttachments.find((a) => a.id === e.target.value);
            setSelectedAttachment(att || null);
          }}
        >
          {mailAttachments.map((att) => (
            <MenuItem key={att.id} value={att.id}>
              {att.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Register Button */}
      <div style={styles.actionButtonContainer as React.CSSProperties}>
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          startIcon={<ReceiptLongIcon />}
          endIcon={<ArrowForwardIcon />}
          //   onClick={() => navigateWithLoader('/invoice')}
          sx={{
            py: 1.5,
            justifyContent: 'space-between',
            px: 3,
            my: 2
          }}
        >
          Registar Fatura
        </Button>
      </div>

      {/* Description and Filename Examples */}
      <div style={styles.descriptionSection as React.CSSProperties}>
        <p style={styles.descriptionParagraph as React.CSSProperties}>This option will copy the email to Your GesDoc.</p>
        <p style={styles.descriptionParagraph as React.CSSProperties}>The filename should be:</p>
        <p style={styles.filenameExample as React.CSSProperties}>your_email--date--time.pdf</p>
        <p style={styles.descriptionParagraph as React.CSSProperties}>The filename should be:</p>
        <p style={styles.filenameExample as React.CSSProperties}>your_email--date--time--att1</p>
        <p style={styles.filenameExample as React.CSSProperties}>your_email--date--time--att2</p>
      </div>
    </Box>
  );
}
export default InvoiceFile;

function setToast(arg0: { open: boolean; message: string; severity: string; }) {
  throw new Error('Function not implemented.');
}
