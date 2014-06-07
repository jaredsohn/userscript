// ==UserScript==
// @name          Lockerz Login
// @description   Autologin para o lockerz
// @include       http://*.lockerz.com/*
// @version       1.0.0
// @author        Luigy
// ==/UserScript==

var id = ""; //Coloque seu email aqui.
var pass ="";//coloque sua senha aqui.

function $(a) {
    return document.getElementById(a);
}

var email = $("email-email");
if (email) {
	email.value = id;
}

var password = $("password-password");
if (password) {
	password.value =pass;
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

if ($("loginForm")) {
if (!$("notThisWave")) {
	$("loginForm").submit();
}
}

if ($("login-form")) {
	$("login-form").submit();
}