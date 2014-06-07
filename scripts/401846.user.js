// ==UserScript==
// @name         Disable password masking
// @description  This user script disables the masking of passwords in password fields when they have the focus and changes their text color to the “plum” CSS color (light purple).
// @grant        none
// @include      *
// @namespace    https://userscripts.org/users/599176
// ==/UserScript==

function transformToTextField(inputField) {
	inputField.style.color = 'plum';
	inputField.type = 'text'
}

function transformToPasswordField(inputField) {
	inputField.style.color = 'inherit';
	inputField.type = 'password'
}

for (var inputField of document.querySelectorAll('input[type=password], input[type=Password], input[type=PASSWORD]')) {
	inputField.addEventListener('focus', function() {transformToTextField(this)})
	inputField.addEventListener('blur', function() {transformToPasswordField(this)})
}