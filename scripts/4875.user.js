// Last.fm Observe Friends (Subscribers Only)
// version 0.2
// 2006-07-25
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
// version 0.2	(2006-09-15)
// Updated script for the new site.
//
// version 0.1	(2006-07-25)
// Changes the link from "view all friends" to "observe friends".
// This links to a page that displays recently played songs for the user's friends.
// (This only works if you subscribe to Last.fm!)
//
//
// ==UserScript==
// @name          Last.fm Observe Friends (Subscribers Only)
// @description   Change the "view all friends" link to "observe friends". (Read info in script)
// @include       http*://*.last.fm/user*
// ==/UserScript==

document.getElementById('userfriends').innerHTML = document.getElementById('userfriends').innerHTML.replace('\/friends\/\"\>See all ','\/observe\/\"\>Observe all ');


