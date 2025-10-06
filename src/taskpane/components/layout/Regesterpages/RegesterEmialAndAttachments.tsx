

// import {
//   Button,
//   IconButton,
//   Input,
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   Checkbox,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { SaveEmail_and_attachments } from "../../Services/SaveEmail_and_attachments";
// import { Get_Email_file } from "../../Services/Get_Email_file";

// const RegisterEmailAndAttachments = () => {
//   const [emailInput, setEmailInput] = useState("");
//   const [mailAttachments, setMailAttachments] = useState<
//     { id: string; name: string; isChecked: boolean }[]
//   >([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeOfficeAndGetData = async () => {
//       try {
//         if (
//           typeof Office !== "undefined" &&
//           Office.context?.mailbox?.item
//         ) {
//           const item = Office.context.mailbox.item;

//           // Sender email
//           const senderEmail = item.sender?.emailAddress || "Unknown Sender";
//           setEmailInput(senderEmail);

//           // Attachments
//           const attachments = item.attachments || [];
//           const formattedAttachments = attachments.map((att) => ({
//             id: att.id,
//             name: att.name,
//             isChecked: false,
//           }));
//           setMailAttachments(formattedAttachments);
//         } else {
//           setError("Office context not detected. Please run inside Outlook.");
//         }
//       } catch (err) {
//         console.error("Error loading Office data:", err);
//         setError("Failed to load email data.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeOfficeAndGetData();
//   }, []);

//   const handleAttachmentChange = (attachmentId: string) => {
//     setMailAttachments((prev) =>
//       prev.map((att) =>
//         att.id === attachmentId ? { ...att, isChecked: !att.isChecked } : att
//       )
//     );
//   };

//   const handleSaveClick = async () => {
//     try {
//       setUploading(true);
//       setError(null);

//       if (!Office.context?.mailbox?.item) {
//         setError("Not running inside Outlook.");
//         setUploading(false);
//         return;
//       }

//       // Get main email file (.eml)
//       const mainEmailFile = await Get_Email_file();

//       // Get selected attachments
//       const selectedAttachments = mailAttachments.filter((a) => a.isChecked);

//       // Convert selected attachments to File objects
//       const attachmentFiles: File[] = [];

//       for (const att of selectedAttachments) {
//         const content = await new Promise<string>((resolve, reject) => {
//           Office.context.mailbox.item.getAttachmentContentAsync(
//             att.id,
//             (result) => {
//               if (result.status === Office.AsyncResultStatus.Succeeded) {
//                 resolve(result.value.content);
//               } else {
//                 reject(result.error);
//               }
//             }
//           );
//         });

//         // Convert base64 string to File
//         const byteArray = Uint8Array.from(atob(content), (c) =>
//           c.charCodeAt(0)
//         );
//         const blob = new Blob([byteArray], { type: "application/octet-stream" });
//         const file = new File([blob], att.name);
//         attachmentFiles.push(file);
//       }

//       console.log("Uploading:", {
//         email: mainEmailFile.name,
//         attachments: attachmentFiles.map((f) => f.name),
//       });

//       // Upload email + attachments
//       await SaveEmail_and_attachments(
//         mainEmailFile,
//         attachmentFiles,
//         "luis.barata",
//         (result, err) => {
//           if (err) {
//             console.error("Upload failed:", err);
//             setError("Upload failed. Check console for details.");
//           } else {
//             console.log("Upload successful:", result);
//             alert("Email and attachments uploaded successfully!");
//           }
//         }
//       );
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while saving attachments.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <Box textAlign="center" mt={5}>
//         <CircularProgress />
//         <p>Loading email data...</p>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box textAlign="center" mt={5} color="red">
//         <p>{error}</p>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 2, position: "relative" }}>
//       {/* Back button */}
//       <IconButton
//         sx={{ position: "absolute", top: 8, left: 8 }}
//         onClick={() => navigate("/main")}
//       >
//         <ArrowBackIcon />
//       </IconButton>

//       {/* Logo */}
//       <Box
//         component="img"
//         src={require("../../../../../assets/logo-filled.png")}
//         sx={{ width: 150, display: "block", mx: "auto", mb: 2 }}
//       />

//       {/* Email input */}
//       <Input
//         value={emailInput}
//         readOnly
//         fullWidth
//         sx={{ mb: 3 }}
//         placeholder="Sender email"
//       />

