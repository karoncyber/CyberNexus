const lookupBtn = document.getElementById("lookup-btn");
const copyBtn = document.getElementById("copy-btn");

const ipOutput = document.getElementById("ip-output");
const warning = document.getElementById("ip-warning");


lookupBtn.addEventListener("click", async () => {

    warning.textContent = "";
    ipOutput.value = "";

    lookupBtn.textContent = "Looking up...";

    try {

        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        ipOutput.value = data.ip;

    } catch (error) {

        warning.textContent = "⚠ Could not reach the lookup service.";

    } finally {

        lookupBtn.textContent = "Get My IP";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!ipOutput.value) return;

    await navigator.clipboard.writeText(
        ipOutput.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy IP";
    }, 1500);

});
