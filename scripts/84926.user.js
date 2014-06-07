// Delete divs
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Divs Delete
// @description   Deletes divs
// ==/UserScript==

var delete1 = document.getElementById('interContainer');
if (delete1) {
    delete1.parentNode.removeChild(delete1);
}

var delete2 = document.getElementById('interVeil');
if (delete2) {
    delete2.parentNode.removeChild(delete2);
}


var toggle = {
	show : function(obj) {
		document.getElementById(obj).style.visibility = '';
	}
}
