const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

const passwordOutput = document.getElementById("password-output");

const lengthInput = document.getElementById("length");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const numbers =
    "0123456789";

const symbols =
    "!@#$%^&*()_+-=";
function updateStrength(password) {

    const strengthBar =
        document.getElementById("strength-bar");

    const strengthText =
        document.getElementById("strength-text");

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score === 1) {
        strengthBar.style.width = "25%";
        strengthText.textContent = "Strength: Weak";
    }

    else if (score === 2) {
        strengthBar.style.width = "50%";
        strengthText.textContent = "Strength: Fair";
    }

    else if (score === 3) {
        strengthBar.style.width = "75%";
        strengthText.textContent = "Strength: Strong";
    }

    else if (score === 4) {
        strengthBar.style.width = "100%";
        strengthText.textContent = "Strength: Very Strong";
    }
}
generateBtn.addEventListener("click", () => {

    let characters = letters;

    if (numbersCheckbox.checked) {
        characters += numbers;
    }

    if (symbolsCheckbox.checked) {
        characters += symbols;
    }

    const length = Number(lengthInput.value);

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }

    passwordOutput.value = password;
    updateStrength(password);

});

copyBtn.addEventListener("click", async () => {

    if (!passwordOutput.value) return;

    await navigator.clipboard.writeText(
        passwordOutput.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy Password";
    }, 1500);

});