//       {/* Attachments list */}
//       <List sx={{ width: "100%", bgcolor: "background.paper" }}>
//         {mailAttachments.length > 0 ? (
//           mailAttachments.map((att) => (
//             <ListItem key={att.id} disablePadding>
//               <ListItemButton onClick={() => handleAttachmentChange(att.id)}>
//                 <ListItemIcon>
//                   <Checkbox checked={att.isChecked} />
//                 </ListItemIcon>
//                 <ListItemText primary={att.name} />
//                 <InsertDriveFileIcon sx={{ color: "skyblue" }} />
//               </ListItemButton>
//             </ListItem>
//           ))
//         ) : (
//           <p>No attachments found.</p>
//         )}
//       </List>

//       {/* Upload button */}
//       <Button
//         fullWidth
//         variant="contained"
//         color="secondary"
//         startIcon={<AttachFileIcon />}
//         endIcon={<ArrowForwardIcon />}
//         onClick={handleSaveClick}
//         disabled={uploading}
//         sx={{
//           mt: 3,
//           backgroundColor: "#e56100",
//           "&:hover": { backgroundColor: "#cc5100" },
//         }}
//       >
//         {uploading ? "Uploading..." : "Register Attachments"}
//       </Button>

//       {/* Info */}
//       <Box mt={3} fontSize={13} color="text.secondary">
//         <p>This will copy the email and attachments to your GesDoc.</p>
//         <p>Example filenames:</p>
//         <code>your_email--date--time.pdf</code>
//         <br />
//         <code>your_email--date--time--att1</code>
//         <br />
//         <code>your_email--date--time--att2</code>
//       </Box>
//     </Box>
//   );
// };

// export default RegisterEmailAndAttachments;












import {
  Button,
  IconButton,
  Input,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SaveEmail_and_attachments } from "../../Services/SaveEmail_and_attachments";
import { Get_Email_file } from "../../Services/Get_Email_file";

const RegisterEmailAndAttachments = () => {
  const [emailInput, setEmailInput] = useState("");
  const [mailAttachments, setMailAttachments] = useState<
    { id: string; name: string; isChecked: boolean }[]
  >([]);
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

  const handleSaveClick = async () => {
    try {
      setUploading(true);

      if (!Office.context?.mailbox?.item) {
        showSnackbar("Not running inside Outlook.", "error");
        setUploading(false);
        return;
      }

      // Get main email file (.eml)
      const mainEmailFile = await Get_Email_file();

      // Get selected attachments
      const selectedAttachments = mailAttachments.filter((a) => a.isChecked);

      if (selectedAttachments.length === 0) {
        showSnackbar("Please select at least one attachment.", "warning");
        setUploading(false);
        return;
      }

      // Convert selected attachments to File objects
      const attachmentFiles: File[] = [];

      for (const att of selectedAttachments) {
        const content = await new Promise<string>((resolve, reject) => {
          Office.context.mailbox.item.getAttachmentContentAsync(
            att.id,
            (result) => {
              if (result.status === Office.AsyncResultStatus.Succeeded) {
                resolve(result.value.content);
              } else {
                reject(result.error);
              }
            }
          );
        });

        // Convert base64 string to File
        const byteArray = Uint8Array.from(atob(content), (c) => c.charCodeAt(0));
        const blob = new Blob([byteArray], { type: "application/octet-stream" });
        const file = new File([blob], att.name);
        attachmentFiles.push(file);
      }

      console.log("Uploading:", {
        email: mainEmailFile.name,
        attachments: attachmentFiles.map((f) => f.name),
      });

      // Upload email + attachments
      await SaveEmail_and_attachments(
        mainEmailFile,
        attachmentFiles,
        "luis.barata",
        (result, err) => {
          if (err) {
            console.error("Upload failed:", err);
            showSnackbar("Upload failed. Check console for details.", "error");
          } else {
            console.log("Upload successful:", result);
            showSnackbar("Email and attachments uploaded successfully!", "success");
          }
        }
      );
    } catch (err) {
      console.error(err);
      showSnackbar("An error occurred while saving attachments.", "error");
    } finally {
      setUploading(false);
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

      {/* Upload button */}
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<AttachFileIcon />}
        endIcon={<ArrowForwardIcon />}
        onClick={handleSaveClick}
        disabled={uploading}
        sx={{
          mt: 3,
          backgroundColor: "#e56100",
          "&:hover": { backgroundColor: "#cc5100" },
        }}
      >
        {uploading ? "Uploading..." : "Register Attachments"}
      </Button>

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
};

export default RegisterEmailAndAttachments;
