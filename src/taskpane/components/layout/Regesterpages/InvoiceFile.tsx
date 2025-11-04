import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadInvoice } from "../../Services/uploadInvoic";

const InvoiceFile = () => {
  const [emailInput, setEmailInput] = useState("");
  const [mailAttachments, setMailAttachments] = useState<any[]>([]);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  // --- Fetch email data from Outlook
  useEffect(() => {
    const initialize = async () => {
      try {
        if (!Office?.context?.mailbox?.item) {
          toast.error("Please open this add-in inside Outlook.");
          setIsLoading(false);
          return;
        }

        const item = Office.context.mailbox.item;
        const sender = item.sender?.emailAddress || "Unknown sender";
        setEmailInput(sender);

        const attachments = item.attachments?.map((att: any) => ({
          id: att.id,
          name: att.name,
        })) || [];

        setMailAttachments(attachments);
      } catch (err) {
        console.error("Error fetching Outlook data:", err);
        toast.error("Failed to load email data.");
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  // --- Get file content for selected Anexo da fatura
  const getAttachmentFile = async (attachment: any): Promise<File | null> => {
    return new Promise((resolve, reject) => {
      Office.context.mailbox.item.getAttachmentContentAsync(attachment.id, async (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          reject(result.error);
          return;
        }

        const { content, format } = result.value;
        try {
          let fileBlob: Blob;
          if (format === Office.MailboxEnums.AttachmentContentFormat.Base64) {
            const byteChars = atob(content);
            const byteNumbers = new Array(byteChars.length);
            for (let i = 0; i < byteChars.length; i++) {
              byteNumbers[i] = byteChars.charCodeAt(i);
            }
            fileBlob = new Blob([new Uint8Array(byteNumbers)]);
          } else if (format === Office.MailboxEnums.AttachmentContentFormat.Url) {
            const response = await fetch(content);
            fileBlob = await response.blob();
          } else {
            throw new Error("Unsupported attachment format");
          }

          const file = new File([fileBlob], attachment.name, { type: "application/octet-stream" });
          resolve(file);
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  // --- Handle upload
  const handleRegisterClick = async () => {
    if (!selectedAttachment) {
      toast.warn("Please select an invoice file first.");
      return;
    }

    try {
      setUploading(true);
      toast.info("Processando ficheiro da fatura...");

      const file = await getAttachmentFile(selectedAttachment);
      if (!file) {
        toast.error("Unable to fetch the selected attachment.");
        setUploading(false);
        return;
      }

      const username = localStorage.getItem("username") 
      toast.info("A carregar fatura para o GesDoc...");

      const response = await uploadInvoice(file, username);

      if (response?.ok) {
        toast.success("Fatura carregada com sucesso!");
        console.log("Upload response:", response);
      } else {
        toast.error(`${response?.error}:Check server url and usename and try again.`);
        console.error("Upload error:", response);
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  // --- Loading state
  if (isLoading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading email details...</Typography>
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
        Registar Fatura
      </Typography>

      {/* Sender */}
      <Input value={emailInput} readOnly fullWidth sx={{ mb: 3 }} />

      {/* Attachment dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Anexo da fatura</InputLabel>
        <Select
          value={selectedAttachment ? selectedAttachment.id : ""}
          label="Anexo da fatura"
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

      {/* Upload button */}
      <Button
        variant="contained"
        color="success"
        fullWidth
        size="large"
        startIcon={<ReceiptLongIcon />}
        endIcon={uploading ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
        onClick={handleRegisterClick}
        disabled={uploading}
        sx={{ py: 1.5 }}
      >
        {uploading ? "Uploading..." : "REGISTAR FATURA"}
      </Button>

      {/* Info */}
      <Box mt={4} color="text.secondary" fontSize={13}>
        <Typography variant="body2">Isto irá copiar o ficheiro da fatura selecionado para o GesDoc.</Typography>
        {/* <Typography variant="body2" mt={1}>
          Example filenames:
        </Typography>
        <code>your_email--date--time.pdf</code> */}
      </Box>

      <ToastContainer position="bottom-center" />
    </Box>
  );
};

export default InvoiceFile;
