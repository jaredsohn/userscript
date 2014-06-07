// ==UserScript==
// @name        SVZ: Autologin
// @description Bei jedem Besuch des Schüler- / Studi- / meinVZ werden Sie automatisch eingelogt.
// @namespace   http://www.mrgoro.de
// @include     http://www.schuelervz.net/*
// @include     http://www.studivz.net/*
// @include     http://www.meinvz.net/*
// @exclude     http://www.schuelervz.net/Logout
// @exclude     http://www.studivz.net/Logout
// @exclude     http://www.meinvz.net/Logout
// ==/UserScript==

var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var email_form = document.getElementById('Login_email');
var password_form = document.getElementById('Login_password');

GM_registerMenuCommand('Account-Informationen festlegen', setYourLogin);
GM_registerMenuCommand('Account-Informationen zurücksetzen', clearYourLogin);

if(!email_conf) {
	alert("Sie haben noch keine Login-Informationen gespeichert!");
	setYourLogin();
	location.reload();
} else {
	email_form.value = email_conf;
	password_form.value = password_conf;

	if((document.getElementById('Login_email').value.length > 0)&&(document.getElementById('Login_password').value.length > 0)) {
	    document.getElementsByName('login')[0].type = 'hidden';
	    document.forms[0].submit();
	}
}

function setYourLogin()
{
	var email_prompt = prompt('Bitte geben Sie Ihren Benutzernamen (E-Mail-Adresse) ein:', (email_conf ? email_conf : ''));
	if(email_prompt)
	{
		GM_setValue('email', email_prompt);
	
		var password_prompt = prompt('Bitte geben Sie Ihr Passwort ein:');
		if(password_prompt)
			GM_setValue('password', password_prompt);
	}
}

function clearYourLogin()
{
	GM_setValue('email', '');
	GM_setValue('password', '');
	
	alert('Ihre Daten wurde wieder gelöscht!');
}