const jwtInput = document.getElementById("jwt-input");
const decodeBtn = document.getElementById("decode-btn");

const jwtHeader = document.getElementById("jwt-header");
const jwtPayload = document.getElementById("jwt-payload");

const warning = document.getElementById("jwt-warning");
const expiryText = document.getElementById("jwt-expiry");


function base64UrlDecode(segment) {

    const padded =
        segment.replace(/-/g, "+").replace(/_/g, "/")
            .padEnd(segment.length + (4 - segment.length % 4) % 4, "=");

    const binary = atob(padded);

    const bytes =
        Uint8Array.from(binary, char => char.charCodeAt(0));

    return new TextDecoder().decode(bytes);

}


decodeBtn.addEventListener("click", () => {

    const token = jwtInput.value.trim();

    warning.textContent = "";
    expiryText.textContent = "";

    jwtHeader.value = "";
    jwtPayload.value = "";

    const parts = token.split(".");

    if (parts.length !== 3) {

        warning.textContent = "⚠ This does not look like a valid JWT.";
        return;

    }

    try {

        const header = JSON.parse(base64UrlDecode(parts[0]));
        const payload = JSON.parse(base64UrlDecode(parts[1]));

        jwtHeader.value = JSON.stringify(header, null, 2);
        jwtPayload.value = JSON.stringify(payload, null, 2);

        if (payload.exp) {

            const expiresAt = new Date(payload.exp * 1000);
            const isExpired = expiresAt.getTime() < Date.now();

            expiryText.textContent =
                isExpired
                    ? `⚠ Token expired on ${expiresAt.toLocaleString()}`
                    : `Token valid until ${expiresAt.toLocaleString()}`;

        }

        warning.textContent = "⚠ Signature not verified. Decoding only.";

    } catch (error) {

        warning.textContent = "⚠ Could not decode this token.";

    }

});
