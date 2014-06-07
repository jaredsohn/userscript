// ==UserScript==
// @name           helgon.se table fix
// @namespace      helgon.se
// @include        http://*helgon.se/main.aspx
// ==/UserScript==

	var mytable = document.getElementsByTagName("table")[1];
	var killtop = mytable.firstChild.nextSibling.firstChild.childNodes[1];
	var killside = mytable.firstChild.nextSibling.lastChild.firstChild.nextSibling.nextSibling.nextSibling;

	if (killtop)
		killtop.style.display = "none";

	if (killside)
		killside.parentNode.removeChild(killside);