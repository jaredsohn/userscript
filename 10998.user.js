// RTM Secure (Remember the Milk)
// version 0.1 BETA
// 2006-10-13
// Copyright (c) 2006, WK;
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
// select "Google Secure Pro", and click Uninstall.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RTM Secure
// @description   Forces Remember the Milk to use a secure connection
// @include       http://www.rememberthemilk.com/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2007 WK

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
//

location.href = location.href.replace(/^http:/, 'https:');

//
// ChangeLog
// 0.1 - 2007-07-28 - Added RTM