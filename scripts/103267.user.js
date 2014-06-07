// ==UserScript==
// @name        MusicBrainz: Colourful edits
// @description A script to add colour to the edit headers in the edit search results.
// @version     2012-09-27
// @author      -
// @namespace   http://userscripts.org/users/41307
//
// @include     *://musicbrainz.org/*
// @include     *://beta.musicbrainz.org/*
// @include     *://test.musicbrainz.org/*
//
// ==/UserScript==
//**************************************************************************//

// Edit the colours here

var add = 'lightgreen';
var addtop = '0px solid green';
var addclosed = '#D0EBD7';

var edit = 'khaki';
var edittop = '0px solid orange';
var editclosed = '#F1E3BF';

var remove = 'pink';
var removetop = '0px solid red';
var removeclosed = '#FFE2E8';

var merge = 'plum';
var mergetop = '0px solid purple';
var mergeclosed = '#DEC6D5';

var other = 'lightblue';
var othertop = '0px solid blue';
var otherclosed = '#CFDDE0';

var cancelled = 'lightgrey';

// end

var all = document.getElementsByClassName("edit-header");

for (var i = 0; i < all.length; i++) {
	var text, closed;
	if (document.location.href.match(/\/edit\/[0-9]+$/)) {
		text = all[i].className;
		closed = all[i].className.match(/open/) ? false : true;
	} else {
		text = all[i].className;
		closed = all[i].className.match(/open/) ? false : true;
	}

	if (text.match(/cancelled/)) {
		all[i].style.backgroundColor = cancelled;

	} else if (text.match(/add-/)) {
		all[i].style.borderTop = addtop;
		all[i].style.backgroundColor = closed ? addclosed : add;

	} else if (text.match(/edit-(?!header)/)) {
		all[i].style.borderTop = edittop;
		all[i].style.backgroundColor = closed ? editclosed : edit;

	} else if (text.match(/remove-/)) {
		all[i].style.borderTop = removetop;
		all[i].style.backgroundColor = closed ? removeclosed : remove;

	} else if (text.match(/merge-/)) {
		all[i].style.borderTop = mergetop;
		all[i].style.backgroundColor = closed ? mergeclosed : merge;

	} else {
		all[i].style.borderTop = othertop;
		all[i].style.backgroundColor = closed ? otherclosed : other;
	}
}
