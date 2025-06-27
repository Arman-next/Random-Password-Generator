const resultSec = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperCaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("Numbers");
const symbolEl = document.getElementById("Symbols");
const clipboard = document.getElementById("copy");
const generateBtn = document.getElementById("Generate");

const randomFunc = {
  lower: getLowerCase,
  upper: getUpperCase,
  number: getNumber,
  symbol: getSymbol,
};

generateBtn.addEventListener("click", (e) => {
  const length = +lengthEl.value;
  const hasUpper = upperCaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasSymbol = symbolEl.checked;

  resultSec.innerHTML = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  );
});

clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultSec.innerText;
  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password Copied to the Clipboard");
});

function generatePassword(length, upper, lower, number, symbol) {
  let generaterdPassword = "";
  const typesCount = upper + lower + number + symbol;
  const typeArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generaterdPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generaterdPassword.slice(0, length);
  return finalPassword;
}

function getUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
  const symbol = `!@#$%^&*-_,./?`;
  return symbol[Math.floor(Math.random() * symbol.length)];
}
