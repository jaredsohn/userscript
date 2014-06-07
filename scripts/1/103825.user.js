// ==UserScript==
// @name           Youtube Playlist Fixer
// @namespace      http://userscripts.org/users/17379
// @include        http://www.youtube.com/user/*#g/c/*
// ==/UserScript==

function evaluateXPath(xpathExpression, resultType)
{
	return document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function linkify(event)	{

	if (!event.target.id) {
		return;
	}

	if (!event.target.id.match('-playlist-')) {
		return;
	}	

link = evaluateXPath('//input[contains(@value, "youtube.com/user/")]');
playlist_id = link.value.match(/youtube.com\/user\/.*?#g(?:rid)?\/(?:c|user)\/(.*)/)[1];
link.parentNode.parentNode.innerHTML = "<a href='http://www.youtube.com/view_play_list?p=" + playlist_id + "' style='font-size: 22px'>Play all / View playlist</a>";
}

document.addEventListener('DOMNodeInserted', linkify, false );