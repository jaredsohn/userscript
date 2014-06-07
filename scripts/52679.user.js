// ==UserScript==
// @name           Gmail login
// @namespace      Gmail
// @include        https://www.google.com/accounts/ServiceLogin?service=mail*
// ==/UserScript==

// This script will log you in to Gmail automatically
// In GM, add an user script for https://www.google.com/accounts/ServiceLogin?service=mail*
// Copy and paste this script for the new entry. Be sure to change the user name and
// password to your credentials.

window.addEventListener("load",function() {
	document.getElementById("Email").value = "your_gmail_username"
	document.getElementById("Passwd").select()
	document.getElementById("Passwd").value = "your_password"
	document.getElementById("gaia_loginform").submit()
},true)
