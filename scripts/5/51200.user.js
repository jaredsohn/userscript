// ==UserScript==
// @name Weewar Coordinate Marker
// @namespace http://userscripts.org
// @description Adds a textbox for entering a coordinate. The coord can be marked by an orange hex outline on the map, which can be cleared. Coord must be in x,y format.
// @include http://weewar.com/game/*
// ==/UserScript==

var scriptVersion = '1.01';

//-----------------------------------------------------------------------------
// Written by spadequack.
// This script is a Greasemonkey script.  It requires the Firefox browser and 
//     the Greasemonkey add-on.
//
//     Firefox: http://www.getfirefox.com
//     Greasemonkey: http://www.greasespot.net
//-----------------------------------------------------------------------------
// Version History
// 1.0 - June 10, 2009 - First release.
// 1.01 - August 12, 2009 - Modified to work with updated weewar css/html
//-----------------------------------------------------------------------------

// the div with wicket:id=chat.
var chatParentDiv = document.getElementById('chat').parentNode;

// find the div containing the list of terrain images
var terrainListDiv;
var iAmHereDiv = document.getElementById('IAmHereSoTheMapDoesntJumpIfItGetsClicked');
var iAmHereDivChildren = iAmHereDiv.childNodes;
for (var i = 0; i < iAmHereDivChildren.length; i++) {
	if (iAmHereDivChildren[i].innerHTML != undefined && iAmHereDivChildren[i].id.indexOf('terrainList') != -1) {
		terrainListDiv = iAmHereDivChildren[i]; break;
	}
}

// background image dimensions
var bgImage;
var iAmHereSibs = iAmHereDiv.parentNode.childNodes;
for (var i = 0; i < iAmHereSibs.length; i++) {
	if (iAmHereSibs[i].innerHTML != undefined && iAmHereSibs[i].style.top == '0px') {
		bgImage = iAmHereSibs[i].firstChild; break;
	}
}
var bgImageW = bgImage.width;
var bgImageH = bgImage.height;

//  make the orange marker img just like the existing blue marker img
var markerImg = document.createElement('img');
markerImg.id = 'marker';
markerImg.height = '34';
markerImg.border = '0';
markerImg.width = '32';
markerImg.src = 'http://img523.imageshack.us/img523/8029/orangemarker.gif';
markerImg.style.position = 'absolute';
markerImg.style.zIndex = '8';
var marked = false;

// make a box with gray border, to be put right above the chat window
var box = document.createElement('div');
box.style.margin = '0 0 5px 0';
box.style.border = '1px solid #eee';
box.style.padding = '5px';
box.style.textAlign = 'center';

var form = document.createElement('form');
form.id = 'coordinateMarkerForm';

var label = document.createElement('label');
label.style.paddingRight = '5px';

var text = document.createTextNode('Coordinate:');

var inputs = document.createElement('span');

var inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.size = '5';
inputBox.value = '0,0';
inputBox.style.marginRight = '1px';

// if user hits enter in inputBox, call mark()
// not sure how to stop it from reloading the page after user hits enter....
function ifEnterMark(event) {
	if (event.keyCode == 13) {
		mark();
	}
}
inputBox.addEventListener('keydown', ifEnterMark, false);

function mark() {
	var c = inputBox.value;
	var regex = /^\d+,\d+$/g;
	if (c.match(regex)) {
		var x = c.substring(0, c.indexOf(','));
		var y = c.substring(c.indexOf(',')+1);
		var left = parseInt(x, 10) * 32;
		var top = parseInt(y, 10) * 26;
		if (y % 2 != 0) { // if odd then shift right by 16
			left = left + 16;
		}
		
		if (left+32 > bgImageW || top+26 > bgImageH) {
			colorErr();
			return;
		}
		
		clear();
		inputBox.style.backgroundColor = '#fff';
		markerImg.style.left = left + 'px';
		markerImg.style.top = top + 'px';
		iAmHereDiv.parentNode.appendChild(markerImg);
		marked = true;
	} else {
		colorErr();
	}
}

function colorErr() {
	clear();
	inputBox.style.backgroundColor = '#f3a'; // pink
}

function clear() {
	if (marked) {
		iAmHereDiv.parentNode.removeChild(markerImg);
		marked = false;
	}
}

// mark button triggers mark()
var markButton = document.createElement('input');
markButton.addEventListener('click', mark, false);
markButton.type = 'button';
markButton.value = 'Mark';
markButton.id = 'markButton';

// clear button triggers clear()
var clearButton = document.createElement('input');
clearButton.addEventListener('click', clear, false);
clearButton.type = 'button';
clearButton.value = 'Clear';
clearButton.id = 'clearButton';

// add everything to their respective containers
label.appendChild(text);
form.appendChild(label);
form.appendChild(inputBox);
form.appendChild(markButton);
form.appendChild(clearButton);

box.appendChild(form);

// place the new box right before the chat div
chatParentDiv.parentNode.insertBefore(box,chatParentDiv);
