// ==UserScript==
// @name           remove javascript
// @namespace      RJS
// @include        http://*
// ==/UserScript==

var SL = document.getElementsByTagName("script").length;

for (int i = 0; i < SL; i++)
{
	document.getElementsByTagName("script")[0].parentNode.removeChild(document.getElementsByTagName("script")[0]);
SL--;
}