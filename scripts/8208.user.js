// ==UserScript==
// @name           google
// @author         Daniel Jibouleau
// @namespace      http://www.example.com/
// @description    Enlève les onmousedown pour permettre de copier les liens
// @include        http://www.google.ca/search?*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i ++)
{
	links[i].removeAttribute('onmousedown');
}
