// ==UserScript==
// @name        LJAntispoiler
// @namespace   LJAntispoiler
// @description Adds link to liveournal spoiler section
// @include     http://*.livejournal.com/*
// @version     1
// ==/UserScript==

function getSpoilerHandle(spoiler)
{
	return spoiler.querySelector('div.lj-spoiler-head a');
}

function getPostLink(spoiler)
{
	var e = spoiler.parentNode;
	while (e)
	{
		if (e.tagName == 'DL' && e.className.match(/(^| )entry($| )/))
		{
			break;
		}

		e = e.parentNode;
	}

	if (e)
	{
		var a = e.querySelector('dt.entry-title a.subj-link');

		if (a)
		{
			return a.href;
		}
	}

	return null;
}

function addSpoilerLinks()
{
	var spoilers = document.querySelectorAll('div.lj-spoiler');
	for (var i = 0; i < spoilers.length; i++)
	{
		var s = spoilers[i];
		var a = getSpoilerHandle(s);
		var href = getPostLink(s);

		if (a && href)
		{
			a.href = href;
		}
	}
}

addSpoilerLinks();
