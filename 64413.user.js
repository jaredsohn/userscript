// ==UserScript==
// @name           Change_m schedule time
// @namespace      Amoondre (c) 2009
// @include        https://129.39.234.13/managenowen.war/servlet/*
// ==/UserScript==

var main, newElement;

main = document.getElementsByName('timereqdhour')[0];

var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://www.hojko.com/generuj.js';
headID.appendChild(newScript);

if (main) {
	newElement = document.createElement('a');
	newElement.innerHTML = '<a href="#" onClick="javascript:generuj();" style="font-weight: bold; font-size: 11pt; color: black">Populate</a>';
	main.parentNode.appendChild(newElement, main);
}