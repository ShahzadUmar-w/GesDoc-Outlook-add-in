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

  const navigate = useNavigate();

  // Load email + attachments
  useEffect(() => {
    const initializeOfficeAndGetData = async () => {
      try {
        if (Office?.context?.mailbox?.item) {
          const item = Office.context.mailbox.item;

          const senderEmail = item.sender?.emailAddress || "Unknown Sender";
          setEmailInput(senderEmail);

          const attachments = item.attachments || [];
          const formatted = attachments.map((att) => ({
            id: att.id,
            name: att.name,
          }));
          setMailAttachments(formatted);
        } else {
          setToast({
            open: true,
            message: "Please open this add-in inside Outlook.",
            severity: "error",
          });
        }
      } catch (err) {
        console.error("Office initialization error:", err);
        setToast({
          open: true,
          message: "Failed to load email data.",
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
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
  );
};

export default InvoiceFile;
