// ==UserScript==
// @name           AutoLockerz
// @namespace      DeKy
// @include        http://ptzplace.lockerz.com/*
// @include        http://www.lockerz.com/*
// ==/UserScript==


// Login Sia Su Lockerz Che Su PTZ Place

var id = "EMAIL"; 
var pass ="PASSWORD";

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

// Auto Fill Redeem Con Preselezione Captcha

var deee= "IT";

document.forms[0].elements[0].value = "NOME";
document.forms[0].elements[1].value = "COGNOME";
document.forms[0].elements[2].value = "VIA";
document.forms[0].elements[3].value = "";
document.forms[0].elements[4].value = "CITTA";
document.forms[0].elements[5].value = "IT";
document.forms[0].elements[6].value = "CAP";
document.forms[0].elements[10].value = "0039+TELEFONO";
document.forms[0].elements[11].value = "Italy";

document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = "Italy";
document.getElementById("_countryDetails").value = "Italy";
window.location= "javascript: manipulateForm('"+deee+"');";void(0);
document.getElementById('recaptcha_response_field').focus();