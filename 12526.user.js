// ==UserScript==
// @name           StudiVZ: Autologin
// @description    Loggt sich automatisch beim Betreten des StudiVZ ein
// @namespace      http://www.nohomepageyet.de
// @include        http://www.studivz.net/*
// @exclude        http://www.studivz.net/logout.php*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////

const AUTOLOGIN = true;		// automatically presses the login button

////////////////////////////////////////////////////////////////////////////

var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var email_form = document.getElementById('Login_email');
var password_form = document.getElementById('Login_password');
var submit_form = document.getElementById('Login');

GM_registerMenuCommand('Account-Informationen festlegen', setAccountInformation);
GM_registerMenuCommand('Account-Informationen zurücksetzen', clearAccountInformation);

if(!email_conf && submit_form)
{
	var result = confirm('Sie haben noch keine StudiVZ-Anmeldeinformationen gespeichert. Möchten Sie dies nun vornehmen um den den Autologin-Prozess auszuführen?');
	if(result)
	{
		setAccountInformation();
		location.reload();
	}
}

if(email_conf && email_form)
	email_form.value = email_conf;

if(password_conf && password_form)
	password_form.value = password_conf;

if(AUTOLOGIN && password_conf && email_conf && email_form && password_form && submit_form)
{
	//Sumbitten haut nicht mehr hin seit dem relaunch
	//submit_form.submit();
}

function setAccountInformation()
{
	var email_prompt = prompt('Bitte geben Sie ihren StudiVZ-Benutzernamen (E-Mail-Adresse) ein:', (email_conf ? email_conf : ''));
	if(email_prompt)
	{
		GM_setValue('email', email_prompt);
	
		var password_prompt = prompt('Bitte geben Sie ihren StudiVZ-Passwort ein:');
		if(password_prompt)
			GM_setValue('password', password_prompt);
	}
}

function clearAccountInformation()
{
	GM_setValue('email', '');
	GM_setValue('password', '');
	
	alert('Der gespeicherte Benutzername und Passort wurden gelöscht!');
}