// ==UserScript==
// @name		MusicBrainz: Change colours when voting
// @description		A script to change the background of the vote box according to your vote.
// @version		2011-05-21
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9dd6
//
// @include		http://*musicbrainz.org/*

// ==/UserScript==
//**************************************************************************//

// Edit the colours here

var yes = 'lightgreen';
var no = 'pink';
var abstain = 'lightyellow';

// End

var all = document.getElementsByClassName("edit-actions");

for (var i = 0; i < all.length; i++) {
	var inputs = all[i].getElementsByTagName("input");
	for (var j = 0; j < inputs.length; j++) {
		inputs[j].addEventListener("change", update_colour ,true);
	}
	set_colour(all[i]);
}

function set_colour(row) {
	var inputs = row.getElementsByTagName("input");
	var colour = row.style.backgroundColor;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
			if (inputs[i].value == 1) {
				colour = yes;
			} else if (inputs[i].value == '-1') {
				colour = abstain;
			} else if (inputs[i].value == '0') {
				colour = no;
			} else {
				colour = "#e7e7e7";
			}
		}
	}
	row.style.backgroundColor = colour;
}

function update_colour(input) {
	set_colour(input.target.parentNode.parentNode.parentNode);
}
