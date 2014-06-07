// ==UserScript==
// @name           SMBC Votey Viewer
// @namespace      uk.co.swirski.leszek
// @description    Displays the votey comic
// @grant          none
// @include        http://www.smbc-comics.com/*
// @include        http://smbc-comics.com/*
// ==/UserScript==

function showVotey () {
	var mainComic = document.evaluate("//img[contains(@src, '.smbc-comics.com/comics/') and not(contains(@src, 'after.gif'))]",
                                    document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);

	if (!mainComic || !mainComic.singleNodeValue)
		return;

	mainComic = mainComic.singleNodeValue;
	var src = mainComic.src;

	re = /comics\/(.*)(?:\.png|\.gif)/i;

	if (!src.match(re))
		return;

	var voteySrc = src.replace(re,"/comics/$1after.gif");
	var votey = document.createElement('img');

	votey.src = voteySrc;

	mainComic.parentNode.insertBefore(votey, mainComic.nextSibling);
	mainComic.parentNode.insertBefore(document.createElement('br'), votey);
}

window.addEventListener('load', showVotey, true);

