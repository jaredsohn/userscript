// ==UserScript==
// @name           Steam Forum Link Back In Header
// @namespace      http://userscripts.org/users/didero
// @description    This script adds the 'Forums' link back at the top of the SteamPowered and SteamCommunity websites where it used to be, and changes all forum links to immediately go to the forum instead of to the 'Forum Rules' page first. Be sure to be aware of the rules for the Steam forums though, seems like Valve really wants you to know about them.
// @include        http://*.steampowered.com/*
// @include        https://*.steampowered.com/*
// @include        http://steamcommunity.com/*
// @include        https://steamcommunity.com/*
// @exclude        http://forums.steampowered.com/forums/*
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/145075.user.js
// @updateURL      https://userscripts.org/scripts/source/145075.meta.js
// @grant          none
// ==/UserScript==

//First replace any forum links with a link to the actual forums instead of the rules page
var forumLinks = document.evaluate('//a[contains(@href, "http://store.steampowered.com/forums/")]', document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0, len = forumLinks.snapshotLength; i < len; i++) {
	forumLinks.snapshotItem(i).href = forumLinks.snapshotItem(i).href.replace('//store.', '//forums.'); //Also replace some extra characters to prevent wrong replacements
}
forumLinks = null;

//Then add the forum link back into the header (It used to be between the 'News' and 'About' links, let's put it back there)
var aboutLinks = document.evaluate('//a[contains(@href, "http://store.steampowered.com/about/") and contains(@class, "menuitem")]',
				document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (aboutLinks.snapshotLength == 1) {
	var forumlink = document.createElement('a');
	forumlink.className = 'menuitem';
	forumlink.href = 'http://forums.steampowered.com/forums/';
	forumlink.innerHTML = ' FORUMS ';
	aboutLinks.snapshotItem(0).parentNode.insertBefore(forumlink, aboutLinks.snapshotItem(0));
	forumlink = null;
}
aboutLinks = null;