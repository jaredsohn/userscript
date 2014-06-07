// ==UserScript==
// @name           Furaffinity.net submission
// @namespace      FA_DOT_NET
// @include        http://www.furaffinity.net/view/*
// @include        http://www.furaffinity.net/full/*
// ==/UserScript==

w = document.body.clientWidth;
i = document.getElementById('submissionImg');

dx = 30;
threshold = w - dx;

i.onload = function()
{
	if ( i.width > threshold )
	{
		i.width = w - dx*2;
	}
}