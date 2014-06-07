// ==UserScript==
// @name nytimes 
// @include http://www.nytimes.com/*
// ==/UserScript==

var t = setTimeout(check(), 5000);

function check ()
{
	var patt=new RegExp("gwh=");
	var verdict = patt.test(window.location);

	if (verdict == true)
	{
		var fullUrl = window.location.href;
		var extractUrl = fullUrl.match(/http(.*?)gwh/i)[1];
		window.location.replace('http' + extractUrl);

	}
}