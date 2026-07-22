const encodeBtn = document.getElementById("encode-btn");
const decodeBtn = document.getElementById("decode-btn");

const convertBtn = document.getElementById("convert-btn");
const copyBtn = document.getElementById("copy-btn");

const base64Input = document.getElementById("base64-input");
const base64Output = document.getElementById("base64-output");
const warning = document.getElementById("base64-warning");

let mode = "encode";


encodeBtn.addEventListener("click", () => {

    mode = "encode";

    encodeBtn.classList.add("active");
    decodeBtn.classList.remove("active");

});


decodeBtn.addEventListener("click", () => {

    mode = "decode";

    decodeBtn.classList.add("active");
    encodeBtn.classList.remove("active");

});


function toBase64(text) {

    const bytes = new TextEncoder().encode(text);

    let binary = "";

    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);

}


function fromBase64(text) {

    const binary = atob(text);

    const bytes =
        Uint8Array.from(binary, char => char.charCodeAt(0));

    return new TextDecoder().decode(bytes);

}


convertBtn.addEventListener("click", () => {

    const text = base64Input.value;

    warning.textContent = "";

    if (!text) {
        base64Output.value = "";
        return;
    }

    try {

        base64Output.value =
            mode === "encode"
                ? toBase64(text)
                : fromBase64(text);

    } catch (error) {

        base64Output.value = "";
        warning.textContent = "⚠ Invalid input for the selected mode.";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!base64Output.value) return;

    await navigator.clipboard.writeText(
        base64Output.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy Result";
    }, 1500);

});
