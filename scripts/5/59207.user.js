// Packrat Autoflipper
// version 0.5
// 2009-10-05
// Copyright (c) 2009, Matt Stith
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Packrat Autoflipper
// @namespace     http://insomniaaddict.com/packrat/
// @description   Flips cards for you in the popular Facebook app Packrat. To use, Tools > Greasemonkey > User Script Commands... > Flip cards!
// @include       http://apps.facebook.com/packrat/steal*
// ==/UserScript==

window.flipAPackratCard = function(child,cardWrappers) {
	if (child >= cardWrappers.length) return; // Stop when we've hit the last card
	var children = cardWrappers[child].children;
	
	for (var i=0; i < children.length; i++) {
		if (children[i] && children[i].id != "") { // If we've found our card
			var obj = children[i];
			
			// Hacky click to make Packrat think it's a user
			// We need to get the right X and Y of the element on the page
			// and set the clientX and clientY correctly
			var curleft = 0;
			var curtop = 0;
			
			// Get the offsets of each parent till the top
			var loopObj = obj;
			do {
				curleft += loopObj.offsetLeft;
				curtop += loopObj.offsetTop;
			} while (loopObj = loopObj.offsetParent);
			// Offset by scrolling, facebook function adds these back in already.
			curleft -= document.documentElement.scrollLeft||document.body.scrollLeft;
			curtop -= document.documentElement.scrollTop||document.body.scrollTop;
			
			// Make the event
			var evt = obj.ownerDocument.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, obj.ownerDocument.defaultView, 1, 0, 0, curleft, curtop, false, false, false, false, 0, null);
			obj.dispatchEvent(evt);
			
			// Call this function again in a little bit
			window.setTimeout(function() {
				window.flipAPackratCard(child+1,cardWrappers);
			},Math.floor((750*Math.random())+250)); // Random number between 250-1000
			return;
		}
	}
}

GM_registerMenuCommand('Flip cards!',function(){
	var cardWrappers = document.getElementsByClassName('card-wrapper ');
	window.flipAPackratCard(0,cardWrappers);
});