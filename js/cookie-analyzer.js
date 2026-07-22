const cookieInput = document.getElementById("cookie-input");
const analyzeBtn = document.getElementById("analyze-btn");

const cookieChecks = document.getElementById("cookie-checks");
const warnings = document.getElementById("warnings");


function addWarning(message) {

    const item = document.createElement("li");

    item.textContent = `⚠ ${message}`;

    warnings.appendChild(item);

}


function addCheck(label) {

    const item = document.createElement("li");

    item.textContent = label;

    cookieChecks.appendChild(item);

}


analyzeBtn.addEventListener("click", () => {

    cookieChecks.innerHTML = "";
    warnings.innerHTML = "";

    const raw = cookieInput.value.trim();

    if (!raw) return;

    const attributes = raw.split(";").map(part => part.trim());

    const [nameValue, ...rest] = attributes;
    const [name, value] = nameValue.split("=");

    const flags = rest.map(part => part.toLowerCase());

    const hasSecure = flags.some(flag => flag === "secure");
    const hasHttpOnly = flags.some(flag => flag === "httponly");

    const sameSite =
        rest.find(part => part.toLowerCase().startsWith("samesite"));

    addCheck(`Name: ${name}`);
    addCheck(`Value: ${value ?? ""}`);
    addCheck(`${hasSecure ? "✔" : "✖"} Secure`);
    addCheck(`${hasHttpOnly ? "✔" : "✖"} HttpOnly`);
    addCheck(`SameSite: ${sameSite ? sameSite.split("=")[1] : "not set"}`);

    if (!hasSecure) {
        addWarning("Cookie is missing the Secure attribute.");
    }

    if (!hasHttpOnly) {
        addWarning("Cookie is missing the HttpOnly attribute.");
    }

    if (sameSite && sameSite.toLowerCase().includes("none") && !hasSecure) {
        addWarning("SameSite=None requires the Secure attribute.");
    }

    if (!sameSite) {
        addWarning("SameSite attribute is not set.");
    }

});
