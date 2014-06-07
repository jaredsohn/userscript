// ==UserScript==
// @name           Litportal_unlock
// @namespace      http://www.litres.ru/
// @description    Allows to copy chunks of text from Litportal.ru e-library to clipboard.
// @include        http://www.litportal.ru/*/page/*
// ==/UserScript==

var scr = document.createElement("script");
scr.text = "function LockSel() { \n" + 
"var holder = document.getElementById('page_text'); \n" +
"if (holder == null || holder.innerHTML == '') { \n" +
"	window.setTimeout ('LockSel()', 10); \n" +
"} else { \n" +
"	var spans = holder.getElementsByTagName('span'); \n" +
"	for (var i = 0; i < spans.length; i++) { \n" +
"		if (spans[i].className == 'h') \n" +
"			spans[i].innerHTML = ''; \n" +
"}}}\n ";

document.body.appendChild(scr);
