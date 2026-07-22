const cspInput = document.getElementById("csp-input");
const analyzeBtn = document.getElementById("analyze-btn");

const results = document.getElementById("csp-results");
const warnings = document.getElementById("warnings");


function addResult(label, value) {

    const row = document.createElement("div");

    row.className = "result-row";

    const labelSpan = document.createElement("span");
    const valueSpan = document.createElement("span");

    labelSpan.textContent = label;
    valueSpan.textContent = value;

    row.appendChild(labelSpan);
    row.appendChild(valueSpan);

    results.appendChild(row);

}


function addWarning(message) {

    const item = document.createElement("li");

    item.textContent = `⚠ ${message}`;

    warnings.appendChild(item);

}


analyzeBtn.addEventListener("click", () => {

    results.innerHTML = "";
    warnings.innerHTML = "";

    const policy = cspInput.value.trim();

    if (!policy) return;

    const directives = {};

    policy.split(";").forEach(part => {

        const tokens = part.trim().split(/\s+/);

        if (!tokens[0]) return;

        directives[tokens[0]] = tokens.slice(1);

    });

    Object.entries(directives).forEach(([name, sources]) => {
        addResult(name, sources.join(" ") || "(none)");
    });

    if (!directives["default-src"]) {
        addWarning("No default-src directive set.");
    }

    if (!directives["object-src"]) {
        addWarning("No object-src directive set, allowing plugin content.");
    }

    Object.entries(directives).forEach(([name, sources]) => {

        if (sources.includes("'unsafe-inline'")) {
            addWarning(`${name} allows 'unsafe-inline'.`);
        }

        if (sources.includes("'unsafe-eval'")) {
            addWarning(`${name} allows 'unsafe-eval'.`);
        }

        if (sources.includes("*")) {
            addWarning(`${name} allows any source with '*'.`);
        }

    });

});
