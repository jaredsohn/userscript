// Usercash header remover

// ==UserScript==
// @name          Usercash header remover
// @namespace     http://determinist.org/greasemonkey/
// @description   Removes the annoying usercash header.

// @include       http://*.usercash.com/

// ==/UserScript==

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

var frameset = document.getElementsByTagName('frameset')[0];
var header = frameset.getElementsByTagName('frame')[0];
var content = frameset.getElementsByTagName('frame')[1];

location.href = content.src;
