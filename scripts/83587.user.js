// ==UserScript==
// @name           Access Keys for [H]ard|Forum vBulletin
// @namespace      H-vBulletin-accesskeys
// @description    Adds accesskey for next and previous page links
// @include        http://*.hardforum.com/*
// @include        http://*.hardforums.com/*
// @include        http://hardforum.com/*
// @include        http://hardforums.com/*
// ==/UserScript==


// This list correlates strings found and accesskeys to add.
// Editing the keys is the quickest and easiest way to customize
// this for personal preferences.
links = {
    "Next Thread": "n",
    "Previous Thread": "p",
}

// find all anchors with href containing "goto=next", then iterate through
// the possible links (as defined in the array above)

allNextPrev = document.evaluate(
	"//a[contains(@href,'goto=next')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allNextPrev.snapshotLength; i++) {
    thisAnchor = allNextPrev.snapshotItem(i);
	for (key in links) {
		if (thisAnchor.text.search(key) != -1) {
			thisAnchor.setAttribute("accesskey", links[key]);
			break;
		}
	}
}