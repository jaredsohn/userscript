// ==UserScript==
// @name           SMBC Votey Viewer
// @namespace      uk.co.swirski.leszek
// @description    Displays the votey comic
// @include        http://www.smbc-comics.com/
// @include        http://smbc-comics.com/
// @include        http://www.smbc-comics.com/index.php*
// @include        http://smbc-comics.com/index.php*
// ==/UserScript==

function showVotey () {
	var mainComic = document.evaluate("//img[starts-with(@src, '/comics')]",
                                    document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);

	if (!mainComic || !mainComic.singleNodeValue)	
		return;

	mainComic = mainComic.singleNodeValue;
	var src = mainComic.src;

	re = /comics\/(.*).gif/i;

	if (!src.match(re))
		return;

	var voteySrc = src.replace(re,"images/$1after.gif");
	var votey = document.createElement('img');
	votey.src = voteySrc;

	mainComic.parentNode.insertBefore(votey, mainComic.nextSibling);
	mainComic.parentNode.insertBefore(document.createElement('br'), votey);
}

window.addEventListener('load', showVotey, true);