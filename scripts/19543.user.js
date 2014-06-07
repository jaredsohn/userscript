// ==UserScript==
// @name           PvXWiki GWW/GuildWiki Link Changer
// @namespace      http://pvxwiki.com/
// @description    Changes the Guild Wars Wiki links to GuildWiki links on the PvXWiki website.
// @include	   http://pvxwiki.com/*
// @include	   http://*.pvxwiki.com/*
// @author	   Eric Stacey
// ==/UserScript==

// Last updated: 08 Jan 2008

var allLinks = document.evaluate( "//a[contains(@href,'wiki.guildwars.com')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/wiki\.guildwars\.com/, "gw.gamewikis.org");
}
