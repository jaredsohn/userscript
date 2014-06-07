// ==UserScript==
// @description Fix focus on bogus pages.
// @grant       none
// @include     http://boards.4chan.org/*
// @include     http://news.google.fr/*
// @include     http://thepiratebay.se/*
// @include     https://boards.4chan.org/*
// @include     https://news.google.fr/*
// @name        Focus
// @namespace   http://userscripts.org/users/nescafe
// @version     2
// ==/UserScript==

// Test document
if (('http://boards.4chan.org/' === document.location.href.substr(0, 24)) || ('https://boards.4chan.org/' === document.location.href.substr(0, 25)))
{
	// Fill email field
	document.getElementsByName('email')[0].value = 'noko';

	// Check anchor
	if ('' === document.location.hash)
	{
		// Focus on comment field
		document.getElementsByName('com')[0].focus();
	}
}
else if (('http://news.google.fr/' === document.location.href.substr(0, 22)) || ('https://news.google.fr/' === document.location.href.substr(0, 23)))
{
	// Focus on search field
	document.getElementById('gbqfq').focus();
}
else if ('http://thepiratebay.' === document.location.href.substr(0, 20))
{
	// Find search field
	var list = document.getElementById('inp').childNodes;
	for (index = 0; index !== list.length; ++index)
	{
		// Check search field
		if ('INPUT' === list[index].nodeName)
		{
			// Focus on search field
			list[index].focus();
		}
	}
}
