// ==UserScript==
// @name           PennState AutoLogin
// @namespace      PSU
// @description    Pennsylvania State University WebAccess autologin script. Warning, password is stored in plaintext!
// @include        https://webaccess.psu.edu/*
// ==/UserScript==

var USERNAME = "abc123";  // Username
var PASSWORD = "yourpassword";  // Password

document.getElementById("login").value = USERNAME;
document.getElementById("password").value = PASSWORD;

document.forms[0].submit();