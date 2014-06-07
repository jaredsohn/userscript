// ==UserScript==
// @name           MusicBrainz: Hide empty notes in edit boxes
// @namespace      http://musicbrainz.org/user/gioele
// @description    Hide the space reserved for notes in edits that have no notes, making the vote page more compact
// @include        http://musicbrainz.org/*
// @exclude        http://musicbrainz.org/edit/*
// ==/UserScript==

var emptyMessage = "No edit notes have been added.";
var xpathExpr = "//div[@class = 'edit-notes' and (./div[1]/em[1]/text() = '" + emptyMessage + "')]";

var emptyEditNotesBoxes = document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var numBoxes = emptyEditNotesBoxes.snapshotLength;
for (var i = 0; i < numBoxes; i++) {
	var box = emptyEditNotesBoxes.snapshotItem(i);

	box.style.display = 'none';
}
