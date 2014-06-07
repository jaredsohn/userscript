// LifeHacker Single Page Tips Box
// Sept 15, 2010
//
// ------------------------------------------------
//
// This is a Greasemonkey script that automatically
// clicks the "Don't like the gallery layout? Click
// here to view everything on one page" button for 
// Lifehacker's From the Tips Box posts.
//
// ------------------------------------------------
// 
// ==UserScript==
// @name           LifeHacker Single Page Tips Box
// @description    Switches to the single pane view of the Tips Box
// @include        http://lifehacker.com/*/from-the-tips-box-*/gallery/
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2009 Oliver Schmid

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

var loc = window.location.href;
window.location = loc.substring(0, loc.length - 8);
