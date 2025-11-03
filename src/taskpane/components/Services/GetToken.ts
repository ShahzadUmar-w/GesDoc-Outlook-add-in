import { createNestablePublicClientApplication } from "@azure/msal-browser";

let pca = undefined;
Office.onReady(async (info) => {
    if (info.host) {
        // Initialize the public client application
        pca = await createNestablePublicClientApplication({
            auth: {
                clientId: "19d9f798-2dfb-479f-8a62-74a0afcfdfea",//53937699-2c7c-4f49-bf73-8ccbf4a3c1f6
                authority: "https://login.microsoftonline.com/common"
            },
        });
    }
});


export async function Login_Function() {
    // Specify minimum scopes needed for the access token.
    const tokenRequest = {
        scopes: ["Files.Read", "User.Read", "openid", "profile","Mail.Read" ],
    };
    let accessToken = null;


    try {
        console.log("Trying to acquire token silently...");
        const userAccount = await pca.acquireTokenSilent(tokenRequest);
        console.log("Acquired token silently.");
        accessToken = userAccount.accessToken;
        return accessToken
    } catch (error) {
        console.log(`Unable to acquire token silently: ${error}`);
    }

    if (accessToken === null) {
        // Acquire token silent failure. Send an interactive request via popup.
        try {
            console.log("Trying to acquire token interactively...");
            const userAccount = await pca.acquireTokenPopup(tokenRequest);
            console.log("Acquired token interactively.");
            accessToken = userAccount.accessToken;
            return accessToken
        } catch (popupError) {
            // Acquire token interactive failure.
            console.log(`Unable to acquire token interactively: ${popupError}`);
        }
    }

    // Log error if both silent and popup requests failed.
    if (accessToken === null) {
        console.error(`Unable to acquire access token.`);
        return;
    }


}