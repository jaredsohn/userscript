// ==UserScript==
// @name           refefe
// @description    Fügt Fefes Blog Kommentar-Links hinzu (zu "re: Fefes Blog", blog.refefe.de)
// @namespace      na
// @include        http://blog.fefe.de/*
// @include        https://blog.fefe.de/*
// @version        10.05
// ==/UserScript==

liz = document.getElementsByTagName("li");
for(i=0;i<liz.length;i++)
{
	item = liz[i].firstChild;
	if(item.href && item.href.match(/^https?:\/\/blog\.fefe\.de[^\?]*\?ts=/) && 
	   item.firstChild && item.firstChild.nodeValue=="[l]")
	{
		re = document.createElement("a");
		re.appendChild(document.createTextNode("[refefe]"));
		href = document.createAttribute("href");
		href.nodeValue = item.href.replace(/^https?:\/\/blog\.fefe\.de/,"http://blog.refefe.de");
		re.setAttributeNode(href);
		liz[i].appendChild(re);
	}
}
