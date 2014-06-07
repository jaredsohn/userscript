// ==UserScript==
// @name           Lockerz Login
// @namespace      Pulkit
// @description      This baby will autofill the fields in the ptzplace login page!
// @include        http://www.lockerz.com/
// @include        *ptzplace.lockerz.com*
// @include        *lockerztest.pulkitmadan.com*
// ==/UserScript==

var email = "email";
var combination = "password";

document.getElementById("email-email").value = email;
document.getElementById("password-password").value = combination;