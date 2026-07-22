const passwordInput = document.getElementById("password-input");

const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

const lengthCheck = document.getElementById("length-check");
const uppercaseCheck = document.getElementById("uppercase-check");
const numberCheck = document.getElementById("number-check");
const symbolCheck = document.getElementById("symbol-check");

const warnings = document.getElementById("warnings");
const showPassword = document.getElementById("show-password");


function addWarning(message) {

    const item = document.createElement("li");

    item.textContent = `⚠ ${message}`;

    warnings.appendChild(item);

}


showPassword.addEventListener("change", () => {

    passwordInput.type =
        showPassword.checked
            ? "text"
            : "password";

});


passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    let score = 0;

    warnings.innerHTML = "";


    if (hasLength) score += 20;
    if (password.length >= 12) score += 15;
    if (password.length >= 16) score += 15;

    if (hasUppercase) score += 15;
    if (hasNumber) score += 15;
    if (hasSymbol) score += 20;


    const repeatedChars = /(.)\1{2,}/.test(password);

    if (repeatedChars) {

        score -= 20;

        addWarning(
            "Repeated characters detected."
        );

    }


    const commonSequences = [
        "1234",
        "2345",
        "3456",
        "4567",
        "5678",
        "6789",
        "9876",
        "8765",
        "7654",
        "6543",
        "5432",
        "4321"
    ];

    if (
        commonSequences.some(sequence =>
            password.includes(sequence)
        )
    ) {

        score -= 15;

        addWarning(
            "Sequential numbers detected."
        );

    }


    const keyboardPatterns = [
        "qwerty",
        "asdf",
        "zxcv",
        "qwert",
        "12345"
    ];

    if (
        keyboardPatterns.some(pattern =>
            password.toLowerCase().includes(pattern)
        )
    ) {

        score -= 20;

        addWarning(
            "Keyboard pattern detected."
        );

    }


    const commonPasswords = [
        "password",
        "password123",
        "admin",
        "welcome",
        "letmein",
        "qwerty",
        "123456",
        "12345678"
    ];

    if (
        commonPasswords.includes(
            password.toLowerCase()
        )
    ) {

        score -= 50;

        addWarning(
            "Common password detected."
        );

    }


    score = Math.max(score, 0);
    score = Math.min(score, 100);


    lengthCheck.textContent =
        `${hasLength ? "✔" : "✖"} At least 8 characters`;

    uppercaseCheck.textContent =
        `${hasUppercase ? "✔" : "✖"} Uppercase letter`;

    numberCheck.textContent =
        `${hasNumber ? "✔" : "✖"} Number`;

    symbolCheck.textContent =
        `${hasSymbol ? "✔" : "✖"} Symbol`;


    strengthBar.style.width = `${score}%`;


    if (score < 20) {

        strengthText.textContent = "Strength: Weak";

    } else if (score < 40) {

        strengthText.textContent = "Strength: Fair";

    } else if (score < 60) {

        strengthText.textContent = "Strength: Good";

    } else if (score < 80) {

        strengthText.textContent = "Strength: Strong";

    } else {

        strengthText.textContent = "Strength: Very Strong";

    }


    if (password.length === 0) {

        strengthBar.style.width = "0%";
        strengthText.textContent = "Strength: N/A";

        warnings.innerHTML = "";

    }

});