const ipInput = document.getElementById("ip-input");
const cidrInput = document.getElementById("cidr-input");

const calculateBtn = document.getElementById("calculate-btn");
const warning = document.getElementById("subnet-warning");
const results = document.getElementById("subnet-results");


function ipToInt(ip) {

    const parts = ip.split(".").map(Number);

    if (
        parts.length !== 4 ||
        parts.some(part => Number.isNaN(part) || part < 0 || part > 255)
    ) {
        return null;
    }

    return (
        (parts[0] << 24) |
        (parts[1] << 16) |
        (parts[2] << 8) |
        parts[3]
    ) >>> 0;

}


function intToIp(int) {

    return [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255
    ].join(".");

}


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


calculateBtn.addEventListener("click", () => {

    warning.textContent = "";
    results.innerHTML = "";

    const ip = ipInput.value.trim();
    const cidr = Number(cidrInput.value);

    const ipInt = ipToInt(ip);

    if (ipInt === null) {
        warning.textContent = "⚠ Enter a valid IPv4 address.";
        return;
    }

    if (Number.isNaN(cidr) || cidr < 0 || cidr > 32) {
        warning.textContent = "⚠ CIDR must be between 0 and 32.";
        return;
    }

    const maskInt =
        cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;

    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;

    addResult("Network Address", intToIp(networkInt));
    addResult("Broadcast Address", intToIp(broadcastInt));
    addResult("Subnet Mask", intToIp(maskInt));
    addResult("Wildcard Mask", intToIp(~maskInt >>> 0));
    addResult("Total Addresses", totalHosts.toLocaleString());
    addResult("Usable Hosts", usableHosts.toLocaleString());

    if (usableHosts > 0) {
        addResult("First Usable Host", intToIp(networkInt + 1));
        addResult("Last Usable Host", intToIp(broadcastInt - 1));
    }

});
