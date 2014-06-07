// ==UserScript==
// @name           comdirect Autologin
// @namespace      comdirect.de
// @include        https://brokerage.comdirect.de/brokerage/login/login.jsp?*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////

const AUTOLOGIN = true;		// automatically presses the login button

////////////////////////////////////////////////////////////////////////////

var login_conf = GM_getValue('Zugangsnummer-Comdirect');
var password_conf = GM_getValue('Passwort-Comdirect');

var login_form = document.getElementById('param1');
var password_form = document.getElementById('param2');
var submit_form = document.getElementById('login');

GM_registerMenuCommand('comdirect-Account-Informationen festlegen', setAccountInformation);
GM_registerMenuCommand('comdirect-Account-Informationen zuruecksetzen', clearAccountInformation);

if(!login_conf && submit_form)
{
	var result = confirm('Sie haben noch keine comdirect-Anmeldeinformationen gespeichert. Moechten Sie dies nun vornehmen um den den Autologin-Prozess auszufuehren?');
	if(result)
	{
		setAccountInformation();
		location.reload();
	}
}

if(login_conf && login_form)
	login_form.value = login_conf;

if(password_conf && password_form)
	password_form.value = password_conf;

if(AUTOLOGIN && password_conf && login_conf && login_form && password_form && submit_form)
{
document.getElementById('direktzu').options[2].selected = true;
submit_form.submit();
}

function setAccountInformation()
{
	var login_prompt = prompt('Bitte geben Sie ihre Zugangsnummer ein:', (login_conf ? login_conf : ''));
	if(login_prompt)
	{
		GM_setValue('Zugangsnummer-Comdirect', login_prompt);
	
		var password_prompt = prompt('Bitte geben Sie ihr Passwort ein:');
		if(password_prompt)
			GM_setValue('Passwort-Comdirect', password_prompt);
	}
}

function clearAccountInformation()
{
	GM_setValue('Zugangsnummer-Comdirect', '');
	GM_setValue('Passwort-Comdirect', '');
	
	alert('Gespeicherte Daten (Zugangsnummer und Passort) wurden geloescht!');
}
