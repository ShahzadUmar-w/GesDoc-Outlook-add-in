import { Button, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Box } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useState, useEffect } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';
const InvoiceFile = () => {
  // State for the email input field, will be populated by Office JS
  const [emailInput, setEmailInput] = useState('');
  const [mailAttachments, setMailAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- navigation
  const navigate = useNavigate()
  // --- Office JS Integration ---
  useEffect(() => {
    // This function will initialize Office and fetch data
    const initializeOfficeAndGetData = async () => {
      try {
        if (typeof Office !== 'undefined' && Office.context && Office.context.mailbox && Office.context.mailbox.item) {
          console.log("Office context detected, fetching email data...");

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
          // Fallback for when not running in an Office Add-in environment
          console.log("Office context not available. Using mock data.");
          //   setEmailInput("mock_sender@example.com");
          //   setMailAttachments([
          //     { id: "mock_att1", name: "Mock Document.pdf", isChecked: false },
          //     { id: "mock_att2", name: "Mock Image.jpg", isChecked: true }, // Pre-checked as per wireframe
          //     { id: "mock_att3", name: "Mock Spreadsheet.xlsx", isChecked: false },
          //     { id: "mock_att4", name: "Mock Presentation.pptx", isChecked: false },
          //   ]);
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
      <div style={styles.container}>
        <div style={styles.contentArea}>
          <div style={styles.statusMessage as React.CSSProperties}>Loading email data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.contentArea}>
          <div style={{ ...styles.statusMessage as React.CSSProperties, color: 'red' }}>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <IconButton
        sx={{ position: 'absolute', top: 8, left: 8, color: '#666', zIndex: 1 }}
        onClick={() => {
          navigate('/main')
        }}
        aria-label="back"
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Icon */}
      <Box component="img" src={require('../../../../../assets/logo-filled.png')} sx={{ width: 150, display: 'block', margin: 'auto' }}>

      </Box>
      {/* <img
        src={require('../../../../../assets/logo-filled.png')}
        width={150}
        alt="Logo"
        sx={{ widh: 200, margin: 'auto' }}
      /> */}
      {/* Browser Page Title Bar */}



      {/* Main Content Area */}
      <div style={styles.contentArea}>
        {/* Email Input Field */}
        <div >
          <Input
            type="text"
            placeholder="Your email (text)"
            value={emailInput}
            fullWidth

            onChange={(e) => setEmailInput(e.target.value)}
            // style={styles.emailInputField as React.CSSProperties}
            readOnly // Make it read-only as it's pre-filled by the add-in
          />

        </div>

        {/* Attachments Checkboxes */}
        <div >



          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Attachment</InputLabel>
            {mailAttachments.length && (<>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
              // onChange={handleChange}
              >
                {mailAttachments.map((att) => (
                  <MenuItem value={att}>{att.name}</MenuItem>
                ))}
              </Select>
            </>)

            }
          </FormControl>


        </div>

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
      </div>
    </div>
  );
};

export default InvoiceFile;