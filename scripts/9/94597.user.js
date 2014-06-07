// ==UserScript==
// @name           Refefe
// @namespace      Refefe
// @description    Fügt einen link zu den Kommentaren auf blog.refefe.de zu jedem Post hinzu
// @include        http://blog.fefe.de/*
// @include        http://blog.refefe.de/*
// ==/UserScript==
var d=document;
if(d.domain=="blog.fefe.de")
{
	var l=d.getElementsByTagName("li"),m=l.length;
	for(var i=0;i<m;i++)
	{
		var n=l[i].firstChild.href,o=l[i].firstChild.href.replace("fefe.de","refefe.de");
		if(n!=o)
		{
			var p = d.createElement("a");
			p.setAttribute("href",o);
			p.appendChild(d.createTextNode("Kommentare"));
			l[i].appendChild(d.createTextNode(" ["));
			l[i].appendChild(p);
			l[i].appendChild(d.createTextNode("]"));
		}
	}
}
else
{
	var l=d.getElementsByTagName("a"),m=l.length;
	for(var i=0;i<m;i++)
	{
		var n=l[i].href,o=l[i].href.replace("refefe.de","fefe.de");
		if(n!=o) l[i].setAttribute("href",o);
	}
}