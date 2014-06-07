// ==UserScript==
// @name         PlusNet Portal - Width fix
// @version      0.1
// @date         2006-02-17
// @description  Makes the content area full width
// @author       Simon Arlott
// @namespace    http://simon.arlott.org/gm/
// @include      http*://portal.plus.net/*
// ==/UserScript==
/*
	Copyright © 2006  Simon Arlott

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

(function (){
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = '#dContent { width: auto; margin-right: 1em; }';
	head.appendChild(style);
}());
