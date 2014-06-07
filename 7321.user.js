// ==UserScript==
// @name           CheckNewFolders
// @namespace      http://cybot.eu.org/download
// @description    Shows the count of folders with unread content
// @include        http://url.of.your.phpbb.forum
// ==/UserScript==

var newFolders = document.evaluate(
	"count(//img[contains(@src,'/folder_new_big.gif')])",
	document, null, XPathResult.ANY_TYPE, null
).numberValue - 1;

var newFoldersText = document.createElement("div");
newFoldersText.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
	'font-size: small; text-align: center"><p style="margin: 2px 0 1px 0;"> ' +
	(newFolders > 0 ? '<a href="search.php?search_id=newposts">' : '') +
	newFolders + ' new Folder' + (newFolders == 1 ? "" : "s") +
	(newFolders > 0 ? "!</a>" : "") + '</p></div>';
var insertionPoint = document.getElementsByTagName('a')[1];
insertionPoint.parentNode.insertBefore(newFoldersText, insertionPoint.nextSibling);
