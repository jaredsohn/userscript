// ==UserScript==
// @name	Przycisk ABW
// @namespace	http://userscripts.org/scripts/show/154558
// @author	kasper93
// @description	Dodaje przycisk ABW na belce.
// @include	http://*wykop.pl/*
// @downloadURL	https://userscripts.org/scripts/source/154558.user.js
// @updateURL	https://userscripts.org/scripts/source/154558.meta.js
// @version	1.0.1
// @grant	none
// @run-at	document-end
// ==/UserScript==

var abw = location.pathname.match('agencjabezpieczenstwawykopu');
var belka = document.getElementsByClassName('main')[0];

przycisk = document.createElement('a');
przycisk.className = 'tip fleft cfff tab fbold';
przycisk.title = 'kanał AgencjaBezpieczeństwaWykopu';
przycisk.href = 'http://www.wykop.pl/mikroblog/kanal/agencjabezpieczenstwawykopu/';
przycisk.innerHTML = 'ABW';
if (abw) {
	var old = belka.getElementsByClassName('selected')[0];
	old.className = 'tip fleft cfff tab fbold';
	przycisk.className += ' selected';
}
belka.appendChild(przycisk);
