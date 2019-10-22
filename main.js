// DOM Elements

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

console.log('haha');

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length) {
  var password = '';
  var generators = [];
  if (hasLower) generators.push(getRandomLower);
  if (hasUpper) generators.push(getRandomUpper);
  if (hasNumber) generators.push(getRandomNumber);
  if (hasSymbol) generators.push(getRandomSymbol);
  for (let i = 0; i < length; ++i) {
    if (i < generators.length) {
      password += generators[i]();
      continue;
    }
    password += generators[getRandomInt(0, generators.length - 1)]();
  }
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * charsets: 0-9: 48-57, A-Z: 65-90, a-z: 97-122, 
 */

function getRandomInt(minInclude, maxInclude) {
  const min = Math.ceil(minInclude);
  const max = Math.floor(maxInclude);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLower() {
  return String.fromCharCode(getRandomInt(97, 122));
}

function getRandomUpper() {
  return String.fromCharCode(getRandomInt(65, 90));
}

function getRandomNumber() {
  return String.fromCharCode(getRandomInt(48, 57));
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[getRandomInt(0, symbols.length - 1)];
}