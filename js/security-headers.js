const headersInput = document.getElementById("headers-input");
const analyzeBtn = document.getElementById("analyze-btn");

const headerChecks = document.getElementById("header-checks");
const warnings = document.getElementById("warnings");


const securityHeaders = [
    {
        name: "Content-Security-Policy",
        description: "Restricts sources of scripts, styles, and other content."
    },
    {
        name: "Strict-Transport-Security",
        description: "Forces browsers to use HTTPS."
    },
    {
        name: "X-Frame-Options",
        description: "Protects against clickjacking."
    },
    {
        name: "X-Content-Type-Options",
        description: "Prevents MIME type sniffing."
    },
    {
        name: "Referrer-Policy",
        description: "Controls how much referrer information is sent."
    },
    {
        name: "Permissions-Policy",
        description: "Restricts access to browser features."
    }
];


function parseHeaders(text) {

    const headers = {};

    text.split("\n").forEach(line => {

        const separatorIndex = line.indexOf(":");

        if (separatorIndex === -1) return;

        const name = line.slice(0, separatorIndex).trim().toLowerCase();
        const value = line.slice(separatorIndex + 1).trim();

        if (name) headers[name] = value;

    });

    return headers;

}


function addWarning(message) {

    const item = document.createElement("li");

    item.textContent = `⚠ ${message}`;

    warnings.appendChild(item);

}


analyzeBtn.addEventListener("click", () => {

    headerChecks.innerHTML = "";
    warnings.innerHTML = "";

    const headers = parseHeaders(headersInput.value);

    securityHeaders.forEach(header => {

        const present = header.name.toLowerCase() in headers;

        const item = document.createElement("li");

        item.textContent =
            `${present ? "✔" : "✖"} ${header.name} — ${header.description}`;

        headerChecks.appendChild(item);

    });

    const csp = headers["content-security-policy"];

    if (csp && csp.includes("unsafe-inline")) {
        addWarning("Content-Security-Policy allows 'unsafe-inline'.");
    }

    if (csp && csp.includes("unsafe-eval")) {
        addWarning("Content-Security-Policy allows 'unsafe-eval'.");
    }

    const xFrame = headers["x-frame-options"];

    if (xFrame && !["deny", "sameorigin"].includes(xFrame.toLowerCase())) {
        addWarning("X-Frame-Options has an unusual value.");
    }

    if (
        headers["set-cookie"] &&
        !headers["set-cookie"].toLowerCase().includes("secure")
    ) {
        addWarning("Set-Cookie header is missing the Secure attribute.");
    }

});
