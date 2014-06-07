// ==UserScript==
// @name           MusicBrainz: Highlight cast votes
// @namespace      http://musicbrainz.org/user/gioele
// @description    Hightlight cast votes instead of showing the vote itself
// @include        http://musicbrainz.org/user/*
// ==/UserScript==

function xp(xpath, node) {
	return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xp_single(xpath, node) {
	return document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function set_bg_for(baseID, voteID, color) {
	var id = "id-" + baseID + "-" + voteID;

	var vote = document.getElementById(id);
	if (vote.checked) {
		var color = votes[voteID];
		vote.parentNode.parentNode.style.backgroundColor = color;
	}

	return vote.checked;
}

function move_votes(edit) {
	var description = xp_single(".//div[@class = 'edit-description']", edit);
	var votes = xp_single(".//div[@class = 'voteopts']", edit);

	var v = votes.parentNode.removeChild(votes);

	description.innerHTML = '';
	description.appendChild(v);
}

var green = "#E8F7E8";
var red = "#FFDD99";
var gray = "#F7F7F7";
var blue = "#736DAB";

var votes = {
	"Yes": green,
	"No": red,
	"Abstain": gray,
	"None": blue,
}

var xpathExpr = "//div[@id = 'edits']//div[@class = 'edit-list']";
var edits = xp(xpathExpr, document)

var numEdits = edits.snapshotLength;
for (var i = 0; i < numEdits; i++) {
	var edit = edits.snapshotItem(i);

	var hiddenID = xp_single(".//input[@type='hidden']", edit).name.replace('.edit_id', '');	

	for (var vote in votes) {
		var found = set_bg_for(hiddenID, vote);
		if (found) {
			break;
		}
	}

	move_votes(edit);
}
