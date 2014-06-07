// RedMaps

// version 0.1 

// 2008-02-20

// Copyright (c) 2008, Jeff Winkler, http://jeffwinkler.net

// Inspired by Michael Roufa's http://userscripts.org/scripts/show/21365

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

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

// select "RedPhotos", and click Uninstall.

//

// --------------------------------------------------------------------

//

// ==UserScript==

// @name          RedMaps

// @namespace     http://www.jeffwinkler.net/greasemonkey/

// @description   Show property on Google maps.

// @include       http://www.redfin.com/*home*

// ==/UserScript==



function getElementText(elID) {

	return document.getElementById(elID).innerHTML.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^ +/g, "").replace(/ +$/g, "");

}

// Grab address from the page title..that's the easiest.
function getAddress() {
	a = document.title.split("|")[0].replace (/ /, "+" );
	// alert (a);
	return a.replace (/ /, "+" );
}



function show() {

	var loc = 'http://maps.google.com/maps?f=q&hl=en&geocode=&q='+ getAddress() +'&ie=UTF8&t=h&z=16&iwloc=addr';



	var div = document.createElement('div');

	var anc = document.createElement('a');

	anc.target = '_new';

	anc.href = loc;

	anc.innerHTML = "GMap";

	div.appendChild(anc);

	var sibling = document.getElementById('address_line_2');

	sibling.parentNode.insertBefore(div, sibling.nextSibling);

}



show();