// PopupBlocker remove pop-ups
// 2010-12-05
// Copyright (c) 2010, Nitin Yadav
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Uberpix remove pop-ups", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PopupBlocker
// @namespace     fedon_dimopoulos
// @description   removes pop-ups from uberpix.net
// @include       *
// ==/UserScript==

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = 'function click_window(){} function popup_news(){}';   // add the script code to it

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <body> tag on the page
// 2. adds the new script just before the </body> tag
document.getElementsByTagName('body')[0].appendChild(script); 
