// ==UserScript==
// @name           	Redeem Quick - Ptzplace
// @namespace      k0st4s
// @description     Autofills the login fields on the http://www.redeemquick.com/welcome.php login page.
// @include        	*Redeemquick.com/welcome.php*
// @version        	1.01
// @author         	k0st4s
// ==/UserScript==

var email = "szevalama@lol.hu";
var combination = "jelszo123teszt";

document.getElementById("email-email").value = email;
document.getElementById("password-password").value = combination;
document.getElementById("login-form").submit();