const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}\\|;:'\",.<>/?";
let passwords = [];

function generatePassword() {
  const length = document.getElementById("length").value;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;
  const socialNetwork = document.getElementById("social-network").value;

  let charSet = "";
  if (includeLowercase) {
    charSet += lowercaseChars;
  }
  if (includeUppercase) {
    charSet += uppercaseChars;
  }
  if (includeNumbers) {
    charSet += numberChars;
  }
  if (includeSymbols) {
    charSet += symbolChars;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }

  passwords.push({ socialNetwork, password });

  document.getElementById("password").value = password;
  document.getElementById("export").style.display = "inline";
}

function exportToExcel() {
  const worksheetName = "Contraseñas";
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(passwords);
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

  const fileName = "contraseñas.xlsx";
  XLSX.writeFile(workbook, fileName);
}

document.getElementById("generate").addEventListener("click", generatePassword);
document.getElementById("export").addEventListener("click", exportToExcel);
