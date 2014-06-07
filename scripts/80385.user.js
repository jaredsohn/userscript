// ==UserScript==
// @name           	Redeem Quick - Lockerz Login
// @namespace      k0st4s
// @description     Autofills the login fields on the Lockerz.com login page.
// @include        	*lockerz.com*
// @version        	1.01
// @author         	k0st4s
// ==/UserScript==

var email = "email";
var combination = "******";

document.getElementById("email-email").value = email;
document.getElementById("password-password").value = combination;
document.getElementById("login-form").submit();