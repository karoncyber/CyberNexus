const hashInput =
    document.getElementById("hash-input");

const hashOutput =
    document.getElementById("hash-output");

const algorithm =
    document.getElementById("algorithm");

const warning =
    document.getElementById("algorithm-warning");

const generateBtn =
    document.getElementById("generate-btn");

const copyBtn =
    document.getElementById("copy-btn");


algorithm.addEventListener("change", () => {

    if (algorithm.value === "SHA-1") {

        warning.textContent =
            "⚠ SHA-1 is deprecated for security-sensitive use.";

    } else {

        warning.textContent = "";

    }

});


async function generateHash() {

    const text = hashInput.value;

    if (!text) {

        hashOutput.value = "";

        return;

    }

    const data =
        new TextEncoder().encode(text);

    const hashBuffer =
        await crypto.subtle.digest(
            algorithm.value,
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    const hash =
        hashArray
            .map(byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");

    hashOutput.value = hash;

}


generateBtn.addEventListener(
    "click",
    generateHash
);


copyBtn.addEventListener(
    "click",
    async () => {

        if (!hashOutput.value) return;

        await navigator.clipboard.writeText(
            hashOutput.value
        );

        copyBtn.textContent = "Copied!";

        setTimeout(() => {

            copyBtn.textContent =
                "Copy Hash";

        }, 1500);

    }
);