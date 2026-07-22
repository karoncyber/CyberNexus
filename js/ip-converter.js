const ipInput = document.getElementById("ip-input");
const convertBtn = document.getElementById("convert-btn");

const warning = document.getElementById("ip-warning");
const results = document.getElementById("ip-results");


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


convertBtn.addEventListener("click", () => {

    warning.textContent = "";
    results.innerHTML = "";

    const parts = ipInput.value.trim().split(".").map(Number);

    if (
        parts.length !== 4 ||
        parts.some(part => Number.isNaN(part) || part < 0 || part > 255)
    ) {
        warning.textContent = "⚠ Enter a valid IPv4 address.";
        return;
    }

    const decimal =
        (parts[0] * 16777216) +
        (parts[1] * 65536) +
        (parts[2] * 256) +
        parts[3];

    const binary =
        parts.map(part => part.toString(2).padStart(8, "0")).join(".");

    const hex =
        parts.map(part => part.toString(16).padStart(2, "0")).join(".");

    addResult("Decimal (32-bit)", decimal);
    addResult("Binary", binary);
    addResult("Hexadecimal", hex);

});
