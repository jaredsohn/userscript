// ==UserScript==
// @name           MusicBrainz: Show notes on a single line
// @namespace      http://musicbrainz.org/user/gioele
// @description    Show the editor name and the note all in one line
// @include        http://musicbrainz.org/*
// ==/UserScript==


var emptyMessage = "No edit notes have been added.";
var xpathExpr = "//div[@class = 'edit-notes' and not(./div[1]/em[1]/text() = '" + emptyMessage + "')]/div[@class = 'edit-note']";

var editNotesBoxes = document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var numBoxes = editNotesBoxes.snapshotLength;
for (var i = 0; i < numBoxes; i++) {
	var box = editNotesBoxes.snapshotItem(i);

	var authorName = box.getElementsByTagName('h3')[0];

	authorName.style.display = 'inline';

	var date = authorName.getElementsByTagName('span')[0];

	date.style.cssFloat = 'none';
	date.style.fontSize = '80%';
	date.style.color = 'rgb(150,150,150)';

	var noteText = box.getElementsByTagName('div')[0];

	noteText.style.display = 'inline';
}
