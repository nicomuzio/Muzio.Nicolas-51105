// Variables de elementos del DOM
const passwordLength = document.getElementById("password-length");
const includeUppercase = document.getElementById("include-uppercase");
const includeLowercase = document.getElementById("include-lowercase");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");
const generateBtn = document.getElementById("generate-btn");
const resultBox = document.getElementById("result-box");

// Evento de clic en el botón Generar contraseña
generateBtn.addEventListener("click", function () {
  const length = parseInt(passwordLength.value);
  const uppercase = includeUppercase.checked;
  const lowercase = includeLowercase.checked;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  
  let password = generatePassword(length, uppercase, lowercase, numbers, symbols);
  
  if(password) {
    resultBox.innerHTML = `<p>Tu nueva contraseña es: <strong>${password}</strong></p>`;
    storePassword(password);
  } else {
    resultBox.innerHTML = "";
    alert("Debe seleccionar al menos una opción para generar la contraseña.");
  }
});

// Función para generar la contraseña
function generatePassword(length, uppercase, lowercase, numbers, symbols) {
  // Asegurarse de que el largo de la contraseña esté dentro del rango permitido
  if (length < 6 || length > 15) {
    alert("El largo de la contraseña debe estar entre 6 y 15 caracteres.");
    return "";
  }

  // Crear el conjunto de caracteres a utilizar para generar la contraseña
  let chars = "";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+-=[]{}\\|;:'\",.<>/?";

  // Generar la contraseña
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

// Función para almacenar la contraseña en el localStorage
function storePassword(password) {
  const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
  storedPasswords.push(password);
  localStorage.setItem("passwords", JSON.stringify(storedPasswords));
}
