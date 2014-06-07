// ==UserScript==
// @name             Drop 4e 4 rpg.net
// @namespace        http://www.outshine.com/
// @description      On forum.rpg.net, this hides topics that have the 4e tag and the [4e] subject.
// @include          *forum.rpg.net/forumdisplay.php*
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2009-10-31.
Updated on 2010-09-06.
Version: 1.1.0
*/

var allTags, thisTag;
allTags = document.evaluate(
	"//img[contains(@title,'dragons 4e')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

for (var i = allTags.snapshotLength - 1; i >= 0; i--) {
	thisTag = allTags.snapshotItem(i);
	thisTag.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisTag.parentNode.parentNode.parentNode.parentNode);
}

var allTitles, thisTitle;
allTitles = document.evaluate(
	"//a[starts-with(@id, 'thread_title_')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

for (var i = allTitles.snapshotLength - 1; i >= 0; i--) {
	thisTitle = allTitles.snapshotItem(i);
	titleText = thisTitle.firstChild.nodeValue;
	if ((titleText.search(/\[4e/i) == 0) || (titleText.search(/(^|\s)4e($|\s)/i) >= 0) || (titleText.search(/4th ed/i) >= 0)) {
		thisTitle.parentNode.parentNode.parentNode.parentNode.removeChild(thisTitle.parentNode.parentNode.parentNode);
	}
}
