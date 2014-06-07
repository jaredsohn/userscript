// ==UserScript==
// @author          dredzik
// @namespace       http://dredzik.pl/userscripts/wykopadfree/
// @homepage        http://dredzik.pl/
// @description     Removes ads from popular Polish digg clone - wykop.pl.
// @copyright       2009 dredzik
// @version         1.1
// @name            Wykop Ad Free
// @include         http*://*wykop.pl/*
// ==/UserScript==

(function() {
	var s = '#bottom, #footer, #side-sponsor-box, #side-fruli-box, #side-otopraca-box, '
	      + '#side-popular-box, #side-ibood-box, #szerlokb, #polecamyBtn, #cover-item, '
	      + 'iframe, .c-nav, .praca, .side object, .wykop-item-obsfav, .polecamyContainer';

	document.styleSheets[0].insertRule(s + ' { display: none !important; }', 0);
	document.styleSheets[0].insertRule('html { background: none !important; }', 0);
})()
