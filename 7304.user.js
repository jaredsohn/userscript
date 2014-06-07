// ==UserScript==
// @name		Bilddagboken.se- remove spacer.gif
// @namespace	http://roflzombie.com
// @description	Makes saving pictures from bilddagboken.se a bit easier.
// @include       http://*bilddagboken.se/p/show*
// ==/UserScript==

sl=document.getElementById("spacerLayer");
sl.style.display="none";