// ==UserScript==
// @name           Knuttz Redirection
// @namespace      http://wtw.tw
// @description    Redirect Knutzz pages to the actual photos
// @include        http://knuttz.net/*
// @exclude 	http://knuttz.net/hosted_pages/*
// ==/UserScript==

for (var i in document.links)
{
	if (!document.links[i].href)
		continue;
	var l = document.links[i].href;
	if (l.indexOf('hosted_pages') != -1)
	{
		document.location.href = l;
	}
		
}