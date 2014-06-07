// ==UserScript==
// @name Google accounts auto sign in
// @description Automatically sign in to google accounts
// @include https://*.google.com/accounts/*
// @include https://www.google.com/accounts/*
// @version 1.0
// ==/UserScript==

//add event listener to call my anonymous function after the page loads
window.addEventListener('load',
function() {
//Get email address box and fill it
document.getElementById("Email").value = "USERNAME_HERE";

//Get password box and fill it
document.getElementById("Passwd").value = "PASSWORD_HERE";

//And finally submit the form
document.getElementById("gaia_loginform").submit();
}, true);
