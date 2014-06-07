// ==UserScript==
// @name           Change Page Title
// @namespace      http://userscripts.org/users/401935
// @description    You can change title of a page simply by pressing Ctrl + E
// @include        *
// ==/UserScript==

/* 
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *       
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *       
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 *  MA 02110-1301, USA.
 */

document.addEventListener("keydown",function(e){if(e.which == 69 && e.ctrlKey) degis(); },false);
function degis(e)
{
	var yeni = prompt("Yeni basligi girin:","");
	if(yeni)
		document.title = yeni;
}
