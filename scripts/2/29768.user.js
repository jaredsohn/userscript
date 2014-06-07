// ==UserScript==
// @name           BestScriptEver
// @namespace      http://localhost
// @description    This script is freakin sweet.
// @author         Xyan Flux
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php*cmd=gathering*
// @exclude
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate('//a[@style]',document,null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.innerHTML = thisLink.innerHTML.replace(/(Minister|Governor)/,'Dumbass');
}