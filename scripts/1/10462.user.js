// Usercash auto forwarder

// ==UserScript==
// @name          Usercash auto forwarder
// @namespace     http://bitfluent.com/
// @description   Automatically forwards to the actual URL
//                behind the link
// @include       http://*.usercash.com/
// ==/UserScript==
/*
 BEGIN LICENSE BLOCK
Copyright (C) 2007 Kamal Fariz

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

var title = document.getElementsByTagName('title')[0];
location.href = title.firstChild.nodeValue;