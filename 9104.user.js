// dingar@gmail.com
// ==UserScript==
// @name           qihoo Redirect v1.0
// @namespace      qihoo
// @description    Rediect pages of qihoo.com to original webpage.
// @include        http://look.qihoo.com/forum/article/*
// ==/UserScript==

if (history.length == 1) {
	var link = document.evaluate("//*[@name='main']", document, null, 0, null).iterateNext();
	window.location = link.src;
}
