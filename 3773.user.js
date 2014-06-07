// ==UserScript==
// @name          flickr remove bottomstrip
// @description	  removes the big grey stip at the bottom of every page at flickr
// @namespace	  http://netomer.de/
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*
// @include       http://www-us.flickr.com/*
// ==/UserScript==

// v0.2 - May 5th 2006: flickr gamma compatible and configurable
// v0.1 - April 05th 2006: initial release 

// you can edit this script to remove only certain parts. just change the value of "var Remove" to 1, 2 or 3 (1 = default)

// 1: removes the footer completly
// 2: removes the block with "activity", "you", "explore" and "help"
// 3: removes the block with "flickr blog", "about flickr" ... and the yahoo logo

(function() {

	var Remove = 1; // change this value if you like

	// 1: removes the footer completly
	// 2: removes the block with "activity", "you", "explore" and "help"
	// 3: removes the block with "flickr blog", "about flickr" ... and the yahoo logo

	getElementsByClassName = function(clsName) {
	  var elems = document.getElementsByTagName('*');
	  for (i=0; (elem = elems[i]); i++) {
		if (elem.className == clsName) arr = elem;
	  }
	  return (typeof(arr) != 'undefined') ? arr : 'undefined';
	}
	
	if (Remove == 1) { rmvBottomStrip = getElementsByClassName('Footer'); }
	if (Remove == 2) { rmvBottomStrip = getElementsByClassName('Jump'); }
	if (Remove == 3) { rmvBottomStrip = getElementsByClassName('About'); }

	if (rmvBottomStrip) { rmvBottomStrip.parentNode.removeChild(rmvBottomStrip); }

})();