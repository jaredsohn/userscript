// version 0.1 BETA
// 22:24 11/10/2008
// Copyright (c) 2008, Libertius
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Regni Rinascimentali - Non si butta niente", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Regni Rinascimentali - Non si butta niente
// @namespace   http://userscripts.org/scripts/
// @description	Impedisce di eliminare per sbaglio oggetti giocando a RR
// @include     http://www.iregni.com/*
// @include     http://iregni.com/*
// @exclude	
// ==/UserScript==

function init_modifyDelete() {
	var links = window.document.getElementsByTagName('a');
	var lastIndex = links.length - 1;
	for (i =0; i <= lastIndex; i++) {
		if(
			(/Gettate via/.test(links[i].firstChild.nodeValue)) ||
			(/action\.php\?action=70/i.test(links[i].getAttribute("href")))
		) links[i].setAttribute("href", "javascript:alert('GreaseMonkey dice no :)');");
	}
	return true;
};

window.addEventListener("load", function(e) {
	init_modifyDelete();
}, false);
