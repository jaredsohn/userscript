// ==UserScript==
// @name           Hiatus/Dropped Alert
// @namespace      pervamon
// @description    Alerts of manga that were dropped or are on Hiatus
// @include        http://www.mangaupdates.com/series.html*
// ==/UserScript==

function check_status()
{
	t = document.getElementsByClassName("sCat")[6].nextElementSibling.childNodes[0];
	regex = /Dropped|Hiatus|Cancelled|Discontinued|Axed|Killed/
	o = t.textContent.match(regex);
	if (o!==null)
	{
		insertAlert(o);
	}
}

function insertAlert(T)
{
	al = document.createElement("span");
	al.setAttribute("style", "color:#ff0000;");
	al_t = document.createTextNode(" ("+T+"!)");
	al.appendChild(al_t);
	document.getElementsByClassName("releasestitle tabletitle")[0].appendChild(al);
}

check_status();