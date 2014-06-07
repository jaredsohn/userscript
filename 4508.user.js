// ==UserScript==
// @name		MSProperties
// @include		http://msdn.microsoft.com/*
// @include		file:///*.asp.html
// @description		Add parentElement to all the DOM nodes. Helps to view
// @description		IE-only by mistake sites.
// @namespace		http://userscripts.org/uscript.raskin@rambler.ru
// ==/UserScript==

window.document.body.setAttribute("onload","_do=function(n) { \
	n.parentElement=n.parentNode; \
	n.children=n.childNodes; \
	if(n.firstChild){ \
		_do(n.firstChild); \
	} \
	if(n.nextSibling){ \
		_do(n.nextSibling); \
	} \
	if(n.contentDocument){ \
		_do(n.contentDocument); \
	} \
}; \
_do(window.document);");
