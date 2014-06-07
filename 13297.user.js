// ==UserScript==
// @name          Show Ars Technica OpenForum Reply Icon
// @include       http://episteme.arstechnica.com/*a=prply*
// @include	  http://episteme.arstechnica.com/*a=em&*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
divs[0].style.display='block';
