// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          Fix Forbes
// @namespace     http://neuralnexus.net/
// @description   prevents automatic slideshows at Forbes.com
// @include       http://www.forbes.com/*slide_*thisSpeed*
// ==/UserScript==

// Parameter for how many milliseconds to wait until refresh
targetSpeed=987654321;

myregexp = new RegExp(targetSpeed);

// if targetSpeed isn't found in the URL for the current page
if (!myregexp.test(window.location.href)) {

  window.location.href = window.location.href.replace
    (/thisSpeed.*$/, 'thisSpeed=' + targetSpeed);
 }
