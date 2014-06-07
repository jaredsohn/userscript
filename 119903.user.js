// ==UserScript==
// @name           wikipedia
// @namespace      wikipedia
// @include        http://ru.wikipedia.org/wiki/*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function() {
	var st = document.createElement('style');
	st.type="text/css";
	st.textContent = '#siteNotice #centralNotice div {display: none;}';
	document.getElementsByTagName('head')[0].appendChild(st);
}, false);