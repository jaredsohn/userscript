// ==UserScript==
// @name           UiD login form kitöltő
// @namespace      http://uid.hu
// @description    Megjegyzi az utoljára beírt felhasználó nevet es jelszót.
// @source         http://userscripts.org/scripts/show/35638
// @author         enti
// @version        1.4
// @include        http://uid.hu/login.php
// ==/UserScript==

// --------------------------------------------------------------------
// UiD
// Copyright (c) 2010, UiD Team. All rights reserved
// http://uid.hu/pub/UiDlogin.user.js
// --------------------------------------------------------------------
// ChangeLog
// 2010.08.20 - 1.4 - change event lecserelve keyup-ra hibas Opera mukodes miatt
// 2010.02.06 - 1.3 - Chrome 4 es Opera 10.50 tamogatas (HTML5 localStorage-on keresztul)
// 2008.06.17 - 1.2 - A "name" ezentul foglalt szo ezert nem adhato valtozo nevnek
// 2008.05.11 - 1.1 - Opera kompatibilis (GM emulacio szukseges - http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js)
// 2008.05.09 - 1.0 - Elso valtozat
// --------------------------------------------------------------------

if ((typeof GM_setValue == 'undefined') && (typeof window.localStorage == 'function')) {
	function GM_setValue(name, value) {
		window.localStorage.setItem(name, value);
	}
}

if ((typeof GM_getValue == 'undefined') && (typeof window.localStorage == 'function')) {
	function GM_getValue(name, defaultValue) {
		var value = window.localStorage.getItem(name);
		if (value == 'false')
			return false;
		return value || defaultValue;
	}
}

var form = document.forms.namedItem('login');
var uname = form[3];
var pw = form[4];

if(pw) {
	var nick = '';
	var pass = '';

	if (GM_getValue('nick')) {
		nick = GM_getValue('nick');
		pass = GM_getValue('pass');
	}

	function nameChanged(event) {
			nick = uname.value;
			GM_setValue('nick', nick);
	}

	function passChanged(event) {
			pass = pw.value;
			GM_setValue('pass', pass);
	}

	uname.addEventListener("keyup", nameChanged, false);
	pw.addEventListener("keyup", passChanged, false);

	function fillLogin() {
		var newElement = document.createElement('div');
		var s = '<p style="color: red;">&#x2605; FIGYELEM! UiD login script telep&iacute;tve, megjegyzi a nevet &eacute;s jelsz&oacute;t</p>';
		newElement.innerHTML = s;
		form.parentNode.insertBefore(newElement, form);
		uname.value = nick;
		pw.value = pass;
	}

	fillLogin();
}
