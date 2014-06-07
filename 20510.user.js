// ==UserScript==
// @name           crediteurope Autologin
// @namespace     crediteurope.nl
// @include        https://online.crediteurope.nl/servlet/internet.fbh.servlet.IBServlet?LNG=DEU&COUNTRY_CODE=DE0010001&CODE=LOGIN_PAGE
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////

const AUTOLOGIN = true;		// automatically presses the login button

////////////////////////////////////////////////////////////////////////////

var login_conf = GM_getValue('Zugangsnummer-crediteurope');
var password_conf = GM_getValue('Passwort-crediteurope');

var login_form = document.getElementById('USER');
var password_form = document.getElementById('PASSWORD');
var submit_form = document.getElementById('login_form');

GM_registerMenuCommand('crediteurope-Account-Informationen festlegen', setAccountInformation);
GM_registerMenuCommand('crediteurope-Account-Informationen zuruecksetzen', clearAccountInformation);

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
submit_form.submit();
}

function setAccountInformation()
{
	var login_prompt = prompt('Bitte geben Sie ihre Zugangsnummer ein:', (login_conf ? login_conf : ''));
	if(login_prompt)
	{
		GM_setValue('Zugangsnummer-crediteurope', login_prompt);
	
		var password_prompt = prompt('Bitte geben Sie ihr Passwort ein:');
		if(password_prompt)
			GM_setValue('Passwort-crediteurope', password_prompt);
	}
}

function clearAccountInformation()
{
	GM_setValue('Zugangsnummer-crediteurope', '');
	GM_setValue('Passwort-crediteurope', '');
	
	alert('Gespeicherte Daten (Zugangsnummer und Passort) wurden geloescht!');
}
