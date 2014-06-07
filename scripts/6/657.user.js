
// Bloglines Autoloader
// version 0.4 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that automatically displays
// unread items in Bloglines.  Test page: http://bloglines.com/myblogs
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bloglines Autoloader", and click Uninstall.
//
// ==UserScript==
// @name          Bloglines Autoloader
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Auto-display unread items in Bloglines
// @include       http://bloglines.com/myblogs*
// @include       http://www.bloglines.com/myblogs*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
    if (typeof doLoadAll != 'undefined') {
        doLoadAll();
    }
})();

// ChangeLog
// 2005-07-08 - 0.4 - MAP - fixed function check, added license block
// 2005-04-16 - 0.3 - MAP - changed licensing for consistency with other scripts
// 2005-04-15 - 0.2 - MAP - check for existence of function (not all frames have it)
//
