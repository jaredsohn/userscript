// ==UserScript==
// @name		Devi image filter
// @author		Devi !!jwH8n0q5wQu
// @description		Eh, because you don't like me, but your welcome anyway:)
// @include		http://boards.4chan.org/*
// ==/UserScript==


var trips = document.querySelectorAll('span.postertrip');

for (var i = 0; i < trips.length; ++i)
{
	if (trips[i].innerHTML == "Devi !!jwH8n0q5wQu")
	{
		trips[i].parentNode.parentNode.querySelector("img").style.display="none";
	}
}