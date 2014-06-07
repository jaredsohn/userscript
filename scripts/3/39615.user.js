// ==UserScript==
// @name		JUMP2
// @namespace		http://daisukeyamanaka.blogspot.com/
// @description		Jump up to top of the page.
// @include		*
// ==/UserScript==
//
// Auther	86
// version	0.0.1 2009-01-01
// 
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
// select "JUMPer", and click Uninstall.
//
// --------------------------------------------------------------------
//

document.addEventListener("dblclick",function(){scrollTo(0,0);},true);