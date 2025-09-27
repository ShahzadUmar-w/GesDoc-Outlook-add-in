import React from 'react';
import { Login_Function } from './GetToken';

export const Get_Email_file = async () => {
    try {
        const token = await Login_Function();
        const ewsItemId = Office.context.mailbox.item.itemId;

        const itemId = Office.context.mailbox.convertToRestId(
            ewsItemId,
            Office.MailboxEnums.RestVersion.v2_0
        );

        const graphMessageUrl = `https://graph.microsoft.com/v1.0/me/messages/${itemId}/$value`;

        const response = await fetch(graphMessageUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get raw MIME content as blob
        const blob = await response.blob();

        // Force MIME type for .eml
        const emlBlob = new Blob([blob], { type: 'message/rfc822' });

        // Download as .eml
        const url = window.URL.createObjectURL(emlBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'email.eml';
        document.body.appendChild(a);
        a.click();
        a.remove();

        console.log('Email saved as .eml');
    } catch (err) {
        console.error('Error occurred:', err);
    }
};
