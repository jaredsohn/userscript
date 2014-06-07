// ==UserScript==
// @name           Lockerz Auto Log In
// @namespace      
// @description    Aulo Logador do lockerz :D
// @include        http://www.lockerz.com/
// @include        http://www.ptzplace.lockerz.com/*
// @version        1
// @author         Luiz Henrique Aliatti
// ==/UserScript==

//-------------------------------------------------------
var id = "SEU E-MAIL AQUI;			//Email		-
var pass = "SUA SENHA AQUI";			//Password	-
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