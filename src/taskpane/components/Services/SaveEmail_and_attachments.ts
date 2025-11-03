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

    const API_URL = localStorage.getItem("servername")

    const response = await fetch(`${API_URL}/APIv3/upload_api_doc.php`, {
      method: "POST",
      body: formData,
    });

    let result: any = null;

    //  Handle all possible cases safely
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

    //  Treat status 200 as success
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
