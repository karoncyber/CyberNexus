const encodeBtn = document.getElementById("encode-btn");
const decodeBtn = document.getElementById("decode-btn");

const convertBtn = document.getElementById("convert-btn");
const copyBtn = document.getElementById("copy-btn");

const urlInput = document.getElementById("url-input");
const urlOutput = document.getElementById("url-output");
const fullUri = document.getElementById("full-uri");
const warning = document.getElementById("url-warning");

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


convertBtn.addEventListener("click", () => {

    const text = urlInput.value;

    warning.textContent = "";

    if (!text) {
        urlOutput.value = "";
        return;
    }

    try {

        if (mode === "encode") {

            urlOutput.value =
                fullUri.checked
                    ? encodeURI(text)
                    : encodeURIComponent(text);

        } else {

            urlOutput.value =
                fullUri.checked
                    ? decodeURI(text)
                    : decodeURIComponent(text);

        }

    } catch (error) {

        urlOutput.value = "";
        warning.textContent = "⚠ Invalid input for the selected mode.";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!urlOutput.value) return;

    await navigator.clipboard.writeText(
        urlOutput.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy Result";
    }, 1500);

});
