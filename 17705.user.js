// Add books to book mooch using a CueCat
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BookMooch CueCat", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BookMooch CueCat
// @namespace     http://alasper.org/projects/greasemonkey/
// @description   Script to enable adding books to bookmooch using a CueCat
// @include       http://bookmooch.com/m/add*
// @include       http://bookmooch.com/m/add_do*
// ==/UserScript==

function newsubmit(event) {
    var target = event ? event.target : this;
  	if (target.action == 'http://bookmooch.com/m/add_do') {
  		var inputs = target.getElementsByTagName('input');
		if (inputs.length) {	
      		kittyCode(inputs[0]);
		}
    }
}

var allForms = document.getElementsByTagName('form');
for (var i = 0; i < allForms.length; i++) {
    form = allForms[i];
	form.addEventListener('submit', newsubmit, true);
}


// Copyright (c) 2000  Dustin Sallings <dustin@spy.net>
// $Id: kittycode.js,v 1.2 2000/09/20 03:42:24 dustin Exp $
// Any work derived from this code must retain the above copyright.
// Please send all modifications of this script to me.

function kittyCode(kittyinput) {
	// Make sure there's something in there before we do this.
	if (kittyinput.value.length > 0) {
		var parts=kittyinput.value.split('.');
		// Valid data will have five parts (the first and last are empty)
		// Parts are as follows:
		// 0 = empty
		// 1 = id
		// 2 = type
		// 3 = code
		// 4 = empty
		if(parts.length == 5) {
			// We just care about the actual scanned code right now
			kittyinput.value=decodePart(parts[3]);
		}
	}
}

function decodePart(str) {
	var m = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-";
	var result = "";
	var packer = 0;
	var count = 0;
	
	var i = 0;
	for (i=0; i < str.length; i++) {
		// Get the offset to the current character in our map
		var x = m.indexOf(str.charAt(i));

		// For invalid characters, point them out really well!
		if(x<0) {
			result += " > " + str.charAt(i) + " < ";
			continue;
		}

		// only count valid characters...why not?
		count++;

		// Pack them bits.
		packer = packer << 6 | x

		// every four bytes, we have three valid characters.
		if (count == 4) {
			result += String.fromCharCode((packer >> 16) ^ 67);
			result += String.fromCharCode((packer >> 8 & 255) ^ 67);
			result += String.fromCharCode((packer & 255) ^ 67);
			count=0; packer=0;
		}

	}

	// Now, deal with the remainders
	if(count==2) {
		result += String.fromCharCode((( (packer << 12) >> 16) ^ 67));
	} else if(count == 3) {
		result += String.fromCharCode(( (packer << 6) >> 16) ^ 67);
		result += String.fromCharCode(( (packer << 6) >> 8 & 255) ^ 67);
	}
	return result;
}