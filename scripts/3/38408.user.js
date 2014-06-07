// ==UserScript==
// @name          Lectio-Login for Firefox
// @author        Kenneth Væversted (Tidligere version: Jonas Hansen)
// @version       2.2 beta
// @namespace     http://www.meinertz.org/
// @description   Lader Firefox udfylde login-felterne og logge dig ind på Lectio automatisk
// @include       https://www.lectio.dk/lectio/*/login.aspx*
// @include       http://www.lectio.dk/lectio/*/login.aspx*
// ==/UserScript==

function $(id) { return document.getElementById(id); }

// skift teksten på login-knappen hvis der ikke i forvejen findes login-oplysninger og udskift funktionene når man trykker med den hjemmelavede til at gemme oplysningerne
if (GM_getValue('username', false)) {
	$('m_Content_username2').value = GM_getValue('username');
	$('m_Content_password2').value = GM_getValue('password');
	$('m_Content_submitbt2').click();
} else {
	$('m_Content_submitbt2').value = 'Gem oplysninger og log ind';
	$('m_Content_submitbt2').addEventListener("click", saveInformation, true);
}

function saveInformation() {
	GM_setValue('username', $('m_Content_username2').value);
	GM_setValue('password', $('m_Content_password2').value);
}