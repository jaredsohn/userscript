// ==UserScript==
// @name                Reddit Flair Linkifier
// @description         Turns the text in various subreddits' flair into links
// @author              Adrien Pyke
// @version             1.0.8
// @updateURL           https://userscripts.org/scripts/source/177403.meta.js
// @downloadURL         https://userscripts.org/scripts/source/177403.user.js
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require             https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include             http*://www.reddit.com/*
// ==/UserScript==
function linkify(element)
{
	if (/https?:\/\//.test(element.html()))
	{
		var text = "";
		var links = element.html().split(" ");
		var link;
		for (var i = 0; i < links.length; i++)
		{
			link = links[i];
			if (/^https?:\/\//.test(link))
				text += "<a href='" + link + "' target='_blank'>" + links[i] + "</a> ";
			else
				text += link + " ";
		}
		element.html(text.trim());
	}
}
waitForKeyElements("span.flair", linkify);
