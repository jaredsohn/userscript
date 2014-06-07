// ==UserScript==
// @name	Disable Flash Right-click
// @namespace	http://slugsource.com
// @description	Sets embed's menu parameter to false, so the right-click is disabled
// @include http://armorgames.com/play/*
// ==/UserScript==

document.addEventListener("DOMNodeInserted", nodeInserted, false);

function nodeInserted()
{
	for (var ems = document.embeds, i = 0, em; em = ems[i]; i++)
	{
		if(em.getAttribute('menu') == 'false') continue;
		em.setAttribute('menu', 'false');
		var nx = em.nextSibling, pn = em.parentNode;
		pn.removeChild(em);
		document.removeEventListener('DOMNodeInserted', nodeInserted, false);
		pn.insertBefore(em, nx);
		document.addEventListener("DOMNodeInserted", nodeInserted, false);
	}
}

for (var ems = document.embeds, i = 0, em; em = ems[i]; i++)
{
	em.setAttribute('menu', 'false');
	var nx = em.nextSibling, pn = em.parentNode;
	pn.removeChild(em);
	pn.insertBefore(em, nx);
}