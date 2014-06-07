// ==UserScript==
// @name        Operahoo
// @namespace   http://www.ruinsofmorning.net/greasemonkey
// @description Fixes Yahoo Image Search layout issues in Opera.
// @version	1.0 - 2006-10-02
// @include	http://images.search.yahoo.com/*
// ==/UserScript==

ps = document.getElementById('yschimg').getElementsByTagName('p');

for (p in ps) {
	ps[p].setAttribute('style', 'display: block;');
	ps[p].parentNode.setAttribute('valign', 'bottom');
}