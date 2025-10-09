// import React from 'react';

// interface UploadResult {
//   success: boolean;
//   message?: string;
//   status?: number;
//   rawResponse?: string;
//   [key: string]: any;
// }

// /**
//  * Uploads an email file with optional attachments to the API
//  * @param EMLFile Main email file (required)
//  * @param attachments Optional attachments as array of Files
//  * @param username API username (default: "luis.barata")
//  * @param callback Callback(result, error)
//  */
// export const SaveEmail_and_attachments = async (
//   EMLFile: File,
//   attachments: File[] = [],
//   username: string = "luis.barata",
//   callback: (result: any | null, error: any | null) => void
// ) => {
//   if (!EMLFile) {
//     callback(null, new Error("Main file is required."));
//     return;
//   }
// console.log(attachments);

//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("file", EMLFile);

//   // Add dynamic attachments (ATT_1, ATT_2, ATT_3...)
// //   attachments.forEach((att, idx) => {
// //     formData.append(`ATT_${idx + 1}`, att);
// //   });

//   try {
//     const response = await fetch("https://gesdoc.beiranet.pt/APIv3/upload_api_doc.php", {
//       method: "POST",
//       body: formData
//     });

//     const responseText = await response.json();

//     let result: UploadResult;
//     if (!response.ok) {
//       result = {
//         success: false,
//         message: `Server returned ${response.status}: ${response.statusText}`,
//         rawResponse: responseText,
//         status: response.status
//       };
//     } else {
//       try {
//         result = JSON.parse(responseText);
//       } catch {
//         result = {
//           success: false,
//           message: "Server returned invalid JSON",
//           rawResponse: responseText,
//           status: response.status
//         };
//       }
//     }

//     callback('Uploaded', null);
//   } catch (error) {
//     callback(null, error);
//   }
// };

export async function SaveEmail_and_attachments(
  mainEmailFile: File,
  attachmentFiles: File[],
  username: string,
  callback: (result: any, error?: any) => void
) {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("file", mainEmailFile);

    // Add attachments
    attachmentFiles.forEach((att, index) => {
      formData.append(`ATT_${index + 1}`, att);
    });

    const API_URL = "https://gesdoc.beiranet.pt/APIv3/upload_api_doc.php";

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    let result: any = null;

    // ✅ Handle all possible cases safely
    try {
      const text = await response.text();
      if (text && text.trim().length > 0) {
        result = JSON.parse(text);
      } else {
        // Empty body but success response
        result = { ok: response.ok, message: "Upload completed (empty response body)" };
      }
    } catch {
      // Non-JSON or parse error
      result = { ok: response.ok, message: "Upload completed (non-JSON response)" };
    }

    // ✅ Treat status 200 as success
    if (response.ok) {
      callback(result, null);
    } else {
      callback(null, result || { message: "Upload failed", status: response.status });
    }

  } catch (error) {
    console.error("❌ Error uploading files:", error);
    callback(null, error);
  }
}
