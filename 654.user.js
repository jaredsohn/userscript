
// Anti-Disabler
// version 0.6 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that restores context menus
// on sites that try to disable them.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Anti-Disabler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Anti-Disabler
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   restore context menus on sites that try to disable them
// @include       *
// @exclude       http://mail.google.com/*
// @exclude       https://mail.google.com/*
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
    var e, i, all;

    document.onmouseup = null;
    document.onmousedown = null;
    document.oncontextmenu = null;

    all = document.getElementsByTagName("*");
    for (i = 0; i < all.length; i += 1) {
        e = all[i];
        e.onmouseup = null;
        e.onmousedown = null;
        e.oncontextmenu = null;
    }
})();

//
// ChangeLog
// 2005-07-08 - 0.6 - MAP - added license block
// 2005-06-28 - 0.5 - MAP - updated GMail URL
// 2005-04-21 - 0.4 - MAP - linted
// 2005-04-21 - 0.3 - MAP - exclude GMail
// 2005-04-18 - 0.2 - MAP - tidy code
// 2005-04-01 - 0.1 - MAP - initial release
//
