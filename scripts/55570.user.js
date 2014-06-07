// ==UserScript==
// @name           bitefight
// @version        v0.1
// @namespace      http://userscripts.org/users/103378
// @include        http://s*.bitefight.onet.pl/*
// ==/UserScript==

function petereklink() {
	if ( menu = document.getElementById('menu') ) {
		menu.innerHTML =  menu.innerHTML + '<a href="uebersicht.php" target="_top">Podsgląd</a>';
	} else { window.setTimeout(petereklink, 250); }
}

petereklink();