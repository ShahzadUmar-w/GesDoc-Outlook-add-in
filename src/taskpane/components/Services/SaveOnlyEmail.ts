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
  username: string ,
  callback: (result: any | null, error: any | null) => void
) => {
  if (!EMLFile) {
    callback(null, new Error("Main file is required."));
    return;
  }
  const formData = new FormData();
  formData.append("username", username);
  formData.append("file", EMLFile);


const serverURL = localStorage.getItem('servername') // "https://gesdoc.beiranet.pt";
  try {
    const response = await fetch(`${serverURL}/APIv3/upload_api_doc.php`, {
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
          rawResponse: responseText,
          status: response.status
        };
      }
    }

    callback(responseText.message, null);
  } catch (error) {
    callback(null, error);
  }
};
