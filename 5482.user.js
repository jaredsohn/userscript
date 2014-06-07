// GoogleNotAU
// version 1.0
// 2006-09-03
// Copyright (c) 2006, Adam Stewart Iredale
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
// select "GoogleNotAU", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GoogleNotAU
// @namespace     http://www.texasthedog.com
// @description   force Google to use the standard .com address
// @include       http://www.google.com.au/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Adam Stewart Iredale

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

*/

location.href = location.href.replace(/google.com.au/, 'google.com\/ig');

//
// ChangeLog
// 2006-09-03 - Created new quick script based on GMailSecure by Mark Pilgrim.
// 2006-09-06 - Modified the script to affect only google homepages to avoid infinite redirection loops
//

