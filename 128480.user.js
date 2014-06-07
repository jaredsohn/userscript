// ==UserScript==
// @name           Steam Forum Link Changer
// @namespace      http://userscripts.org/users/didero
// @description    This script changes the 'Forums' link at the top of the SteamPowered and SteamCommunity websites to immediately go to the forum instead of to the 'Rules' page first.
// @include        http://*.steampowered.com/*
// @include        http://*.steamcommunity.com/*
// @include        http://steamcommunity.com/*
// @version        1.1
// ==/UserScript==

var forumLink = document.evaluate(
	"//a[@class='menuitem' or @class='menuitem ' or @class='menuitem active'][contains(@href,'http://store.steampowered.com/forums/')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (forumLink.snapshotLength != 1) {
  GM_log("Unexpected amount of forum links found. Expected 1, found "+forumLink.snapshotLength+":");
  for (var i=0; i < forumLink.snapshotLength; i++) {
    GM_log("Link "+i+": "+forumLink.snapshotItem(i).innerHTML);
  }
}
else {
  forumLink = forumLink.snapshotItem(0);
  forumLink.href = 'http://forums.steampowered.com/forums/';
  //GM_log("Forum link changed!");
}
