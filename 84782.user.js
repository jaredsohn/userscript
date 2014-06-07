// ==UserScript==
// @name		!DOCTOR image filter
// @author		DOCTORl4Wg
// @description		Because I love you.
// @include		http://boards.4chan.org/*
// ==/UserScript==


var trips = document.querySelectorAll('span.postertrip');

for (var i = 0; i < trips.length; ++i)
{
	if (trips[i].innerHTML == "!DOCTORl4Wg")
	{
		trips[i].parentNode.parentNode.querySelector("img").style.display="none";
	}
}