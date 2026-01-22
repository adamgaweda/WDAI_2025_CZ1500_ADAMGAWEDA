document.getElementById("generate").addEventListener("click", () => {
    const minLength = parseInt(document.getElementById("minLength").value);
    const maxLength = parseInt(document.getElementById("maxLength").value);
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSpecialChars = document.getElementById("specialChars").checked;

    if (isNaN(minLength) || isNaN(maxLength) || minLength < 1 || maxLength < 1 || minLength > maxLength) {
        alert("Podaj poprawne wartości długości hasła!");
        return;
    }

    const password = generatePassword(minLength, maxLength, includeUppercase, includeNumbers, includeSpecialChars);
    alert("Wygenerowane hasło: " + password);
    password = "";
});

function generatePassword(minLength, maxLength, includeUppercase, includeNumbers, includeSpecialChars) {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    return password;
}