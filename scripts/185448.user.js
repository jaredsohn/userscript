// ==UserScript==
// @name        My FacebookLogin
// @namespace   cs8898FacebookLogin
// @description My FacebookLogin
// @include     https://www.facebook.com/
// @version     1
// @grant       none
// ==/UserScript==

var email = ""; //Your Email Address
var pass = ""; //Your Password

document.getElementById("email").value = email;
document.getElementById("pass").value = pass;
document.getElementById("login_form").submit();