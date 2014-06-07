// ==UserScript==
// @name           AlloSkip
// @namespace      AlloURL
// @include        http://209.212.147.251/*
// ==/UserScript==

setTimeout(A, 8000);

function A()
{
	var as = document.getElementsByTagName("a");
	if(as.length > 0)
	{
		var url = as[0].href;
		if(url.match("amung"))
			return;
		top.location.href = url;
	}
}