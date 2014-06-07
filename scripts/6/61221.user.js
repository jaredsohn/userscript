// ==UserScript==
// @name           Rick Roll Redirect
// @description    Solves the Rick Roll problem, redirects any page with Rick Astley or Rick Roll in the title.
// @include 	   *
// @exclude        http://userscripts.org/*
// ==/UserScript==

check(document.title)

function check(text)
{
	if (text.match(/rick/i)) 
	{
		if (text.match(/roll/i) || text.match(/astley/i)) 
		{
			window.location.href = 'http://www.youtube.com/watch?v=piVnArp9ZE0'
		}
	}
}