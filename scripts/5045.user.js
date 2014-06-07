// Last.fm Observe Neighbors (Subscribers Only)
// version 0.1
// 2006-08-07
// Copyright (c) 2006, staticsage
// Released under the GPL license
// http://www.gnu.org/licenses/gpl.txt
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Last.fm Observe Friends (Subscribers Only)", and click Uninstall.
//
// --------------------------------------------------------------------
//
// version 0.1	(2006-07-25)
// Changes the link from "view all friends" to "observe friends".
// This links to a page that displays recently played songs for the user's friends.
// (This only works if you subscribe to Last.fm!)
//
//
// ==UserScript==
// @name          Last.fm Observe Neighbors (Subscribers Only)
// @description   Change the "view more neighbors..." link to "observe neighbors". (Read info in script)
// @include       http*://*.last.fm/user*
// ==/UserScript==

document.getElementById('f_npanel').innerHTML = document.getElementById('f_npanel').innerHTML.replace('\/neighbours\/\"\>View more neighbours...','\/observe\/\&show\=neighbours\"\>Observe neighbors');




