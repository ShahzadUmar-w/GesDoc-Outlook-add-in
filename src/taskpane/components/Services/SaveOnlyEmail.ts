import React from 'react';

interface UploadResult {
  success: boolean;
  message?: string;
  status?: number;
  rawResponse?: string;
  [key: string]: any;
}

/**
 * Uploads an email file with optional attachments to the API
 * @param EMLFile Main email file (required)
 * @param attachments Optional attachments as array of Files
 * @param username API username (default: "luis.barata")
 * @param callback Callback(result, error)
 */
export const SaveOnlyEmail = async (
  EMLFile: File,
  username: string = "luis.barata",
  callback: (result: any | null, error: any | null) => void
) => {
  if (!EMLFile) {
    callback(null, new Error("Main file is required."));
    return;
  }
  const formData = new FormData();
  formData.append("username", username);
  formData.append("file", EMLFile);



  try {
    const response = await fetch("https://gesdoc.beiranet.pt/APIv3/upload_api_doc.php", {
      method: "POST",
      body: formData
    });

    const responseText = await response.json();

    let result: UploadResult;
    if (!response.ok) {
      result = {
        success: false,
        message: `Server returned ${response.status}: ${response.statusText}`,
        rawResponse: responseText,
        status: response.status
      };
    } else {
      try {
        result = JSON.parse(responseText);
      } catch {
        result = {
          success: false,
          message: "Server returned invalid JSON",
          rawResponse: responseText,
          status: response.status
        };
      }
    }

    callback('Uploaded', null);
  } catch (error) {
    callback(null, error);
  }
};
