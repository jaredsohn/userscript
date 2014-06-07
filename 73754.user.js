// ==UserScript==
// @name           Lockerz Login
// @namespace      k0st4s,UNCENSORED
// @description      This baby will autofill the fields in the ptzplace login page!
// @include        http://www.lockerz.com/
// @include        *ptzplace.lockerz.com*
// ==/UserScript==

var email = "twoj email";
var combination = "twoje haslo";

document.getElementById("email-email").value = email;
document.getElementById("password-password").value = combination;
