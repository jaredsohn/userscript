// Remove some elements from centarnekretnina.net homepage
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
// @name          CentarNekretnina Homepage Cleanup
// @description   Hides some elements on the homepage
// @include       http://www.centarnekretnina.net/
// @include       http://centarnekretnina.net/
// ==/UserScript==

document.getElementById('top-part').innerHTML = '';
//var topdiv1 = document.getElementById('top-part');
//topdiv1.parentNode.removeChild(topdiv1);
//topdiv1.style.display = 'none';

var middiv2 = document.getElementById('mid-column');
middiv2.style.display = 'none';

var leftdiv3 = document.getElementById('left-column');
leftdiv3.style.display = 'none';

var rightdiv4 = document.getElementById('right-column');
rightdiv4.style.display = 'none';
