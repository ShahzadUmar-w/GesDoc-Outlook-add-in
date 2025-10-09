import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Input,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
=======
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec
const InvoiceFile = () => {
  const [emailInput, setEmailInput] = useState("");
  const [mailAttachments, setMailAttachments] = useState<any[]>([]);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info",
  });

<<<<<<< HEAD
  // --- navigation
  const navigate = useNavigate()
  // --- Office JS Integration ---


=======
  const navigate = useNavigate();

  // Load email + attachments
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec
  useEffect(() => {
    const initializeOfficeAndGetData = async () => {
      try {
        if (Office?.context?.mailbox?.item) {
          const item = Office.context.mailbox.item;

          const senderEmail = item.sender?.emailAddress || "Unknown Sender";
          setEmailInput(senderEmail);

<<<<<<< HEAD
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
            toast.success("Invoice registered to DMS")
          } else {
            console.log("No attachments found for this email.");
            setMailAttachments([]);
          }
=======
          const attachments = item.attachments || [];
          const formatted = attachments.map((att) => ({
            id: att.id,
            name: att.name,
          }));
          setMailAttachments(formatted);
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec
        } else {
          setToast({
            open: true,
            message: "Please open this add-in inside Outlook.",
            severity: "error",
          });
        }
      } catch (err) {
<<<<<<< HEAD
        console.error("Error initializing Office or fetching data:", err);
        toast.error("No attachments found for this email.")
        setError("Failed to load email data. Make sure an email is selected.");
        setEmailInput("Error fetching email");
        setMailAttachments([]);
=======
        console.error("Office initialization error:", err);
        setToast({
          open: true,
          message: "Failed to load email data.",
          severity: "error",
        });
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec
      } finally {
        setIsLoading(false);
      }
    };
<<<<<<< HEAD


    // Call the function to fetch data

    // The empty dependency array ensures this effect runs only once after initial render
  }, []);

  // Handler for attachment checkbox changes
  const navigateWithLoader = () => {
    initializeOfficeAndGetData()
  }

  const handleAttachmentChange = (attachmentId) => {
    setMailAttachments(prevAttachments =>
      prevAttachments.map(att =>
        att.id === attachmentId ? { ...att, isChecked: !att.isChecked } : att
      )
    );
  };
=======
    initializeOfficeAndGetData();
  }, []);

  // --- Upload Invoice Attachment ---
  const handleUploadInvoice = async () => {
    if (!selectedAttachment) {
      setToast({
        open: true,
        message: "Please select an attachment to upload.",
        severity: "error",
      });
      return;
    }
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec

    try {
      setUploading(true);

      // Fetch attachment content
      const content = await new Promise<string>((resolve, reject) => {
        Office.context.mailbox.item.getAttachmentContentAsync(
          selectedAttachment.id,
          (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              resolve(result.value.content);
            } else {
              reject(result.error);
            }
          }
        );
      });

      // Convert base64 → Blob → File
      const byteArray = Uint8Array.from(atob(content), (c) => c.charCodeAt(0));
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      const file = new File([blob], selectedAttachment.name);

      // Prepare FormData
      const formData = new FormData();
      formData.append("username", "luis.barata");
      formData.append("file", file);

      const response = await fetch(
        "https://gesdoc.beiranet.pt/APIv3/upload_api_fac.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (response.ok) {
        setToast({
          open: true,
          message: "Invoice uploaded successfully!",
          severity: "success",
        });
      } else {
        setToast({
          open: true,
          message: `Upload failed: ${response.status}`,
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setToast({
        open: true,
        message: "Error uploading invoice.",
        severity: "error",
      });
    } finally {
      setUploading(false);
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

      <Button
        fullWidth
        variant="contained"
        color="success"
        startIcon={<ReceiptLongIcon />}
        endIcon={<ArrowForwardIcon />}
        onClick={handleUploadInvoice}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Registar Fatura"}
      </Button>

      <Typography variant="body2" mt={3} color="text.secondary">
        This will copy the selected invoice to your GesDoc.
      </Typography>

<<<<<<< HEAD

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
            <InputLabel id="demo-simple-select-label">Invoice</InputLabel>
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
            onClick={navigateWithLoader}
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

        <ToastContainer />

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
=======
      {/* Snackbar Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec
  );
};

export default InvoiceFile;
<<<<<<< HEAD

function initializeOfficeAndGetData() {
  throw new Error('Function not implemented.');
}
=======
>>>>>>> 2490e4843d16057d46af5fc94b95f10fd27383ec
