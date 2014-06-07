// dingar@gmail.com
// ==UserScript==
// @name           daqi Redirect
// @namespace      daqi
// @description    Rediect pages of daqi.com to original webpage.
// @include        http://www.daqi.com/bbs/*
// ==/UserScript==

if (history.length == 1) {
	var link = document.evaluate("//*[@name='bbsurl']", document, null, 0, null).iterateNext();
	window.location = link.src;
}
