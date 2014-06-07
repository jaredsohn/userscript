// ==UserScript==
// @name           unXify mod for /v/ and /a/
// @namespace      http://boards.4chan.org/b/*
// @description    Removes the last 3 X's on /b/, /v/, and /a/ and replaces them with the postnumber. ORIGINAL by Anonymous1337; SMALL FIX by Somefagfromg.
// @include		   http://boards.4chan.org/v/*
// @include	       http://boards.4chan.org/a/*
// @version        0.5.1
// ==/UserScript==

function fixPostNumbers()
{
	var links = document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++)
	{
		if(links[i].innerHTML.match(/\d{5}XXX/))
		{
			links[i].href.match(/[^\/](\d{8})/);
			links[i].innerHTML=RegExp.$1;
		}
	}
}

fixPostNumbers();
document.body.addEventListener ('DOMNodeInserted', fixPostNumbers, true);