// ==UserScript==
// @name           giga no blondelinks
// @namespace      fdshgjkhfgjkdhj
// @description    заменяет ссылки для блондинок на нормальные
// @include        http://forum.giga.ua/viewtopic.php?*
// ==/UserScript==

prefix = "http://forum.giga.ua/go.html?";
var links = document.evaluate('/html/body//a[starts-with(@href, "' + prefix + '")]', document, null, XPathResult.ANY_TYPE, null);

var A=new Array();
for(var n = links.iterateNext(); n; n = links.iterateNext())
{
	A.push(n);
}

for each(var n in A)
	n.href = n.href.replace(prefix, "");

