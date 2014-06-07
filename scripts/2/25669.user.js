// Show MBTA transportation options.

// version 0.1 

// 2008-04-27

// Copyright (c) 2008, Jeff Winkler

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

// select "MBTA", and click Uninstall.

//

// --------------------------------------------------------------------

//

// ==UserScript==

// @name          MBTA

// @namespace     http://jeffwinkler.net/greasemonkey/

// @description   Show MBTA transportation options.

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

	var loc = "http://mbta.com/rider_tools/servicenearby/?saServiceNearBy=" + getAddress();

	var div = document.createElement('div');

	var anc = document.createElement('a');

	anc.target = '_new';

	anc.href = loc;

	anc.innerHTML = "MBTA";

	div.appendChild(anc);

	var sibling = document.getElementById('address_line_2');

	sibling.parentNode.insertBefore(div, sibling.nextSibling);

}



show();