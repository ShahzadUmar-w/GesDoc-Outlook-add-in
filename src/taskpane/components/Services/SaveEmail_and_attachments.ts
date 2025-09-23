import { responsiveFontSizes } from '@mui/material';
import React from 'react'

export const SaveEmail_and_attachments = async (EMLFile: File, callback) => {


    if (!EMLFile) {
        console.log("Please select a main file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("username", "luis.barata"); // required
    formData.append("file", EMLFile); // required main file

    // optional attachments if selected


    try {
        const response = await fetch(
            "http://ambilital.beiranet.pt:6363/APIv3/upload_api_doc.php",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        callback(result, null)
    } catch (error) {

        callback(null, error)
    }


}

