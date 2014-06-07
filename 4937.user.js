// ==UserScript==
// @name TwoMadGeeksDirect
// @include http://twomadgeeks.typepad.com/twomadgeeks/*/*/*.html
// @description Load TwoMadGeeks link after loading page with a link.
// @namespace		http://userscripts.org/uscript.raskin@rambler.ru
// ==/UserScript==

document.body.setAttribute("onload","\
\
getElementByClass=function (node,name)\
{\
	if (node.className == name) return node;\
	var fc;\
	fc=node.firstChild;\
	if (fc){\
		var res;\
		res=getElementByClass(fc,name);\
		if(res) return res;\
	}\
	var ns;\
	ns=node.nextSibling;\
	if (ns){\
		var res;\
		res=getElementByClass(ns,name);\
		if(res) return res;\
	}\
	return null;\
};\
\
document.location=\
	   getElementByClass(document,'entry-body').childNodes[3].childNodes[1].href;\
	");
