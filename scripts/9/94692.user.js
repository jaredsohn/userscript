// ==UserScript==
// @name           farkPrivacy
// @namespace      download
// @description    Disables tracking links for fark.
// @include        http://www.fark.com/*
// ==/UserScript==

String.prototype.toObj=function(s)
{
	var r={},c=this.split("&"),t;
	for(var i=0;i<c.length;i++)
	{
		t=c[i].split("=");
		r[decodeURIComponent(t[0])]=decodeURIComponent(t[1]);
	}
	return r;
}

var links=document.querySelectorAll("[href^='http://www.fark.com/cgi/go.pl']");
for(var i=0;i<links.length;i++)
{
	var a=links[i].href;
	a=a.substr(a.indexOf("?")+1).toObj();
	links[i].href=a.l;
}