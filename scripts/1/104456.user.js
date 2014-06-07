// ==UserScript==
// @name           99chan spoliers
// @namespace      99
// @include        http://99chan.org/*
// @exclude        http://99chan.org/menu.php
// ==/UserScript==

var s = document.getElementsByClassName('spoiler');
while (s.length > 0) {
	var e = s[0];
	e.removeAttribute("onmouseover","");
	e.removeAttribute("onmouseout","");
	e.setAttribute("class","");
}