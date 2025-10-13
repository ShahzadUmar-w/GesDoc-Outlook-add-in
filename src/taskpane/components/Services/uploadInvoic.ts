export async function uploadInvoice(invoiceFile: File, username: string) {


  const formData = new FormData();
  formData.append("username", username);
  formData.append("file", invoiceFile);

  try {
    console.log("Starting upload...");
let servername = localStorage.getItem("servername") // "https://demo.gesdoc.com";
    const response = await fetch(`${servername}/APIv3/upload_api_fac.php`, {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", response.status);

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    let result: any;
    if (responseText.trim()) {
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        if (response.ok) {
          result = { message: "Non-JSON response", raw: responseText.substring(0, 200) + "..." };
        } else {
          throw new Error(`Server returned non-JSON: ${responseText.substring(0, 100)}`);
        }
      }
    } else {
      result = { message: "Empty response from server" };
    }

    // ✅ Return something usable to the caller
    return { ok: response.ok, status: response.status, data: result };
  } catch (error: any) {
      console.error("Upload error:", error);

    // Return error in consistent format
    return { ok: false, error: error.message };
  }
}
