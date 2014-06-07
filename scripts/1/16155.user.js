// ==UserScript==
// @name           SchuelerVZ: Autologin
// @description    Loggt sich automatisch beim Betreten des SchuelerVZ ein
// @namespace      http://www.nohomepageyet.de
// @include        http://www.schuelervz.net/*
// @exclude        http://www.schuelervz.net/logout.php*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////

const AUTOLOGIN = true;		// automatically presses the login button

////////////////////////////////////////////////////////////////////////////

var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var email_form = document.getElementById('email');
var password_form = document.getElementById('pass');
var submit_form = document.getElementById('doquicklogin');

GM_registerMenuCommand('Account-Informationen festlegen', setAccountInformation);
GM_registerMenuCommand('Account-Informationen zurÃ¼cksetzen', clearAccountInformation);

if(!email_conf && submit_form)
{
	var result = confirm('Sie haben noch keine SchuelerVZ-Anmeldeinformationen gespeichert. MÃ¶chten Sie dies nun vornehmen um den den Autologin-Prozess auszufÃ¼hren?');
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
	submit_form.form.submit();
}

function setAccountInformation()
{
	var email_prompt = prompt('Bitte geben Sie ihren SchuelerVZ-Benutzernamen (E-Mail-Adresse) ein:', (email_conf ? email_conf : ''));
	if(email_prompt)
	{
		GM_setValue('email', email_prompt);
	
		var password_prompt = prompt('Bitte geben Sie ihren SchuelerVZ-Passwort ein:');
		if(password_prompt)
			GM_setValue('password', password_prompt);
	}
}

function clearAccountInformation()
{
	GM_setValue('email', '');
	GM_setValue('password', '');
	
	alert('Der gespeicherte Benutzername und Passort wurden gelÃ¶scht!');
}
