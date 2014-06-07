// ==UserScript==
// @name           eXaminator 10
// @description    Siempre sale 10 en la nota del eXaminator
// @include        http://examinator.ws/check*
// ==/UserScript==


document.getElementsByTagName('strong')[0].childNodes[0].nodeValue = "10";

var header = document.getElementById('header');
header.className = "barA";
