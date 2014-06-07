// ==UserScript==
// @name           [MDA] Lockerz Auto Log In
// @namespace      [MDA]
// @description    [MDA] Lockerz Auto Log In
// @include        http://www.lockerz.com/
// @include        http://www.ptzplace.lockerz.com/*
// @version        1.1 RTW
// @author         John - iGenius|MDA
// ==/UserScript==

//-------------------------------------------------------
var id = "Email";			//Email		-
var pass = "Password";			//Password	-
//-------------------------------------------------------

//-------------------------------------
function $(a) {
    return document.getElementById(a);
}
var email = $("email-email");
if (email) {
	email.value = id;
}
var password = $("password-password");
if (password) {
	password.value = pass;
}
var emailptz = $("email");
if (emailptz) {
	emailptz.value = id;
}
var passptz = $("combination");
if (passptz) {
	passptz.value = pass;
	passptz.type = "password";
}
if ($("login-form")) {
	$("login-form").submit();
}
//-------------------------------------