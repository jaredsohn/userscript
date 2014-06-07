// ==UserScript==
// @name           Access Keys for vBulletin
// @namespace      vBulletin-accesskeys
// @description    Adds accesskey for next and previous page links
// @include        http://www.bigsoccer.com/*
// ==/UserScript==


// This list correlates strings found and accesskeys to add.
// Editing the keys is the quickest and easiest way to customize
// this for personal preferences.
// Note that the "forum" string isn't specifically search for, but is
// used as a meta-value for returning to the forum
links = {
    "Next": "n",
    "Prev": "p",
	"Forum": "f"
}

// The "next" and "prev" links have css class of "nextprev", so
// find all anchors with that class, then iterate through
// the possible links (as defined in the array above)

allNextPrev = document.evaluate(
	"//a[@class='nextprev']",
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

// This works on the bread crumbs at the bottom of the page showing
// the hierarchy of forums
// (e.g. Home > USA > Major League Soccer > MLS: Clubs > DC United)
// Each element in the hierarchy is in a span with class "navbar"
// The last one in the list has no more siblings in the DOM (other
// than some blank spaces). Find that one then add the accesskey

allNavBar = document.evaluate(
	"//span[@class='navbar']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allNavBar.snapshotLength; i++) {
    thisSpan = allNavBar.snapshotItem(i);
	if (thisSpan.nextSibling != null
		&& thisSpan.nextSibling.nextSibling == null) {
		// We've found the current forum!
		thisSpan.lastChild.setAttribute("accesskey", links["Forum"]);
	}
}


